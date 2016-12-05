var express = require("express");
var app  = express();
app.use(express.static(__dirname + "/public"));
app.listen(3002, function(){
	console.log("servidor encendido");
});