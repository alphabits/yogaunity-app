var _ = require("underscore"),
    $ = require("jquery");



var Server = function() {

};

_.extend(Server.prototype, {



});


var Fake = function() {

};

_.extend(Fake.prototype, {
    login: function(username, password) {
        var deferred = $.Deferred();
        setTimeout(function() {
            if (username == "a") {
                deferred.resolve();
            } else {
                deferred.reject({"reason": "Unknown user"});
            }
        }, 200);
        return deferred;
    },

    registerForCourse: function(course) {
        var def = $.Deferred();
        setTimeout(function() {
            def.resolve();
        }, 350);
        return def;
    },

    buyTickets: function(productName) {
        var def = $.Deferred();
        setTimeout(function() {
            console.log("Bought tickets ", productName);
            def.resolve();
        }, 350);
        return def;
    }
});


module.exports = {
    Server: Server,
    Fake: Fake
}