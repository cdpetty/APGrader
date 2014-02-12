
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var fs = require('fs');
var exec = require('child_process').exec
var app = express();

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
    console.log("files: " + req.files);
    if (req.files.file){
        console.log("file recieved");
        fs.readFile(req.files.file.path, function(err, data){
            fs.writeFile('/tmp/' + req.files.file.name, data, function(err){
                if (err) console.log("Error writing file: " + err);
                else console.log("saved file success");
            });
        });
    }
    res.render('index');
});
app.get('/grade', function(req,res){
    exec('javac /tmp/Hello.java', function(err, stdout, stderr){
        if(err) res.send(err);
        else{
            exec('java -cp /tmp Hello', function(err, stdout, stderr){
                if (err) res.send("Error 2: " + err);
                else res.send("STDOUT: " + stdout + "asdf" + stderr);
            });
        }
    });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
