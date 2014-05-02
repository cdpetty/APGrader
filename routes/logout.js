module.exports = function(req, res){
  req.session.loggedIn = false;
  req.session.user_id = null;
  req.session.username = null;
  req.session.dirname = null;
  req.session.name = null;
  console.log('About to redirect to homepage');
  res.redirect('/');
};