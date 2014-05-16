/* Login */
var users = require('../models/users');

function capitalizeName(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = function (req, res) {
  //If user is logging in
  if(req.body.username && req.body.password){
    var query = {username: req.body.username.toLowerCase(), password: req.body.password};
    console.log(query);
    
    users.findOne(query, function(err, found){
      if (err)
        res.send(err);
      if (found){

        req.session.user_id = found._id;
        req.session.username = found.username;
        req.session.dirname = found.dirname;
        req.session.admin = found.admin;
        req.session.name = capitalizeName(found.first) + " " + capitalizeName(found.last);
        req.session.first = found.first;
        req.session.last = found.last;
        res.redirect('/');
      }
      else{
        res.render('login', {name: req.session.name, error: 'Incorrect username/password combination'});
        //res.redirect('/create-new-user');
      }
    });
  }
  else
    res.render('login', {name: req.session.name});
};
