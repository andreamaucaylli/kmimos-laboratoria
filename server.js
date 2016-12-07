var express = require("express");
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var dream = require('dreamjs');

io.on("connection", function(client) {
   client.on("conectando", function (usuario) {
    usuario.status = "Conected";
    console.log(usuario);
    client.broadcast.emit("conectado", usuario)
  });
});
io.sockets.on('connection', function(client){
   var userName;
  console.log("user connected!");
  client.on('message', function(message){
      client.emit('message', 'me: ' + message.contenido);
      client.broadcast.emit('message', message.usuario + ' says: ' + message.contenido);
    //}
    });
});

dream.customType('pi', function () {
  return Math.PI;
});
 var distritos = ['Lima', 'Ate', 'Barranco', 'Breña', 'Comas', 'Chorrillos', 'El Agustino', 'Jesús María', 
  'La Molina', 'La Victoria', 'Lince', 'Magdalena del Mar', 'Miraflores', 'Pueblo Libre', 'Puente Piedra',
  'Rimac', 'San Isidro', 'Independencia', 'San Juan de Miraflores', 'San Luis', 'San Martin de Porres', 'San Miguel',
  'Santiago de Surco', 'Surquillo', 'Villa María del Triunfo', 'San Juan de Lurigancho', 'Santa Rosa', 'Los Olivos',
  'San Borja', 'Villa El Savador', 'Santa Anita', 'Callao', 'Bellavista', 'Carmen de la Legua', 'La Perla', 'La Punta', 'Ventanilla'];
dream.customType('distrito', function (helper) {
  return helper.oneOf(distritos);
});
var genero = ['women', 'men'];
var numero = [];
for (var i = 0; i <= 99; i++) {
    numero.push(i);
}
dream.customType('imagen', function(helper){
  return 'https://randomuser.me/api/portraits/med/' + helper.oneOf(genero) + '/' + helper.oneOf(numero) + '.jpg' ;
});
var cuidadores = dream
  .schema({
    name: 'name',
    age: 'age',
    distrito: 'distrito',
    imagen: 'imagen',
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
app.set("port", process.env.PORT || 3000);
app.use(express.static(__dirname + "/public"));
app.listen(app.get("port"), function(){
    console.log("Servidor encendido!!");
});
