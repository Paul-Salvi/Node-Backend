const jwt = require('jsonwebtoken');
const ACCESS_TOKEN_SECRET = "PaulSalvi";
const ALGORITHM = "HS256";
const ACCESS_TOKEN_LIFE = "10h"

var JWToken = function () { };

JWToken.generate = function (payload) {
   let accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
      algorithm: ALGORITHM,
      expiresIn: ACCESS_TOKEN_LIFE
   });
   return accessToken;
}

JWToken.verify = function (token) {
   let res = false;
   jwt.verify(token, ACCESS_TOKEN_SECRET, function (err, decoded) {
      if (err) {
         console.log(err);
         return res;
      }
      res = true;
   });
   return res;
}


module.exports = JWToken;