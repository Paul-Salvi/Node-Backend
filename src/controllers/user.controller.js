'use strict';
const { response } = require('express');
const User = require('../models/user.model');
const jwt = require('../security/jwt');

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

exports.getUsers = function (req, res) {

   var token = req.headers['authorization'];
   if (!token && !token.startsWith('Bearer ')) {
      return res.status(401).send({ auth: false, message: 'Authentication required.' });
   }

   if (!jwt.verify(token.substring(7, token.length))) {
      return res.status(401).send({ auth: false, message: 'Authenticate failed.' });
   }

   User.getAll(function (err, users) {
      if (err)
         res.send(err);
      res.json(users);
   });

};