/* Mongo */
var mongoose = require('mongoose'), AuthFactory = require('./authFactory');

mongoose.connect('mongodb://localhost/timeline');

var Users = mongoose.model('User', {
    username: { type: String, index: { unique: true } },
    password: String,
    salt: String,
    role: String,
    _created: Date,
    _updated: Date
});

var Tasks = mongoose.model('Task', {
    userId: String,
    section: String,
    title: String,
    description: String,
    action: String,
    status: String,
    _created: Date,
    _updated: Date
});

var API_PATH = '/api/v1';

/* Auth --------------------------------------------------------------*/
var authRoute = function (router) {
    router.post(API_PATH + '/auth', function (req, res) {
        if (!req.body)
            return res.status(400).end();

        var username = req.body.username;
        var password = req.body.password;

        if (!username || !password)
            return res.status(400).end();

        Users.findOne({ username: username }, function (error, user) {
            if (error || !user)
                return res.status(401).end();

            var hash = AuthFactory.hashPasswrod(user.salt, password);
            if (user.password !== hash)
                return res.status(400).end();

            AuthFactory.encodeToken(user._id, function (token, expires) {
                res.json({
                    token: token,
                    expires: expires,
                    user: user
                });
            });
        });
    });

    router.use(function (req, res, next) {
        var token = req.headers.auth;
        if (!token)
            return next();

        try  {
            var decoded = AuthFactory.decodeToken(token);

            if (new Date() >= new Date(decoded.exp))
                return next();

            req.userId = decoded.iss;
            return next();
        } catch (err) {
            return next();
        }
    });
};

module.exports = function (app) {
    authRoute(app);

    /* Get Profile */
    app.get(API_PATH + '/profile', function (req, res) {
        if (!req.userId)
            return res.status(401).end();

        Users.findOne({ _id: req.userId }, function (error, user) {
            if (error || !user) {
                return res.status(401).end();
            }
            res.json(user);
        });
    });

    /* Get All Task */
    app.get(API_PATH + '/tasks', function (req, res) {
        if (!req.userId)
            return res.status(401).end();

        Tasks.find({ userId: req.userId }, function (error, tasks) {
            if (error) {
                console.log(error);
                return res.status(400).send(error);
            }

            tasks = tasks.sort(function (a, b) {
                return (new Date(b._created)) - (new Date(a._created));
            });

            res.send(tasks);
        });
    });

    /* Get Task */
    app.get(API_PATH + '/tasks/:taskid', function (req, res) {
        if (!req.userId)
            return res.status(401).end();

        var taskId = req.params.taskid;

        Tasks.findOne({ userId: req.userId, _id: taskId }, function (error, task) {
            if (error) {
                console.log(error);
                return res.status(400).send(error);
            }
            res.send(task);
        });
    });

    /* New Task */
    app.post(API_PATH + '/tasks', function (req, res) {
        if (!req.userId)
            return res.status(401).end();

        var newTask = req.body;
        newTask._created = new Date();
        newTask._updated = new Date();
        newTask.userId = req.userId;

        Tasks.create(newTask, function (error, task) {
            if (error) {
                console.log(error);
                return res.status(400).send(error);
            }
            res.send(task);
        });
    });

    /* Update Task */
    app.put(API_PATH + '/tasks/:taskid', function (req, res) {
        if (!req.userId)
            return res.status(401).end();

        var taskId = req.params.taskid;

        var oldTask = req.body;
        oldTask._updated = new Date();
        oldTask.userId = req.userId;

        Tasks.update({ userId: req.userId, _id: taskId }, oldTask, function (error, count, row) {
            if (error) {
                console.log(error);
                return res.status(400).send(error);
            }
            res.send(row);
        });
    });

    /* Delete Task */
    app.delete(API_PATH + '/tasks/:taskid', function (req, res) {
        if (!req.userId)
            return res.status(401).end();

        var taskId = req.params.taskid;

        Tasks.remove({ userId: req.userId, _id: taskId }, function (error) {
            if (error) {
                console.log(error);
                return res.status(400).send(error);
            }
            res.send('success');
        });
    });
};
