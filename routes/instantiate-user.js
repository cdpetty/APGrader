var users = require('../models/users');

module.exports = function(req,res){
  //if client is attempting to update a user
  if (req.body.first && req.body.last && req.body.new_username && req.body.new_password){
    //search and update data
    var query = {first: req.body.first, last: req.body.last};
    var update = {username: req.body.new_username, password: req.body.new_password};
    //update user
    users.update(query, update, function(err, updated){
      if (err) res.send(err);
      else res.send(updated);
    });
  }
  else{
    res.render('instantiate_user');
  }
};