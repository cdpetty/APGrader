db = require('../models');

module.exports = function(req, res){
  if(req.body.username && req.body.password){
    console.log('stuff was passed in');
    db.users.find({username: req.body.username}, function(err, found){
      if(found.length > 0){
        console.log('found: ' + found);
        db.users.update({username: req.body.username}, {password: req.body.password}, function(){
          res.render('reset-passwords', {name: req.session.name, admin: req.session.admin, status: 'Password was reset'});
        });
      }
      else{
        res.render('reset-passwords', {name: req.session.name, admin: req.session.admin, status: "Couldn't update password"});
      }
    });
  }
  else if(req.body.password){
    db.users.find({username: req.session.username}, function(err, found){
      if(found.length > 0){
        console.log('found: ' + found);
        db.users.update({username: req.session.username}, {password: req.body.password}, function(){
          res.render('reset-passwords', {name: req.session.name, admin: req.session.admin, status: 'Password was reset'});
        });
      }
      else{
        res.render('reset-passwords', {name: req.session.name, admin: req.session.admin, status: "Couldn't update password"});
      }
    });
  }
  else
    res.render('reset-passwords', {name: req.session.name, admin: req.session.admin});
};