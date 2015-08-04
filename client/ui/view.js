
var _ = require("underscore");


var viewMixins = {

    redirect: function(page) {
        this.parent.redirect(page);
    }

}


module.exports = {
    create: function(View, methods) {
        _.extend(View.prototype, viewMixins);
        _.extend(View.prototype, methods);

        return View;
    }
}