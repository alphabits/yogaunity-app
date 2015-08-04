
var _ = require("underscore"),
    $ = require("jquery");



var TopMenu = function(parent) {
    this.parent = parent;
};
TopMenu.prototype.render = function(data, el) {
    el.html("<p id='username'></p>");
};



var CourseList = function(parent) {
    this.parent = parent;
    this.children = [];
};
CourseList.prototype.render = function(data, el) {
    el.empty();
    _.each(data.courses(), function(v, k) {
        this.children[k] = new CourseRow(this);
        this.children[k].render(v, el);
    }, this);
};
CourseList.prototype.registerForCourse = function(course) {
    this.parent.registerForCourse(course);
};

var CourseRow = function(parent) {
    this.parent = parent;
};
CourseRow.prototype.render = function(data, el) {
    var that = this;
    console.log("Rendering course ", data)
    var row = $("<div/>", {text: data.name});
    row.on("click", function(e) {
        e.preventDefault();
        that.parent.registerForCourse(data);
    })
    el.append(row);
};



var Page = function(parent) {
    this.parent = parent;
    this.children = {list: new CourseList(this), menu: new TopMenu(this)};
}
Page.prototype.render = function(data, el) {
    var title = $("<h1>Kursusoversigt</h1>");
    var menuContainer = $("<div/>");
    var listContainer = $("<div/>");
    el.append([title, menuContainer, listContainer])
    this.children.list.render(data, listContainer);
    this.children.menu.render(data, menuContainer);
};
Page.prototype.registerForCourse = function(course) {
    this.parent.registerForCourse(course);
};



module.exports = {
    Page: Page
}