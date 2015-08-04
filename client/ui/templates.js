var _ = require("underscore"),
    $ = require("jquery");


_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};


var compile = function(templateString) {
    var template = _.template(templateString);
    return function(data) {
        return $(template(data))
    }
}



module.exports = {
    compile: compile
}