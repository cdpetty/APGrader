var db = require('../models'),
    AdmZip = require('adm-zip'),
    zip = new AdmZip(),
    fs = require('fs');

module.exports = function(req, res){
  if(req.body.selection){
    var path = 'storage/' + req.session.dirname + '/';
    if(req.body.selection.length > 1){ //There are multiple files to be downloaded
      console.log('multiple files to download!');
      for(var i = 0; i < req.body.selection.length; i++){
        zip.addLocalFile(path + req.body.selection[i]);
      }
      zip.writeZip(path + 'files.zip');
      res.download(path + 'files.zip');
      //fs.unlink(path + 'files.zip');
    }
    else{ //There is only one file to be downloaded
    console.log('One file to download');
    console.log('req.body.selection: ' + req.body.selection);
    console.log(path + req.body.selection);
    res.download(path + req.body.selection);      
    }
  }
  else{
    db.submissions.find({user: req.session.user_id}, function(err, found){
      console.log('submissions: ' + found);
      res.render('submissions', {submissions: found, name: req.session.name});
    });
  }
}