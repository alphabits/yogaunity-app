
var passport = require("passport"),
    FacebookStrategy = require("passport-facebook").Strategy,
    models = require("./models");


module.exports = function (app, options) {

    if (!options.successRedirect)
        options.successRedirect = "/account";
    if (!options.failureRedirect)
        options.failureRedirect = "/login"


    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        models.User.findById(id, function(err, user) {
            if (err || !user) return done(err, null);
            done(null, user);
        })
    });


    return {

        init: function() {
            var config = options.providers;

            passport.use(new FacebookStrategy({
                clientID: config.facebook.appId,
                clientSecret: config.facebook.appSecret,
                callbackURL: '/auth/facebook/callback'
            }, function(accessToken, refreshToken, profile, done) {
                var authId = "facebook:" + profile.id;
                models.User.findOne({authId:authId}, function (err, user) {
                    if (err) return done(err, null);
                    if (user) return done(null, user);
                    user = new models.User({
                        authId: authId,
                        name: profile.displayName,
                        created: Date.now(),
                        role: 'yogi'
                    });
                    user.save(function(err) {
                        if (err) return done(err, null);
                        done(null, user);
                    })
                })
            }));

            app.use(passport.initialize());
            app.use(passport.session());
        },

        registerRoutes: function() {
            app.get("/auth/facebook", function (req, res, next) {
                passport.authenticate("facebook", {
                    callbackURL: "/auth/facebook/callback" //?redirect=" + encodeURIComponent("https://localhost:8080/")
                })(req, res, next);
            });

            app.get("/auth/facebook/callback", 
                passport.authenticate("facebook",
                    {successRedirect: options.successRedirect, failureRedirect: options.failureRedirect}
                ));
        }

    }

}