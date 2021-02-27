'use strict';
var dbConnection = require('../configs/db.config');

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
   var queryData = [user.username, user.email, user.password];
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
      if (err) {
         console.log("error: ", err);
         result(err, null);
      } else {        
         result(null, res);
      }
   });  
};


module.exports = User;