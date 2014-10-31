var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    username: { type: String, index: { unique: true } },
    password: String,
    salt: String,
    role: String,
    _created: Date,
    _updated: Date
});
mongoose.model('User', User);

var Task = new Schema({
    userId: String,
    section: String,
    title: String,
    description: String,
    action: String,
    status: String,
    _created: Date,
    _updated: Date
});
mongoose.model('Task', Task);
//# sourceMappingURL=mongoScheme.js.map
