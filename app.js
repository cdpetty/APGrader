
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
    if (req.files.file){
        var cfilename = req.files.file.name
        var rfilename = cfilename.substring(0, cfilename.indexOf("."));
        fs.readFile(req.files.file.path, function(err, data){
            fs.writeFile('/tmp/' + req.files.file.name, data, function(err){
                if (err) res.send("Error writing file: " + err);
                else {
                    exec('javac /tmp/' + cfilename, function(err, stdout, stderr){
                        if(err) res.send(err);
                        else{
                            exec('java -cp /tmp ' + rfilename, function(err, stdout, stderr){
                                if (err) res.send("Error 2: " + err);
                                else res.send("STDOUT: " + stdout + "<br>STDERR: " + stderr);
                            });
                        }
                    });
                }
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
