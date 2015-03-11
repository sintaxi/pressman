var pressman = require('./')('./test/templates', { myglobal: "foo" })

pressman.listen(9001, function(){
  console.log("listening at http://127.0.0.1")
})