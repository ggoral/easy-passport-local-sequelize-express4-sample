var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');


/* GET users listing. */
router.get('/', function(req, res, next) {
  User
  .findAll()
  .then(function(users) {
    res.render('register', { title: 'User Register', users:users });
  });
});


router.get('/register', function(req, res, next) {
  res.redirect('/users/');
});


router.post('/register', function(req, res, next) {
  User.register(req.body['username'], req.body['password'], function (err, registeredUser) {
    
    registeredUser.role = 'user',
    registeredUser.save();

    if (err) {
      console.log(err.class);
      return res.render("register", { title: "Sorry. That username already exists. Try again.", users:null});
    };

    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
});


router.get('/:user_id/destroy', function(req, res, next) {
  User.destroy({
    where: {id: req.params.user_id}
  }).then(function() {
      res.redirect('/users');
    });
});


router.get('/:user_id/profile', require('permission')(['admin','user']), function(req, res, next) {
  User
  .find({
    where: { id: req.params.user_id }
  })
  .then(function(user){
    res.send(user);
  });
});


router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});


router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

router.get('/:user_id/private', require('permission')(['admin','user']), function(req, res, next) {
  User
  .find({
    where: { id: req.params.user_id }
  })
  .then(function(user){
    res.send(user);
  });
});

var cb0 = function (req, res, next) {
  console.log('CB0');
  next();
}

var cb1 = function (req, res, next) {
  console.log('CB1');
  next();
}

router.get('/example', [cb0, cb1], function (req, res, next) {
  console.log('response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from D!');
});




module.exports = router;


function checkPermission(req, res, next) {
  if (req.user.id = req.params.user_id)
    return next();

  res.redirect('/');
}


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}


