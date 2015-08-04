var signup = require("../ui/signup");



describe("Signup Page", function() {

    describe("Signup Form", function() {

        it("should send signup-new-user command on submit", function() {

            var callCount = 0;
            var commands = {
                send: function(command) {
                    command.name.should.equal("signup-new-user")
                    callCount += 1;
                }
            }
            var signupForm = new signup.SignupForm(commands);
            signupForm.submit();

            callCount.should.equal(1);
        })

    })

})