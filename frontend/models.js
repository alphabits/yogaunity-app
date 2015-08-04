var mongoose = require("mongoose");



var UserSchema = mongoose.Schema({
    authId: String,
    name: String,
    email: String,
    role: String,
    created: Date
});
var User = mongoose.model('User', UserSchema);



module.exports = {
    User: User
};