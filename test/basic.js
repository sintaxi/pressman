var herald = require("../")(__dirname + "/templates")
var should = require("should")

describe("email", function(){

  it("should have welcome email", function(done){
    herald.render("welcome", {}, function(err, body){
      should.not.exist(err)
      body.should.have.property("text")
      body.should.have.property("html")
      done()
    })
  })

  it("should return errors if not exist", function(done){
    herald.render("non-existing", {}, function(err, body){
      should.exist(err)
      should.not.exist(body)
      err.should.eql("template not found")
      done()
    })
  })

  it("should return errors if not exist", function(done){
    herald.render("non-existing", {}, function(err, body){
      should.exist(err)
      should.not.exist(body)
      err.should.eql("template not found")
      done()
    })
  })

})