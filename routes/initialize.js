/*var options = require('../models/options');

module.exports = function(req,res){ 
  if (req.body.teachers && req.body.numClassPeriods && req.body.classes){
    var teachers = req.body.teachers.split(' ');
    var numClassPeriods = req.body.numClassPeriods;
    var classes = req.body.classes.split(' ');
    var instantiated = new options();
    instantiated.teachers = teachers;
    instantiated.numClassPeriods = numClassPeriods;
    instantiated.classes = classes;
    instantiated.save(function(err, saved){
      if (err) res.send(err);
      else {
        res.send('Options saved!');
      }
    });
  }
  else res.render('initialize');
}*/
