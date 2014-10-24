var express = require('express'),
	morgan = require('morgan');

var app = express();
app.use(express.static(__dirname + '/public'));
app.use(morgan());
app.listen(3000);
