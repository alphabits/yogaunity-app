var $ = require("jquery"),
    ui = require("./ui/core"),
    signup = require("./ui/signup"),
    courseOverview = require("./ui/course-overview"),
    cookies = require("cookies-js"),
    server = require("./server"),
    session = require("./session"),
    application = require("./application");


var socket = io.connect('http://localhost:8080');


$(function() {

    var pages = {
        signup: signup.Page,
        courses: courseOverview.Page
    };

    // Exposing the uiRoot for testing
    ui = new ui.UiRoot(pages, $("body"))
    var sessionManager = new session.Session(cookies);
    var theServer = new server.FakeServer(socket, sessionManager);
    var app = new application.Yu(theServer, ui);

    app.init();
});


/*

socket.on("backend-event", function(data) {
    if (data.name == "signup-new-user-rejected") {
        alert("User signup failed: " + data.reason)
    }
})
$(function () {
    $("button").on("click", function(e) {
        e.preventDefault();
        console.log("SUBMIT")
        socket.emit("client-command", {
            "name": "signup-new-user", 
            "userid": 42, 
            "username": $("[name=email]").val(), 
            "password": $("[name=password]").val()});
    })
});

*/
