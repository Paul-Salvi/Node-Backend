const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(8);

let Encryption = function(){};

Encryption.encrypt = function (inputStr) {
   if (!inputStr) throw new TypeError("Invalid arguments");
   var hashStr = bcrypt.hashSync(inputStr, salt);
   return hashStr;
};

Encryption.compare = function (inputStr, hashStr) {
   if (!inputStr || !hashStr) throw new TypeError("Invalid arguments");
   return bcrypt.compareSync(inputStr, hashStr);    
};


module.exports = Encryption;