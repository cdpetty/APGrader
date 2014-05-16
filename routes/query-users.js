var db = require('../models');
var users = require('../models/users'),
  possibilities = ['teacher', 'period', 'grade', 'class'];

module.exports = function(req,res){
  //if client wants to search users
  if ( checkBody(req) ){
    //create search query
    var query = getQuery(req);
    console.log('query: ', query);
    var a = '';
    //search database for users
    users.find(query, function(err, found){
      console.log(found);
      found.forEach(function(user){
        console.log("user:", user);
        if (err) res.send('Error finding students: ' + err);
        else{
          a += JSON.stringify(user);
        }
      });
      db.labs.find({}, function(err, foundlab){
        res.render('query-users', {name: req.session.name, admin: req.session.admin, users: found, labs: foundlab});
      });
      //res.send(a);
    });
  }
  else{
    console.log('no request');
    db.labs.find({}, function(err, found){
      res.render('query-users', {name: req.session.name, admin: req.session.admin, labs: found}); 
    });
  }
};

function getQuery(request){
  var query = {};
  possibilities.forEach(function(possibility){
    if ( request.param(possibility) != -1 ) query[possibility] = request.param(possibility);
  });
  return query;
};

function checkBody(request){
  var data_sent = false;
  possibilities.forEach( function (requirement) {
    console.log(requirement + ":", request.param(requirement), '---');
    if (request.param(requirement)) {
      data_sent = true;
    }
  });
  return data_sent;
};