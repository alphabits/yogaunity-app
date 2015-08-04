
var LoadingPage = function() {}
LoadingPage.prototype.render = function(data, el) {
    el.text("Loading");
};




var UiRoot = function(pages, rootEl) {
    this.rootEl = rootEl;
    this.pages = pages;
    this.pages.loading = LoadingPage;
    this.setPage("loading");
    // this.commandHandler is set by the application
};

UiRoot.prototype.setPage = function(pageName) {
    this.currentPage = new this.pages[pageName](this);
};

UiRoot.prototype.render = function(data) {
    this.rootEl.empty();
    console.log("Rendering ui with ", data);
    this.currentPage.render(data, this.rootEl);
};

UiRoot.prototype.signup = function (username, password) {
    this.commandHandler.signup(username, password);
};

UiRoot.prototype.registerForCourse = function(course) {
    this.commandHandler.registerForCourse(course);
}



module.exports = {
    UiRoot: UiRoot
}