var pressman = require("../")(__dirname + "/templates", { myglobal: "foo" })
var should = require("should")

describe("server:", function(){

  var server;
  before(function(done){
    server = pressman.listen(9001, function(){
      done()
    })
  })

  it("should have a test server", function(done){
    done()
  })

  after(function(done){
    server.close(function(){
      done()
    })
  })

})