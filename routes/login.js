/* Login */

module.exports = function(req,res){
  if (req.body.username && req.body.password){
    var username = req.body.username;
    var password = req.body.password;
    db.users.findOne({'username': username, 'password': password}, function(found){
      if (found){
        req.session.user_id = found._id;
        res.send('You logged in!');
      }
      else{
          res.send('You arent logged in!');
      }
    });
      
  }
}
