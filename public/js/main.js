var template ='<div class="col s12 m12">' +
                '<div class="card horizontal hoverable">' +
                    '<div class="card-stacked">' +
                        '<div class="card-content teal lighten-2 white-text">' +
                            '<p>Nombre: <strong>{{name}}</strong></p>' +
                            '<p>Edad: {{age}} </p>'+
                            '<p>Dirección: {{address}}</p>'+
                            '<p>Distrito: {{distrito}}</p>'+
                            '<p>Teléfono: {{phone}}</p>'+
                            '<img src="{{image}}" id="image">'+
                        '</div>' +
                     '</div>' +
                '</div>' +
            '</div>';

$(document).ready(function(){
  $("#icon_prefix").keyup(validarForm);

  function validarForm () {
  var distritoInput = $(this).val();
  var valor = true;
  var regexDistrito = /^[a-zñáéíóúü]+$/gi;
    if (!regexDistrito.test(distritoInput)) {
      valor = false;
    }
}

  $("#btn").click(function(e){
    e.preventDefault();
    var maxImages = 9;
    var distritoIngresado = $('#icon_prefix').val();  

    $.ajax({ 
      url: "https://localhost:3000/cuidadores?lugar="+distritoIngresado,
      type: "GET",
      success: function(cuidadores){
        $.each(cuidadores, function (i,cuidador) {
          var cuidadorResultado = template.replace("{{name}}", cuidador.name)
            .replace("{{age}}", cuidador.age)
            .replace("{{address}}", cuidador.address)
            .replace("{{distrito}}", cuidador.distrito)
            .replace("{{phone}}", cuidador.contact.phone)
            .replace("{{image}}", cuidador.imagen);
            $("#resultados").append(cuidadorResultado);
          });
        }
    });  
  });
});
