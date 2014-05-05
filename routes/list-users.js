var users = require('../models/users'),
  possibilities = ['teacher', 'period', 'grade_level', 'class'];

module.exports = function(req,res){
  //if client wants to search users
  if ( checkBody(req) ){
    //create search query
    var query = getQuery(req);
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
      res.send(a);
    });
  }
  else{
    res.render('list-users');
  }
};

function getQuery(request){
  var query = {};
  possibilities.forEach(function(possibility){
    if ( request.param(possibility) ) query[possibility] = request.param(possibility);
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