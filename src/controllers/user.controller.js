'use strict';
const User = require('../models/user.model');

exports.create = function (req, res) {  
   if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      res.status(400).send({ error: true, message: 'Invalid request' });
   } else {
      const newUser = new User(req.body);
      User.create(newUser, function (err, user) {
         if (err)
            res.send(err);
         res.json({ error: false, message: "User created successfully!", data: user });
      });
   }
};