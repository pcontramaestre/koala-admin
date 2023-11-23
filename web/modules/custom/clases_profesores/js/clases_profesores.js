(function ($, Drupal) {
  Drupal.behaviors.clasesProfesoresBehavior = {
    attach: function (context, settings) {
      $(context).find('.clases-del-profesor').once('clasesProfesoresBehavior').each(function () {
        // Este código se ejecutará una sola vez por cada elemento iframe.
        console.log('Se ha adjuntado el comportamiento a la clase del profesor.');
        $('#activar-clase', context).click(function (e) {
          e.preventDefault();
          var idClase = $(this).data('id-clase');
          var estado = $(this).data('estado');
          if (estado == 'activar') {
            $(this).data('estado', 'desactivar');
            $(this).text('Finalizar clase');
          }
          if (estado == 'desactivar') {
            $(this).data('estado', 'finalizada');
            $(this).text('Clase finalizada');
            // disabled = true
            $(this).prop('disabled', true);
            $('#asignar-estrella').prop('disabled', true);

          }
        });
      });

      $('#asignar-estrella', context).click(function (e) {
        e.preventDefault();
        var idClase = $(this).data('id-clase');
        $.ajax({
          url: Drupal.url('clases-profesor/asignar-estrella'),
          type: 'POST',
          dataType: 'json',
          data: {
            idClase: idClase,
          },
          success: function (response) {
            // La lógica para actualizar la interfaz aquí
            // console.log(response);
            // console.log('Se ha asignado la estrella a la clase.');
            /*
              Response:
              0: 
              command: "insert"
              data: "Nueva cantidad: 5"
              method: "html"
              selector: "#selector-para-mensajes"
              settings: null
            */
            // console.log(response[0].data);
            // Agregar mensaje de éxito en la interfaz, #selector-para-mensajes
            $('#selector-para-mensajes').html(response[0].data);
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
          }        
        });
      });

      // Activar y desactivar clase #activar-clase
      //console.log('Se ha adjuntado el comportamiento al botón de activar clase.');
    }
  };
})(jQuery, Drupal);