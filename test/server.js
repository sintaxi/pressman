var herald = require("../")(__dirname + "/templates")
var should = require("should")

describe("server:", function(){

  before(function(done){
    herald.listen(9001, function(){
      done()
    })
  })

  it("should have a test server", function(done){
    done()
  })
})