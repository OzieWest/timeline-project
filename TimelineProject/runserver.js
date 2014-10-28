var http = require('http'), express = require('express'), morgan = require('morgan'), bodyParser = require('body-parser');

/* App */
var app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));

app.use(morgan('combined'));
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded

require('./router')(app);

http.createServer(app).listen(app.get('port'), function () {
    console.log('App Server is now running at:' + app.get('port'));
});
