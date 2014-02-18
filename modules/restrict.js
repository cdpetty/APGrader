/* restrict access without session cookie */
module.exports = function(){
  return function(req, res, next){
    var exceptions = ['/login'];
    if (req.session.ap_sess ||  exceptions.indexOf(req.url) > -1) next();
    else res.redirect('/login');
  };
}
