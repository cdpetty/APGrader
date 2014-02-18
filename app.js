
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path'),
    restrict = require('./modules/restrict'),
    app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(restrict());
app.use(app.router);
app.use(express.cookieParser('#secret'));
app.use(express.cookieSession());
app.use(express.static(path.join(__dirname, 'public')));

//personal middleware


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.all('/', routes.index);
app.get('/login', routes.login);
app.get('/asdf', function(req,res){
res.send('asdf');
});
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
