var databaseUrl = "AP_DB";
var collections = ["users"];
var db = require("mongojs").connect(databaseUrl, collections);

module.exports = function(req,res){
  if(req.body.new_username && req.body.new_password){
    var new_username = req.body.new_username.toLowerCase();
    var new_password = req.body.new_password.toLowerCase();
    db.users.save({'username': new_username, 'password': new_password}, function(err, saved){
      if (err) res.send('Error saving user occured');
      else res.send('New user: ' + new_username + ' created with password: ' + new_password);
    });
  }
  else {
    res.render('create_new_user');
  }
};
