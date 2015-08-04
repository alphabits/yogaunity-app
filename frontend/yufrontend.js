var fs = require("fs"),
    express = require("express"),
    https = require("https"),
    authlib = require("./auth"),
    credentials = require("./credentials"),
    mongoose = require("mongoose");


var mongooseOptions = {server:{socketOptions:{keepAlive:1}}};
mongoose.connect(credentials.mongoConnectionString, mongooseOptions);


var app = express();

var handlebars = require("express-handlebars").create({defaultLayout: "main"});
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");


var MongoSession = require("session-mongoose")(require("connect"));
var sessionStore = new MongoSession({url: credentials.mongoConnectionString})
app.use(require("cookie-parser")(credentials.cookieSecret));
app.use(require("express-session")({store: sessionStore}));
app.use(express.static(__dirname + "/static"))


var auth = authlib(app, {
    providers: credentials.authProviders,
    successRedirect: "/account",
    failureRedirect: "/unauthorized"
});
auth.init();
auth.registerRoutes();


var serverOptions = {
    key: fs.readFileSync(__dirname + "/keys/yogaunity.pem"),
    cert: fs.readFileSync(__dirname + "/keys/yogaunity.crt")
};

https.createServer(serverOptions, app).listen(8080, function() {
    console.log("Express started in " + app.get("env") + " mode on port 8080");
});


var authorized = function(req, res, next) {
    if (!req.session.passport.user)
        return res.redirect(303, "/unauthorized");
    next();
}


app.get("/unauthorized", function(req, res) {
    res.render("login");
});

app.get("/", function(req, res) {
    res.render("login");
});

app.get("/app", authorized, function(req, res) {
    res.render("app", {user: req.user.name});
});

app.get("/api/user", authorized, function(req, res) {
    res.json({
        name: req.user.name,
        created: req.user.created,
        role: req.user.role
    });
})



//app.use(express.static(__dirname + "/static"));











