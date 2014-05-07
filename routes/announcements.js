
module.exports = function(req, res){
  res.render('announcements', {name: req.session.name, admin: req.session.admin});
};