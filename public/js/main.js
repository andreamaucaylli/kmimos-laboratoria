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
      formu.validate();
  });
    /****form****/

});