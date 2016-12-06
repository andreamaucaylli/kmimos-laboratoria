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
     
$(document).ready(function(){


  $(".dropdown-button").dropdown();

  /****form****/
  $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15 // Creates a dropdown of 15 years to control year
  });
  var formu = $("#myform");
  formu.validate({
      // Specify validation rules
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
    $.when(
        $.ajax({ 
           url: "http://localhost:3000/cuidador",
           type: "GET"
        }), 
        $.ajax({
          url: 'https://randomuser.me/api?inc=picture&results=99',
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
           /* $("#image").attr("src", "https://source.unsplash.com/user/{USERNAME}/likes");*/
            $("#resultados").append(cuidadorResultado);
        });
    });
    
      formu.validate();
  });
    /****form****/

});