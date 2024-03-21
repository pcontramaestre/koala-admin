(function ($, Drupal) {
  Drupal.behaviors.suscriptions_events = {
    attach: function (context, settings) {

      Drupal.ajax.prototype.commands.suscriptionsEventsFunctionName = function(ajax, response, status) {
        // Código a ejecutar en la función
        console.log('Función ejecutada con éxito');
        console.log(response);
      };

      //console.log('Suscriptions Events');
      // Leer valor del localStorage
      var semanas = localStorage.getItem('semanas');
      var totalClases = localStorage.getItem('totalClases');
          
      if (semanas) {
        console.log(semanas);
        // Crear cookie con el valor del localStorage
        document.cookie = "numerosemanas=" + semanas + "; path=/";
      } 
      // Si no hay valor, se crea el objeto
      if (totalClases) {
        console.log(totalClases);
        // Crear cookie con el valor del localStorage
        document.cookie = "totalclases=" + totalClases + "; path=/";
      }
    }
  };
})(jQuery, Drupal);