var pressman = require("../")(__dirname + "/templates", { myglobal: "foo" })
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

  it("should have globals", function(done){
    pressman.render("welcome", {}, function(err, body){
      should.not.exist(err)
      body.should.have.property("text")
      body.should.have.property("html")
      body.html.should.include("foo")
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
      body.html.should.not.include("<link")
      body.html.should.not.include("<style type=\"text/css\">h1 {")
      body.html.should.include("<h1 style=\"color: pink\">")
      done()
    })
  })

})
