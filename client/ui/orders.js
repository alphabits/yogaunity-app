
var _ = require("underscore"),
    $ = require("jquery"),
    menu = require("./menu"),
    templates = require("./templates"),
    view = require("./view");



var buyTicketFormTemplate = templates.compile(
    '<div class="ticket-form">' +
    '<h2>Køb klip</h2>' +
    '<form>' + 
        '<label for="product">5 klip for {{fiveTicketPrice}} <input type="radio" name="product" value="five" /></label>' + 
        '<label for="product">10 klip for {{tenTicketPrice}} <input type="radio" name="product" value="ten" /></label>' + 
        '<input type="submit" name="submit" value="Køb" />' +
    '</form>' +
    '</div>')



var BuyTicketsForm = view.create(function(parent, commands, data) {
    this.parent = parent;
    this.data = data;
    this.commands = commands;

    _.bindAll(this, "onSubmit", "renderForm", "onOrderComplete");

    this.generateDom();
},
{

    generateDom: function() {
        this.container = $("<div/>");
        this.container.on("submit", this.onSubmit);
    },

    onSubmit: function(e) {
        e.preventDefault();
        this.commands.buyTickets(this.container.find("input[type=radio]:checked").val()).then(this.onOrderComplete);
    },

    onOrderComplete: function() {
        this.redirect("courses");
    },

    render: function(el) {
        el.append(this.container);
        this.data.getUser().then(this.renderForm);
    },

    renderForm: function(user) {
        console.log("Rendering form into ", this.container);
        var form = buyTicketFormTemplate(user);
        this.container.append(form);
    }
});



var BuyTicketsPage = view.create(

    function(parent, commands, data) {
        this.parent = parent;

        this.children = {
            menu: new menu.TopMenu(this, commands, data),
            form: new BuyTicketsForm(this, commands, data)
        };
    }, 

    {
        render: function(el) {
            var menuContainer = $("<div id='menu'/>");
            var formContainer = $("<div id='buy-tickets'/>");

            this.children.menu.render(menuContainer);
            this.children.form.render(formContainer);

            el.append(menuContainer, formContainer);
        }
    }

);



module.exports = {
    BuyTicketsPage: BuyTicketsPage
}