const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.register = function(req, res) {
    var user = new User();
  
    user.username = req.body.username;
  
    user.setPassword(req.body.password);
  
    user.save(function(err) {
      var token;
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    });
  };