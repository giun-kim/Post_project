var express = require('express');
var router = express.Router();
var User = require('../models').User;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json('ddd')
  // res.json({id:123});
  // User.findAll()
  // .then(users=>{
  //   res.json(users);
  // })
  // .catch(err=>{
  //   console.error(err);
  // })
});

module.exports = router;
