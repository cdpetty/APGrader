/* restrict access without session cookie */
module.exports = function(){
  return function(req, res, next){
    var exceptions = ['/login', '/stylesheets/style.css', '/create-new-user'];
    if (req.session.user_id ||  exceptions.indexOf(req.url) > -1) next();
    else {
      console.log('Req.session is undefined. Re-routing to /login');
      res.redirect('/login');
    }
  };
};
