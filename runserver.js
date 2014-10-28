var http = require('http'),
	express = require('express'),
	morgan = require('morgan'),
	bodyParser = require('body-parser'),
	_ = require('underscore');

/* App */
var app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));

app.use(morgan('combined'));
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded

/* Mongo */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/timeline');

var Users = mongoose.model('User', { 
	email: String,
	password: String,
	role: String,
	_created: Date,
	_updated: Date,
});

var Tasks = mongoose.model('Task', { 
	userId: String,
	section: String,
	title: String,
	description: String,
	action: String,
	status: String,
	_created: Date,
	_updated: Date,
});

/* Route */
app.get('/api/v1/:userid', function(req, res){
	var id = req.params.userid;

	Users.findOne({ _id: id }, function(error, user){
		if(error) {
			res.status(400).send(error);
			console.log(error);
			return;
		}

		res.send(user);
	});
});

app.get('/api/v1/:userid/tasks', function(req, res){
	var id = req.params.userid;

	Users.findOne({ _id: id }, function(error, user){
		if(error) {
			res.status(400).send(error);
			console.log(error);
			return;
		}

		Tasks.find({ userId: user._id }, function(error, tasks) {
			if(error) {
				res.status(400).send(error);
				console.log(error);
				return;
			}

			tasks = tasks.sort(function(a,b){
			  return new Date(b._created) - new Date(a._created);
			});

			res.send(tasks);
		});
	});
});

app.get('/api/v1/:userid/tasks/:taskid', function(req, res){
	var userId = req.params.userid;
	var taskId = req.params.taskid;

	Users.findOne({ _id: userId }, function(error, user){
		if(error) {
			res.status(400).send(error);
			console.log(error);
			return;
		}

		Tasks.findOne({ userId: user._id, _id: taskId }, function(error, tasks) {
			if(error) {
				res.status(400).send(error);
				console.log(error);
				return;
			}

			res.send(tasks);
		});
	});
});

app.post('/api/v1/:userid/tasks', function(req, res){
	var userId = req.params.userid;

	// config
	var newTask = req.body;
	newTask._created = new Date();
	newTask._updated = new Date();
	newTask.userId = userId;

	// db
	Users.findOne({ _id: userId }, function(error, user){
		if(error) {
			res.status(400).send(error);
			console.log(error);
			return;
		}

		console.log(newTask);

		Tasks.create(newTask, function (err, task) {
			if(error) {
				res.status(400).send(error);
				console.log(error);
				return;
			}

			res.send(task);
		});
	});
});

app.put('/api/v1/:userid/tasks/:taskid', function(req, res){
	var userId = req.params.userid;
	var taskId = req.params.taskid;

	// config
	var oldTask = req.body;
	oldTask._updated = new Date();
	oldTask.userId = userId;

	// db
	Users.findOne({ _id: userId }, function(error, user){
		if(error) {
			res.status(400).send(error);
			console.log(error);
			return;
		}

		Tasks.update({ userId: user._id, _id: taskId }, oldTask, function (err, count, row) {
			if(error) {
				res.status(400).send(error);
				console.log(error);
				return;
			}

			res.send(row);
		});
	});
});

app.delete('/api/v1/:userid/tasks/:taskid', function(req, res){
	var userId = req.params.userid;
	var taskId = req.params.taskid;

	Users.findOne({ _id: userId }, function(error, user){
		if(error) {
			res.status(400).send(error);
			console.log(error);
			return;
		}

		Tasks.remove({ userId: user._id, _id: taskId }, function (err) {
			if(error) {
				res.status(400).send(error);
				console.log(error);
				return;
			}
			res.send('success');
		});
	});
});

http.createServer(app).listen(app.get('port'), function () {
    console.log('App Server is now running at:' + app.get('port'));     
});