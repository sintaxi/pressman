# pressman

## Making emails awesome is fun and easy!


Specify a templates directory with your email templates in them like so...

    templates
      |
      |- welcome
      |   |- html.jade
      |   `- text.ejs
      `- password-reset
          |- html.jade
          `- text.ejs

Next you then may render whichever template is needed...

    var pressman = require("pressman")(__dirname + "/templates")

    pressman.render("welcome", {...}, function(err, mgs){
      console.log(mgs)
      // { text: "Welcome", html: "<h1>Welcome</h1>" }
    })

    pressman.render("password-reset", { token: token }, function(err, mgs){
      /// console.log(mgs)
    })

