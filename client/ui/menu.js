var _ = require("underscore"),
    $ = require("jquery"),
    templates = require("./templates"),
    view = require("./view");



var menuTemplate = templates.compile(
    '<div id="topmenu"><span data-page="courses">Kurser</span> - <span data-page="buyTickets">Køb klip</span></div>')



var TopMenu = view.create(function(parent, commands, data) {
    this.parent = parent;
    this.data = data;

    _.bindAll(this, "onMenuClick");

    this.generateDom();
}, 
{

    generateDom: function() {
        this.menu = menuTemplate();
        this.menu.on("click", "[data-page]", this.onMenuClick);
    },

    onMenuClick: function(e) {
        e.preventDefault();
        var pageName = $(e.target).data("page");
        console.log("Menu redirecting to ", pageName);
        this.parent.redirect(pageName);
    },

    render: function(el) {
        el.append(this.menu);
    }

});


module.exports = {
    TopMenu: TopMenu
}