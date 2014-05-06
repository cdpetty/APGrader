/* Login */
var users = require('../models/users');

function capitalizeName(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
}

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
        req.session.loggedIn = true;
        req.session.user_id = found._id;
        req.session.username = found.username;
        req.session.dirname = found.dirname;
        req.session.name = capitalizeName(found.first) + " " + capitalizeName(found.last);
        res.redirect('/');
      }
      else{
        res.redirect('/create-new-user');
      }
    });
  }
  else
    res.render('login', {name: req.session.name});
};
