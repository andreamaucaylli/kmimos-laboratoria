var template ='<div class="col s12 m4">' +
                '<div class="card horizontal hoverable">' +
                    '<div class="card-stacked">' +
                        '<div class="card-content amber white-text">' +
                            '<p>Hi, my name is <strong>{{name}}</strong></p>' +
                            '<p>and i have {{age}} years old</p>'+
                            '<p>i live in {{address}} my phone number is  {{phone}}</p>'+
                            '<p>{{distrito}}<p>'+
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

  $("#btn").click(function(){

    formu.validate();
    
    $.ajax({ 
        url: "http://localhost:3000/cuidadores",
        type: "GET",
        success: function(response){
          console.log(response);
          $.each(response, function (i,cuidador) {
            console.log(cuidador);
            var cuidadorResultado = template.replace("{{name}}", cuidador.name)
              .replace("{{age}}", cuidador.age)
              .replace("{{address}}", cuidador.address)
              .replace("{{distrito}}", cuidador.distrito)
              .replace("{{phone}}", cuidador.contact.phone)
            $("#resultados").append(cuidadorResultado);
          });
        }
      });

  });

});