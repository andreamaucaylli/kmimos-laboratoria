var template ='<div class="col s12 m4">' +
                '<div class="card horizontal hoverable">' +
                    '<div class="card-stacked">' +
                        '<div class="card-content teal lighten-2 white-text">' +
                            '<p>Nombre: <strong>{{name}}</strong></p>' +
                            '<p>Edad: {{age}} </p>'+
                            '<p>Dirección: {{address}}</p>'+
                            '<p>Telefóno:{{phone}}</p>'+
                            '<img src="{{image}}" id="image">'+
                        '</div>' +
                     '</div>' +
                '</div>' +
            '</div>'; 
     
var distritoIngresado = $('#icon_prefix').val();

$(document).ready(function(){
  $(".dropdown-button").dropdown();

  $(".datepicker").pickadate({
      selectMonths: true,
      selectYears: 15
  });
  var formu = $("#myform");

  formu.validate({
    rules: {
      lugar: "required",
      fecha: "required",
    },

    messages: {
      lugar: "Ingrese un lugar",
      fecha: "Eliga una fecha",
    },

    errorElement : 'div',
    errorPlacement: function(error, element) {
      var placement = $(element).data("error");
        if (placement) {
          $(placement).append(error)
        } else {
        error.insertAfter(element);
        }
      }
    });

  $("#btn").click(function(e){
    e.preventDefault();

    formu.validate();

    $.when(
      $.ajax({ 
        url: "http://localhost:3000/cuidadores?lugar="+distritoIngresado,
        type: "GET"
      }), 
      $.ajax({
        url: 'https://randomuser.me/api?inc=picture&results=9',
        dataType: 'json',
        type: "GET"
      })
    ).then(function(cuidadores,data){
      console.log(cuidadores);
      console.log(data);
      $.each(cuidadores[0], function (i,cuidador) {
        var cuidadorResultado = template.replace("{{name}}", cuidador.name)
          .replace("{{age}}", cuidador.age)
          .replace("{{address}}", cuidador.address)
          .replace("{{phone}}", cuidador.contact.phone)
          .replace("{{image}}", data[0].results[i].picture.medium);
          $("#resultados").append(cuidadorResultado);
        });
    });    
  });
});