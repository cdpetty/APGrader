var users = require('../models/users');

module.exports = function(req,res){
  //if client wants to search users
  if ( req.query.teacher || req.query.period || req.query.grade_level){
    var query = {};
    if (req.query.teacher) query.teacher = req.query.teacher;
    if (req.query.period) query.period = req.query.period;
    if (req.query.grade_level) query.grade_level = req.query.grade_level;
    
    var a = '';
    users.find(query, function(err, found){
      console.log(found);
      found.forEach(function(user){
        console.log("user:", user);
        if (err) res.send('Error finding students: ' + err);
        else{
          a += JSON.stringify(user);
        }
      });
      res.send(a);
    });
  }
  else{
    res.render('list_users');
  }
};
