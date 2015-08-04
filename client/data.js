var _ = require("underscore"),
    $ = require("jquery");



var Server = function() {

};

_.extend(Server.prototype, {



})



var createFakeDataSource = function(dataSource, delay) {
    return function() {
        var def = $.Deferred();
        setTimeout(dataSource, delay(), def);
        return def;
    };
}

var constantDelay = function(delay) {
    return function() {return delay;}
};


var randomInteger = function(intervalStart, intervalSize) {
    return Math.floor((Math.random() * intervalSize) + intervalStart);
};

var courseDataSource = function(def) {
    def.resolve([
        {name: "Yoga 1", time: "08/08/2015 12:00", seats: "3 ledige"},
        {name: "Gravidyoga", time: "10/08/2015 18:00", seats: "5 ledige"}
    ]);
};

var userDataSource = function(def) {
    def.resolve({"fiveTicketPrice": 450, "tenTicketPrice": 700})
};

var ticketStatusSource = function(def) {
    def.resolve({"ticketsLeft": randomInteger(2, 7)})
};

var Fake = function() {

};

_.extend(Fake.prototype, {

    getCourses: createFakeDataSource(courseDataSource, constantDelay(300)),

    getUser: createFakeDataSource(userDataSource, constantDelay(300)),

    getTicketStatus: createFakeDataSource(ticketStatusSource, constantDelay(300))

});



module.exports = {
    Server: Server,
    Fake: Fake
}