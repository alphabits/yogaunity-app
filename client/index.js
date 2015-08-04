
var $ = require("jquery"),
    data = require("./data"),
    commands = require("./commands"),
    ui = require("./ui/core");




var commands = new commands.Fake();
var dataSource = new data.Fake();

$(function() {
    var root = new ui.Application(commands, dataSource, $("body"));
    root.setPageName("courses");
    root.render();
});
