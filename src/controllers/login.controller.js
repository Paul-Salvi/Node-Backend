'use strict';
const Credentials = require('../models/login.model');

exports.login = function (req, res) {  
   if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      res.status(400).send({ error: true, message: 'Invalid request' });
   } else {
      const creds = new Credentials(req.body);
      Credentials.login(creds, function (err, token) {
         if (err)
            res.send(err);
         res.json( { error: false, message: "login successful!", data: token } );
      });
   }
};