/* Login */
var databaseUrl = "AP_DB";
var collections = ["users"];
var db = require("mongojs").connect(databaseUrl, collections);


module.exports = function(req,res){
  if(req.body.username && req.body.password){
    var username = req.body.username.toLowerCase();
    var password = req.body.password.toLowerCase();
    console.log('Username', username, 'Password', password);
    db.users.findOne({'username': username, 'password': password}, function(err, found){
      console.log(found);
      if (found){
        req.session.user_id= found._id;
        res.send('You logged in!');
      }
      else{
        res.redirect('/create-new-user');
      }
    });
  }
  else res.render('login');
}
