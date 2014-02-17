
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    user = require('./routes/user'),
    http = require('http'),
    path = require('path'),
    fs = require('fs'),
    exec = require('child_process').exec,
    grader = require('./grader/grader'),
    app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
//app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.all('/', function(req,res){
  if (req.files.file){
    grader.save(req.files.file, function(err, saved){
      if (err) console.log("Error saving file: ", err);
        grader.run(req.files.file.name, function(err, stdout, stderr){
          if (err) console.log("Error running file:", err);
          res.send("STDOUT:" + stdout + "STDERR\n" + stderr);
      });
    });
  }
  else res.render('index');
});
app.get('/grade', function(req,res){

});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
