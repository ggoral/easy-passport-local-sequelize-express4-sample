var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' , user: req.user });
});


/* REMOVE GET /flash. */
router.get('/flash', function(req, res){
  req.flash('test', 'it worked');
  res.redirect('/test')
});

/* REMOVE GET /test. */
router.get('/test', function(req, res){
  res.send(JSON.stringify(req.flash('test')));
});
 

module.exports = router;
