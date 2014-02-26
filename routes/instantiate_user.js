
module.exports = function (db) {
    return function(req,res){
      var db = db;
      if (req.body.first && req.body.last && req.body.new_username && req.body.new_password){
        db.users.update({first: req.body.first, last: req.body.last}, {username: req.body.new_username, password: req.body.new_password}, function (err, updated){
          if (err) res.send(err);
          res.send(updated);
        });
      }
      else{
        res.render('instantiate_user');
      }
    };
};