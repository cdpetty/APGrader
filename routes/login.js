/* Login */
var users = require('../models/users');

module.exports = function (req, res) {
  //If user is logging in
  if(req.body.username && req.body.password){
    console.log('here');
    var query = {username: req.body.username.toLowerCase(), password: req.body.password};
    console.log(query);
    
    users.findOne(query, function(err, found){
      if (err)
        res.send(err);
      if (found){
        console.log('user was found');
        req.session.user_id = found._id;
        req.session.username = found.username;
        req.session.dirname = found.dirname;
        app.locals.name = found.first + " " + first.last;
        res.redirect('/');
        //res.send('You logged in!');
      }
      else{
        res.redirect('/create-new-user');
      }
    });
  }
  else
    res.render('login', {});
};
