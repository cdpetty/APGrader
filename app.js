
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path'),
    restrict = require('./middleware/restrict'),
    mongoose = require('mongoose'),
    app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser('#secret'));
app.use(express.cookieSession());
app.use(restrict()); //personal middleware
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//connect to mongodb
mongoose.connect('mongodb://localhost/APDB');

//routes
app.all('/', routes.index);
app.all('/upload', routes.upload);
app.all('/login', routes.login);
app.all('/create-new-user', routes.create_new_user);
app.all('/list-users', routes.list_users);
app.all('/new-students', routes.new_students);
app.all('/instantiate-user', routes.instantiate_user);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
