var pressman = require('./')('./test/templates')

pressman.listen(9001, function(){
  console.log("listening at http://127.0.0.1")
})