
var _ = require("underscore"),
    $ = require("jquery"),
    view = require("./view");



var LoginPage = view.create(function(root, commands) {
    this.commands = commands;
    this.root = root;
    this.generateDom();

    _.bindAll(this, "onLoginSuccess", "onLoginFail");
}, 
{
    generateDom: function() {
        var that = this;

        this.form = $("<form><input type='text' name='username' /><input type='text' name='password' /><input type='submit' value='Login' /></form>");
        this.usernameField = this.form.find("[name=username]");
        this.passwordField = this.form.find("[name=password]");

        this.form.on("submit", function(e) {
            e.preventDefault();
            that.login(that.usernameField.val(), that.passwordField.val());
        });
    },

    login: function(username, password) {
        this.commands.login(username, password)
            .done(this.onLoginSuccess)
            .fail(this.onLoginFail);
    },

    onLoginSuccess: function() {
        this.root.redirect("courses");
    },

    onLoginFail: function(err) {
        alert(err.reason);
    },

    render: function(el) {
        el.empty();
        el.append(this.form);
    }

});



module.exports = {
    LoginPage: LoginPage
};