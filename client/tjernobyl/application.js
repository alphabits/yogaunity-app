var _ = require("underscore");





var DataModel = function(defaultPage) {
    this.currentPage = defaultPage;
    this.serverData = {};
};

_.extend(DataModel.prototype, {
    updateServerData: function(data) {
        this.serverData = data;
    },
    courses: function() {
        return this.serverData.courses;
    },
    userIsAnonymous: function() {
        return !_.has(this.serverData, "user");
    }
})





var Yu = function(server, ui) {

    this.initialized = false;
    this.server = server;
    this.ui = ui;

    this.server.eventHandler = this;
    this.ui.commandHandler = this;

    this.model = new DataModel();

};
_.extend(Yu.prototype, {

    init: function() {
        this.render();
        this.server.fetchData();
    },

    render: function() {
        this.ui.render(this.model);
    },
    
    dataFetched: function(data) {
        this.model.updateServerData(data);
        if (!this.initialized) {
            this.redirect();
            this.initialized = true;
        } else {
            this.render();
        }
    },

    redirect: function() {
        var page = this.getRedirectPage();
        console.log("Redirecting to: ", page, "from ", this.model.currentPage);
        this.openPage(page);
    },

    getRedirectPage: function() {
        if (this.model.userIsAnonymous()) {
            return "login";
        }
        if (!this.model.userIsAnonymous() && 
                _.contains(["signup", "login"], this.model.currentPage)) {
            return "courses"
        }
        if (this.model.currentPage == null) {
            return "courses";
        }
        return this.model.currentPage;
    },

    signup: function(username, password) {
        this.server.signup(username, password);
    },

    signupNewUserAccepted: function(e) {
        this.openPage("login");
    },

    openPage: function (pageName) {
        if (pageName !== this.model.currentPage) {
            this.model.currentPage = pageName;
            this.ui.setPage(pageName);
            this.render();
        }
    },

    registerForCourse: function(course) {
        this.server.registerForCourse(course);
    },

    courseRegistrationCompleted: function(e) {
        this.server.fetchData();
    }
})





module.exports = {

    Yu: Yu

};