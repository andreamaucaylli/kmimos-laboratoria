var express = require("express");
var app = express();
var dream = require('dreamjs');


dream.customType('pi', function () {
  return Math.PI;
});

dream.customType('distrito', function (helper) {
  var distrito = ['Lima', 'Lurin', 'Ancon'];
  return helper.oneOf(distrito);
});

var cuidadores = dream
  .schema({
    name: 'name',
    age: 'age',
    distrito: 'distrito',
    address: 'address',
    contact: {
      phone: 'phone',
      servicePhone: /^(800[1-9]{6})$/
    },
    foo: function () {
      return 'bar';
    },
    pi: 'pi',
    hello: 'hello'
  })
  .generateRnd(100)
  .output()
  
app.get('/cuidadores', function (req, res) {
	var lugar = req.query.lugar;
	var cuidadoresFiltrados = [];
	for (var i = 0; i < cuidadores.length; i++) {
		var cuidador = cuidadores[i];
		if (cuidador.distrito == lugar) {
			cuidadoresFiltrados.push(cuidador);
		}		
	}
  	res.send(cuidadoresFiltrados);
})

app.use(express.static(__dirname + "/public"));
app.listen(3000,function(){
    console.log("Servidor encedido!!");
});