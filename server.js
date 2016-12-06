var express = require("express");
var app = express();
var dream = require('dreamjs');
var helloworld = dream.output();
app.use(express.static(__dirname + "/public"));

dream.customType('pi', function () {
  return Math.PI;
});
var data3= dream
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
  .generateRnd(100)
  .output();
  
app.get('/helloworld', function (req, res) {
  res.send(data3);
})
app.listen(3001,function(){
    console.log("Servidor encedido!!");
});