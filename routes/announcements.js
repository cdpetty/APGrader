announcements = require('../models/announcements');

function getDate(){
    var unformatedDate = new Date();
    var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var formatedDate = '';
    formatedDate += dayNames[unformatedDate.getDay()] + ' ';
    formatedDate += (unformatedDate.getMonth() + 1) + '/';
    formatedDate += unformatedDate.getDate() + '/';
    formatedDate += unformatedDate.getFullYear() + ' ';
    if(unformatedDate.getHours()%12 == 0)
        formatedDate += '12:';
    else
      formatedDate += (unformatedDate.getHours()%12) + ':';
    if(unformatedDate.getMinutes() < 10)
      formatedDate += '0' + unformatedDate.getMinutes();
    else
      formatedDate += unformatedDate.getMinutes();
    if (unformatedDate.getHours() >=11) formatedDate += 'pm';
    else formatedDate += 'am';
    return formatedDate;
}

module.exports = function(req, res){
  if(req.body.title && req.body.content){
    new_announcement = new announcements(); 
    new_announcement.date = getDate();
    new_announcement.title = req.body.title;
    new_announcement.content = req.body.content;
    new_announcement.save(function(err,saved){
      console.log('err: ' + err);
      announcements.find({}, function(err, found){
        res.render('announcements', {name: req.session.name, admin: req.session.admin, Announcements: found.reverse(), isSaved: 'Announcement Saved'});
      });
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
        res.render('announcements', {name: req.session.name, admin: req.session.admin, Announcements: found.reverse()});
      });
    }
    else{ //just one to delete
      console.log('title: ' + req.body.selection);
      announcements.remove({title: req.body.selection}, function(){});
      announcements.find({}, function(err, found){
        res.render('announcements', {name: req.session.name, admin: req.session.admin, Announcements: found.reverse()});
      });
    }
  }
  else{ //nothing to delete
    announcements.find({}, function(err, found){
      res.render('announcements', {name: req.session.name, admin: req.session.admin, Announcements: found.reverse()});
    });
  }
};