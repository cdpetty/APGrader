/* Login */
var users = require('../models/users');

module.exports = function (req, res) {
  //If user is logging in
  if(req.body.username && req.body.password){
    console.log('here');
    var query = {username: req.body.username.toLowerCase(), password: req.body.password};
    
    users.findOne(query, function(err, found){
      if (err) res.send(err);
      if (found){
        req.session.user_id = found._id;
        req.session.username = found.username;
        req.session.dirname = found.dirname;
        res.send('You logged in!');
      }
      else{
        res.redirect('/create-new-user');
      }
    });
  }
  else res.render('login');
};
