var db = require('../models');

module.exports = function(req, res){
  console.log('here');
  db.submissions.find({user: req.session.user_id}, function(err, found){
    console.log('submissions: ' + found);
    res.render('submissions', {submissions: found});
  });
}