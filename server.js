var express = require("express");
var app = express();
var dream = require('dreamjs');

dream.customType('pi', function () {
  return Math.PI;
});
var cuidador = dream
  .schema({
    name: 'name',
    age: 'age',
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
  .generateRnd(99)
  .output();
  
app.get('/cuidador', function (req, res) {
  res.send(cuidador);
})
app.use(express.static(__dirname + "/public"));
app.listen(3000,function(){
    console.log("Servidor encedido!!");
});