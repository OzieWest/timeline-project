/* Mongo */
var mongoose = require('mongoose'), crypto = require('crypto');

var createSalt = function () {
    return crypto.randomBytes(128).toString('base64');
};

var hashPasswrod = function (salt, pwd) {
    var hmac = crypto.createHmac('sha1', salt);
    return hmac.update(pwd).digest('hex');
};

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
        var data = req.body;

        if (data && data.username && data.password) {
            Users.findOne({ username: data.username }, function (error, user) {
                if (error) {
                    return res.send(401);
                }

                if (!user) {
                    return res.send(401);
                }

                var hash = hashPasswrod(user.salt, data.password);

                if (user.password !== hash) {
                    return res.send(401);
                }

                res.send(user);
            });
        } else
            res.status(400).send('Bad request');
    });
};

/* Users --------------------------------------------------------------*/
var userRoute = function (router) {
    router.get(API_PATH + '/users', function (req, res) {
        Users.find({}, function (error, users) {
            if (error) {
                return res.send(400);
            }

            if (!users.length) {
                var pass = 'soramusoka';
                var us = 'soramusoka@gmail.com';
                var salt = createSalt();
                var hash = hashPasswrod(salt, pass);

                var newUser = {
                    username: us,
                    password: hash,
                    salt: salt
                };

                Users.create(newUser, function (err, user) {
                    if (error) {
                        return res.send(400);
                    }
                    users.push(user);
                    res.json(users);
                });
            }
        });
    });
};

/* Tasks --------------------------------------------------------------*/
module.exports = function (app) {
    authRoute(app);

    userRoute(app);

    app.get(API_PATH + '/:userid', function (req, res) {
        var id = req.params.userid;

        Users.findOne({ _id: id }, function (error, user) {
            if (error) {
                res.status(400).send(error);
                console.log(error);
                return;
            }
            res.send(user);
        });
    });

    app.get(API_PATH + '/:userid/tasks', function (req, res) {
        var id = req.params.userid;

        Users.findOne({ _id: id }, function (error, user) {
            if (error) {
                res.status(400).send(error);
                console.log(error);
                return;
            }

            Tasks.find({ userId: user._id }, function (error, tasks) {
                if (error) {
                    res.status(400).send(error);
                    console.log(error);
                    return;
                }

                //tasks = tasks.sort((a, b) => {
                //	return <any>(new Date(b._created)) - <any>(new Date(a._created));
                //});
                res.send(tasks);
            });
        });
    });

    app.get(API_PATH + '/:userid/tasks/:taskid', function (req, res) {
        var userId = req.params.userid;
        var taskId = req.params.taskid;

        Users.findOne({ _id: userId }, function (error, user) {
            if (error) {
                res.status(400).send(error);
                console.log(error);
                return;
            }

            Tasks.findOne({ userId: user._id, _id: taskId }, function (error, tasks) {
                if (error) {
                    res.status(400).send(error);
                    console.log(error);
                    return;
                }
                res.send(tasks);
            });
        });
    });

    app.post(API_PATH + '/:userid/tasks', function (req, res) {
        var userId = req.params.userid;

        // config
        var newTask = req.body;
        newTask._created = new Date();
        newTask._updated = new Date();
        newTask.userId = userId;

        // db
        Users.findOne({ _id: userId }, function (error, user) {
            if (error) {
                res.status(400).send(error);
                console.log(error);
                return;
            }
            Tasks.create(newTask, function (err, task) {
                if (error) {
                    res.status(400).send(error);
                    console.log(error);
                    return;
                }
                res.send(task);
            });
        });
    });

    app.put(API_PATH + '/:userid/tasks/:taskid', function (req, res) {
        var userId = req.params.userid;
        var taskId = req.params.taskid;

        // config
        var oldTask = req.body;
        oldTask._updated = new Date();
        oldTask.userId = userId;

        // db
        Users.findOne({ _id: userId }, function (error, user) {
            if (error) {
                res.status(400).send(error);
                console.log(error);
                return;
            }
            Tasks.update({ userId: user._id, _id: taskId }, oldTask, function (err, count, row) {
                if (error) {
                    res.status(400).send(error);
                    console.log(error);
                    return;
                }
                res.send(row);
            });
        });
    });

    app.delete(API_PATH + '/:userid/tasks/:taskid', function (req, res) {
        var userId = req.params.userid;
        var taskId = req.params.taskid;

        Users.findOne({ _id: userId }, function (error, user) {
            if (error) {
                res.status(400).send(error);
                console.log(error);
                return;
            }
            Tasks.remove({ userId: user._id, _id: taskId }, function (err) {
                if (error) {
                    res.status(400).send(error);
                    console.log(error);
                    return;
                }
                res.send('success');
            });
        });
    });
};
