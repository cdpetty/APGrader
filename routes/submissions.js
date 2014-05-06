var db = require('../models');

module.exports = function(req, res){
  console.log('here');
  if(req.body.selection){
    console.log('h3r3');
    console.log('/storage/' + req.session.first + '_' + req.session.last + '/' + req.body.selection);
    res.download('storage/' + req.session.dirname + '/' + req.body.selection);             
  }
  else{
    db.submissions.find({user: req.session.user_id}, function(err, found){
      console.log('submissions: ' + found);
      res.render('submissions', {submissions: found});
    });
  }
}