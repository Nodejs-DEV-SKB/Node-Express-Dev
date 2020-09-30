var express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());




router.get('/', function(req, res, next) {
  User.find()
  .then((users) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(users);
  }, (err) => next(err))
  .catch((err) => next(err));
});


router.post('/signup', (req, res, next) => {
  User.findOne({username: req.body.username})
  .then((user) => {
    if(user != null){
      var err = new Error('User alreadey exists');
      err.status = 403;
      next(err);
    }else{
      User.create({username: req.body.username, password: req.body.password})
      .then((user) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user);
      })
      .catch((err) => next(err));
    }
  })
  .catch((err) => next(err));
});


router.post('/login', (req, res, next) => {
  if(!req.headers.user){
    var authHeader = req.headers.authorization;
    if(!authHeader){
      var err = new Error('You are not authenticated');
      err.status = 401;
      res.setHeader('WWW-Authenticate', 'Basic');
      next(err);
    }else{
      var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
      var username = auth[0];
      var password = auth[1];

      User.findOne({username: username})
      .then((user) => {
        if(user === null){
          var err = new Error('User ' + username + ' does not exist!');
          err.status = 403;
          next(err);
        }else if(user.password != password){
          var err = new Error('Password incorrect!');
          err.status = 403;
          next(err);
        }else if(user.username === username && user.password === password){
          req.session.user = 'authenticated';
          res.statusCode = 200;
          res.setHeader('Content-type', 'text/plain');
          res.end('You are authenticated');
        }
      })
      .catch((err) => next(err));
    }
  }else{
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/plain');
    res.end('You are already authenticated');
  }
});


router.get('/logout', (req, res) => {
  if(req.session){
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }else{
    res.statusCode = 403;
    res.setHeader('Content-type', 'text/plain');
    res.end('You are not logged in!');
  }
})

module.exports = router;
