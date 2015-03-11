var pressman = require("../")(__dirname + "/templates", { myglobal: "foo" })
var should = require("should")

describe("server:", function(){

  before(function(done){
    pressman.listen(9001, function(){
      done()
    })
  })

  it("should have a test server", function(done){
    done()
  })
})