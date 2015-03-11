
var path        = require("path")
var terraform   = require("terraform")
var Thug        = require("thug")

exports = module.exports = function (templatesPath, globals){
  globals = globals || {}
  return new App(templatesPath, globals)
}

function App(templatesPath, globals) {
  this.root = terraform.root(templatesPath, globals)
  this.emails = {}
}

App.prototype.email = function(template, filters){
  var that = this
  var model = new Thug({
    "filters": {
      "in": filters
    },
    "locals" : {
      "template": template
    }
  })

  model.constructor.prototype.write = function(identifier, record, callback){
    var obj   = {}
    var total = 2
    var count = 0

    var cb = function(type){
      return function(err, out){
        count++
        obj[type] = out
        if (count == total){
          return callback(obj)
        }
      }
    }

    record["layout"] = "_layout.jade"
    that.root.render(template + "/html.jade", record, cb("html"))

    record["layout"] = "_layout.ejs"
    that.root.render(template + "/text.ejs", record, cb("text"))
  }

  this.emails[template] = model
}


App.prototype.exports = function(){
  var that = this
  return function(template, args, callback){
    if (!callback) {
      callback = args
      args     = {}
    } else {
      args = args || {}
    }

    if (that.emails[template]){
      that.emails[template].set(args, callback)
    }else{
      callback("template not found")
    }
  }
}

