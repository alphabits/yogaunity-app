var $ = require("jquery");


var SignupForm = function(parent) {
    this.parent = parent;
}
SignupForm.prototype.render = function(el) {
    var that = this;
    var form = $("<form/>")
    var usernameField = $("<input/>", {"type": "text", "name": "username"})
    var passwordField = $("<input/>", {"type": "password", "name": "password"})
    var submit = $("<input/>", {"type": "submit", "value": "Signup"})
    form.append(usernameField);
    form.append(passwordField);
    form.append(submit);

    form.on("submit", function(e) {
        e.preventDefault();
        that.parent.signup(usernameField.val(), passwordField.val())
    });

    el.append(form);
};


var Page = function(parent) {
    this.parent = parent;
    this.children = {form: new SignupForm(this)};
}
Page.prototype.render = function(el) {
    var title = $("<h1>Signup</h1>");
    var formContainer = $("<div/>");
    el.append([title, formContainer])
    this.children.form.render(formContainer);
};
Page.prototype.signup = function(username, password) {
    this.parent.signup(username, password);
};



module.exports = {

    Page: Page

};