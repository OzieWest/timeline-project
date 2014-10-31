var mongoose = require('mongoose');

module.exports.Users = mongoose.model('User', {
    username: { type: String, index: { unique: true } },
    password: String,
    salt: String,
    role: String,
    _created: Date,
    _updated: Date
});

module.exports.Tasks = mongoose.model('Task', {
    userId: String,
    section: String,
    title: String,
    description: String,
    action: String,
    status: String,
    _created: Date,
    _updated: Date
});
//# sourceMappingURL=mongoConfig.js.map
