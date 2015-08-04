
var _ = require("underscore");


var Server = function(socket, session) {

};


var FakeServer = function (socket, session) {

};
_.extend(FakeServer.prototype, {

    fetchData: function () {
        var that = this;
        setTimeout(function() {
            that.eventHandler.dataFetched({
                user: {
                    isAdmin: false,
                    username: "anders@alphabits.dk"
                },
                courses: [
                    {"name": "Yoga", "date": "12-04-2015", "id": 1},
                    {"name": "Yoga", "date": "14-04-2015", "id": 2}
                ]
            });
        }, 100);
    },

    registerForCourse: function(course) {
        var that = this;
        setTimeout(function() {
            that.eventHandler.courseRegistrationCompleted({
                "courseId": course.id,
                "students": 12
            }, 100);
        })
    }

});



module.exports = {
    Server: Server,
    FakeServer: FakeServer
};