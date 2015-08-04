

var CommandHandler = function(commandBus) {
    this.commandBus = commandBus;
};
CommandHandler.prototype = {
    signup: function(username, password) {
        this.commandBus.send({
            name: "signup-new-user",
            command: {
                username: username,
                password: password
            }
        })
    },

    login: function(username, password) {
        
    }
}