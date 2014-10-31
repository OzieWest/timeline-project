var http = require('http'), express = require('express'), morgan = require('morgan'), bodyParser = require('body-parser'), mongoose = require('mongoose');

/* Mongo start */
mongoose.connect('mongodb://localhost/timeline');
require('./utilities/mongoScheme');

/* App */
var app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));

app.use(morgan('combined'));
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded

/* Routing */
var auth = require('./routes/auth');

app.post('/api/v1/login', auth.login);
app.get('/api/v1/profile', auth.check, auth.profile);

var tasks = require('./routes/tasks');

app.get('/api/v1/tasks', auth.check, tasks.list);
app.get('/api/v1/tasks/:id', auth.check, tasks.get);
app.post('/api/v1/tasks', auth.check, tasks.create);
app.put('/api/v1/tasks/:id', auth.check, tasks.update);
app.delete('/api/v1/tasks/:id', auth.check, tasks.delete);

/* Run app */
http.createServer(app).listen(app.get('port'), function () {
    console.log('App Server is now running at:' + app.get('port'));
});
//# sourceMappingURL=runserver.js.map
