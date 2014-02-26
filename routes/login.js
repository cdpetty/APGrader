/* Login */

module.exports = function (db) {
  return function(req,res){
    if(req.body.username && req.body.password){
      var username = req.body.username.toLowerCase();
      var password = req.body.password;
      console.log('Username', username, 'password', password);
      db.users.findOne({username: username, password: password}, function(err, found){
        console.log(found);
        if (found){
          req.session.user_id = found._id;
          req.session.username = found.username;
          req.session.password = found.password;
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
};
