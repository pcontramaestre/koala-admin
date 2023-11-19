(function ($, Drupal) {
  Drupal.behaviors.enviarEstrellas = {
    attach: function (context, settings) {
      $('.estrella', context).once('enviarEstrellas').each(function () {
        $(this).click(function () {
          var idClase = $(this).attr('id-clase');
          // Llamada AJAX para enviar estrella.
          // Puedes implementar aquí una llamada a fetch o $.ajax de jQuery
        });
      });

      // Opcionalmente, si agregas un sondeo en el lado del estudiante:
      // setInterval(..., 10000);
    }
  };
})(jQuery, Drupal);