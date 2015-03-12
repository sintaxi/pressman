var pressman = require("../")(__dirname + "/templates")
var should   = require("should")

describe("email", function(){

  it("should have welcome email", function(done){
    pressman.render("welcome", {}, function(err, body){
      should.not.exist(err)
      body.should.have.property("text")
      body.should.have.property("html")
      done()
    })
  })

  it("should return errors if not exist", function(done){
    pressman.render("non-existing", {}, function(err, body){
      should.exist(err)
      should.not.exist(body)
      err.should.eql("template not found")
      done()
    })
  })

  it("should return errors if not exist", function(done){
    pressman.render("non-existing", {}, function(err, body){
      should.exist(err)
      should.not.exist(body)
      err.should.eql("template not found")
      done()
    })
  })

  it("should inline CSS", function(done){
    pressman.render("welcome", {}, function(err, body){
      should.not.exist(err)
      // it("should not include link tags", function(done) {
        body.html.should.not.include("<link")
      // })
      // it("should not include non-media query styles in the head", function(done) {
        body.html.should.not.include("<style type=\"text/css\">h1 {")
      // })
      // it("should inline styles outside of media queries", function(done) {
        body.html.should.include("<h1 style=\"color: pink\">")
      // })
      done()
    })
  })

})
