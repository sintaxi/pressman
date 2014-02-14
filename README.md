# slush-emails

## Making emails awesome is fun and easy!

    var email = require("slush-email")

    email("welcome", {...}, function(err, mgs){
      console.log(mgs)
      // returns..
      // { text: "Welcome", html: "<h1>Welcome</h1>" }
    })

    email("invite", { token: token }, function(err, mgs){
      console.log(mgs)
    })