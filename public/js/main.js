var template ='<div class="col s12 m4">' +
                '<div class="card horizontal hoverable">' +
                    '<div class="card-stacked">' +
                        '<div class="card-content amber white-text">' +
                            '<p>Hi, my name is <strong>{{name}}</strong></p>' +
                            '<p>and i have {{age}} years old</p>'+
                            '<p>i live in {{address}} my phone number is  {{phone}}</p>'+
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>'; 
$(document).ready(function(){
    $.ajax({ 
       url: "http://localhost:3000/helloworld",
       type: "GET",
       success: function(response){
         console.log(response);
           $.each(response, function (i,cuidador) {
                console.log(cuidador);
               var cuidadorResultado = template.replace("{{name}}", cuidador.name)
              .replace("{{age}}", cuidador.age)
              .replace("{{address}}", cuidador.address)
              .replace("{{phone}}", cuidador.contact.phone)
                $("#resultados").append(cuidadorResultado);
            });
        }
    });   
});