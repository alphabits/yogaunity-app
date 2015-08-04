var _ = require("underscore"),
    courses = require("./courses"),
    orders = require("./orders"),
    login = require("./login");


var pages = {

    login: login.LoginPage,
    courses: courses.CoursePage,
    buyTickets: orders.BuyTicketsPage

};


var Application = function(commands, data, el) {
    this.commands = commands;
    this.data = data;
    this.el = el;
};

_.extend(Application.prototype, {

    setPageName: function(pageName) {
        this.currentPageName = pageName;
        this.currentPage = new pages[pageName](this, this.commands, this.data);
    },

    redirect: function(pageName) {
        if (this.currentPageName !== pageName) {
            this.setPageName(pageName);
            this.render();
        }
    },

    render: function() {
        this.el.empty();
        this.currentPage.render(this.el);
    },

});


module.exports = {

    Application: Application

};