var util = require('../modules/utilities');

module.exports = function(req,res){
    if ( req.query.teacher || req.query.period || req.query.grade_level){
      var query_object = {};
      if (req.query.teacher) query_object.teacher = req.query.teacher;
      if (req.query.period) query_object.period = req.query.period;
      if (req.query.grade_level) query_object.grade_level = req.query.grade_level;
      var a = '';
      console.log(query_object);
      db.users.find(query_object).forEach(function (err, user){
        console.log("user:",user);
        if (err) res.send('Error finding students: ' + err);
        else{
          a += JSON.stringify(user);
        }
      if (!user)
        res.send(a);
      });

    }
    else{
      res.render('list_users');
    }
  };
};
