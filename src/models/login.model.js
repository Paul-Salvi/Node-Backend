'use strict';
var dbConnection = require('../configs/db.config');
const User = require('../models/user.model');

var Credentials = function (credential) {
   if (!credential.email || !credential.password) {
      return null;
   }
   this.email = credential.email;
   this.password = credential.password;
}

Credentials.login = function (credentials, result) {
   if (!credentials.email || !credentials.password) {
      var errMsg = "Invalid credentials";
      result(errMsg, null);
   }
   User.findByEmail(credentials.email, function (err, user) {
      if (err)
         result("Email Id does not exist.", null);

      console.log(user[0]);
      result(null, "Success JWT");

   });
};




module.exports = Credentials;