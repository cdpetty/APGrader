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
    var real_found = [];
    users.find(query, function(err, found){
      //console.log(found);
      var increment = 0;
      console.log('Found:', found);
      if (req.param('lab') !== '-1'){
        
        console.log('LAB REQUESTED');
        found.forEach(function(user){
          var a = user;
          real_found.push(a);
          real_found[increment].asdf = 'asdf';
          console.log('ASDF:', real_found[increment].asdf);
          console.log('Increment:', increment);
          db.submissions.findOne({user: user._id, labname: req.param('lab')}, function(err, found_submission){
            console.log('Query:', {user: user._id, labname: req.param('lab')}, 'with found:', found_submission)
            if (err) console.log(err);
            else if (found_submission){
              if (found_submission.correct){
                real_found[increment]['lab_grade'] = 'Complete';
              }
              else
                real_found[increment]['lab_grade'] = 'Incorrect Submission';
              real_found[increment]['attempt'] = found_submission.attempt;
            }
            else {
              real_found[increment]['lab_grade'] = 'No Submission';
              real_found[increment]['attempt'] = 0;
            }
            increment++;
            console.log('After labgrade and attempt set:', real_found);
          });

        });
      }
      else{
        real_found = found;
      }
      db.labs.find({}, function(err, foundlab){
        var info = {name: req.session.name, admin: req.session.admin, users: real_found, labs: foundlab};
        if (req.param('lab'))
          info.lab_requested = true;
        else
          info.lab_requested = false;
        res.render('query-users', info);
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
    if (request.param('lab'))
      data_sent = true;
  });
  return data_sent;
};