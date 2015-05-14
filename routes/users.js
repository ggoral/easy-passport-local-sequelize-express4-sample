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

router.get('/:user_id/profile', isLoggedIn, function(req, res, next) {
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

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}


