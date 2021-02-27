'use strict';
var dbConnection = require('../configs/db.config');
const crypt = require('../security/encryption');

var User = function (user) {
   if (!user.username || !user.email || !user.password) {
      return null;
   }
   this.username = user.username;
   this.email = user.email;
   this.password = user.password;
}

User.create = function (user, result) {
   if (!user.username || !user.email || !user.password) {
      var errMsg = "Invalid request";
      return result(errMsg, null);;
   }
   var queryData = [user.username, user.email, crypt.encrypt(user.password)];
   dbConnection.query("insert into users (username,email,password) values (?,?,?);", queryData, function (err, res) {
      if (err) {
         console.log("error: ", err);
         result(err, null);
      } else {
         console.log(res.insertId);
         result(null, res.insertId);
      }
   });
};


User.findByEmail = function (email, result) {

   dbConnection.query("SELECT * FROM users WHERE email = ?", [email], function (err, res, fields) {
    
      if (res.length > 0)
         return result(null, res);
      if (err)
         return result(err, null);
      return result("Not Found", null);
   });
};


User.getAll = function (result) {

   dbConnection.query("SELECT * FROM users", function (err, res, fields) {
      if (res.length > 0)
         return result(null, res);
      if (err)
         return result(err, null);
      return result("Not Found", null);
   });
};

module.exports = User;