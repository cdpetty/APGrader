announcements = require('../models/announcements');

module.exports = function(req, res){
  if(req.body.title && req.body.content){
    new_announcement = new announcements(); 
    new_announcement.date = new Date();
    new_announcement.title = req.body.title;
    new_announcement.content = req.body.content;
    new_announcement.save(function(err,saved){
      console.log('saved');
      res.render('announcements', {name: req.session.name, admin: req.session.admin, isSaved: 'Announcement Saved'});
    });
  }
  else if(req.body.selection){
    console.log(req.body.selection + '  ' + req.body.selection.length);
    if(req.body.selection instanceof Array){ //if more than one to delete
      for(var i = 0; i < req.body.selection.length; i++){
        console.log('title: ' + req.body.selection[i]);
        announcements.remove({title: req.body.selection[i]}, function(){});
      }
      announcements.find({}, function(err, found){
        res.render('announcements', {name: req.session.name, admin: req.session.admin, Announcements: found});
      });
    }
    else{ //just one to delete
      console.log('title: ' + req.body.selection);
      announcements.remove({title: req.body.selection}, function(){});
      announcements.find({}, function(err, found){
        res.render('announcements', {name: req.session.name, admin: req.session.admin, Announcements: found});
      });
    }
  }
  else{ //nothing to delete
    announcements.find({}, function(err, found){
      res.render('announcements', {name: req.session.name, admin: req.session.admin, Announcements: found});
    });
  }
};