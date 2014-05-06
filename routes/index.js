
/*
 * GET home page.
 */

exports.createRoutes = function(app){
  var routes = {
    'login': 'all',
    'create-new-user':'all',
    'upload': 'all',
    'list-users': 'all',
    'new-students': 'all',
    'instantiate-user': 'all',
    'create-lab': 'all',
    'logout': 'get',
    'submissions': 'all'
  };
  for (var route in routes){
    exports[route] = require('./' + route);
    switch (routes[route]){
      case 'all': 
        app.all('/' + route, exports[route]);
        break;
      case 'get':
        app.get('/' + route, exports[route]);
        break;
      case 'post':
        app.post('/'+ route, exports[route]);
        break;
    }
  }
  app.get('/', exports.index);
};

exports.index = function(req,res){
    //var express = require('express');
    //var app = express();
    res.render('index', {name: req.session.name});
};
