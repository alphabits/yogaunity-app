
var _ = require("underscore"),
    $ = require("jquery"),
    view = require("./view"),
    templates = require("./templates"),
    menu = require("./menu");



var courseRowTemplate = templates.compile(
    '<tr><td>{{time}}</td><td>{{name}}</td><td>{{seats}}</td><td class="register">Tilmeld</td></tr>');


var courseTableTemplate = templates.compile(
    '<table id="course-list">' + 
        '<thead><tr><td>Tid</td><td>Navn</td><td>Tilmeldte</td><td></td></tr></thead>' + 
        '<tbody></tbody>' + 
    '</table>');


var ticketStatusTemplate = templates.compile(
    '<div><p id="status">{{ticketsLeft}} klip tilbage</p><p id="buy-link">Køb nye</p></div>');



var CourseList = view.create(function(parent, commands, data) {
    this.parent = parent;
    this.commands = commands;
    this.data = data;
    this.generateDom();

    _.bindAll(this, "renderCourse", "renderCourses");
},
{

    generateDom: function() {
        this.table = courseTableTemplate();
        this.tbody = this.table.find("tbody");
    },

    loading: function() {
        this.tbody.empty();
        this.tbody.append($("<tr><td colspan='4'>Loading...</td></tr>"));
    },

    render: function(el) {
        this.loading();
        el.append(this.table);
        this.data.getCourses().then(this.renderCourses);
    },

    renderCourses: function(courses) {
        var rows = _.map(courses, this.renderCourse);
        this.tbody.empty();
        this.tbody.append(rows);
    },

    renderCourse: function(course) {
        var that = this;
        var row = courseRowTemplate(course);
        var button = row.find("td.register");
        button.on("click", function(e) {
            e.preventDefault();
            that.commands.registerForCourse(course).then(function() {
                console.log("TILMELTD!", course)
                button.text(" TILMELDT!");
            });
        });
        return row;
    }
});



var TicketStatus = view.create(function(parent, commands, data) {
    this.parent = parent;
    this.data = data;

    _.bindAll(this, "renderTicketStatus", "onBuyClick")

    this.generateDom();
}, 
{
    generateDom: function() {
        this.container = $('<div/>');
        this.container.on("click", "#buy-link", this.onBuyClick)
    },

    onBuyClick: function(e) {
        this.parent.redirect("buyTickets");
    },

    render: function(el) {
        el.append(this.container);
        this.data.getTicketStatus().then(this.renderTicketStatus);
    },

    renderTicketStatus: function(ticketStatus) {
        this.container.append(ticketStatusTemplate(ticketStatus));
    }

});


var CoursePage = view.create(function(parent, commands, data) {
    this.parent = parent;
    this.children = {
        menu: new menu.TopMenu(this, commands, data),
        list: new CourseList(this, commands, data),
        ticketStatus: new TicketStatus(this, commands, data)
    };
},
{
    render: function(el) {
        var menuContainer = $("<div id='menu'/>");
        var listContainer = $("<div id='courses'/>");
        var ticketStatusContainer = $("<div id='courses'/>");

        this.children.menu.render(menuContainer);
        this.children.list.render(listContainer);
        this.children.ticketStatus.render(ticketStatusContainer);
        
        el.append(menuContainer, listContainer, ticketStatusContainer);
    }

});


module.exports = {
    CoursePage: CoursePage
};