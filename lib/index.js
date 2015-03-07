
var path  = require("path")
var fs    = require("fs")
var email = require("./email")
var http  = require("http")
var url   = require('url')

module.exports = function(templatesPath){
  var p     = path.resolve(templatesPath)
  var app   = email(p)
  var list  = fs.readdirSync(p)

  list.forEach(function(ent){
    var stat = fs.statSync(path.join(p, ent))
    if (stat.isDirectory()) {
      try {
        var filters = require(path.join(p, ent, "_filters.js"))
        if (typeof filters == 'function') {
          filters = [filters]
        }
      } catch (e) {
        var filters = []
      }
      app.email(ent, filters)
    }
  })

  return {
    render: app.exports(),
    listen: function(){

      var server = http.createServer(function (req, rsp) {

        var paths = url.parse(req.url).pathname.split('/')

        var format   = paths[1] || "html"
        var template = paths[2]
        var fixture  = paths[3]

        var render = app.exports()
        render(template, function(err, body){

          if (err) {
            rsp.writeHead(404, { 'Content-Type': "text/plain", 'Content-Length': err.length });
            rsp.end(err)
          } else {
            var contentType = format == "text"
              ? "text/plain"
              : "text/html"
            rsp.writeHead(200, {
              'Content-Type': contentType,
              'Content-Length': body[format].length
            })
            rsp.end(body[format])
          }
        })
      })

      return server.listen.apply(server, arguments)
    }
  }
}
