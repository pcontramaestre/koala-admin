/*jshint esversion: 6 */
/* jshint esversion: 8 */

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
            console.log('Clase activada');
            $.ajax({
              url: Drupal.url('clases-profesor/activar-clase'),
              type: 'POST',
              dataType: 'json',
              data: {
                idClase: idClase,
              },
              success: function (response) {
                //$('#selector-para-mensajes').html(response[0].data);
                console.log(response);                                
              },
              error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                console.log(textStatus);                
              }        
            });
          }
          if (estado == 'desactivar') {
            $(this).data('estado', 'finalizada');
            $(this).text('Clase finalizada');
            console.log('Clase desactivada');
            // disabled = true
            $(this).prop('disabled', true);
            $('#asignar-estrella').prop('disabled', true);
            $.ajax({
              url: Drupal.url('clases-profesor/desactivar-clase'),
              type: 'POST',
              dataType: 'json',
              data: {
                idClase: idClase,
              },
              success: function (response) {
                //$('#selector-para-mensajes').html(response[0].data);
                console.log(response);
              },
              error: function (jqXHR, textStatus, errorThrown) {                
                console.log(errorThrown);
                console.log(textStatus);
              }        
            });            
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
            console.log(response);
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

      //GRABAR CLASE    
      let recorder, stream;

      

      async function startRecording() {
        stream = await navigator.mediaDevices.getDisplayMedia({
          "video": {
            "displaySurface": "browser"
          },
          "audio": true,
          "preferCurrentTab": true
        });
        
        const options = { mimeType: 'video/webm; codecs=vp9,opus' };
        recorder = new MediaRecorder(stream, options);
        
        const chunks = [];
        recorder.ondataavailable = e => chunks.push(e.data);
        
        recorder.onstop = async () => {
          const completeBlob = new Blob(chunks, { type: chunks[0].type });
          downloadRecording(completeBlob);
        };
        
        recorder.start();
      }

      function pauseRecording() {
        if (recorder && recorder.state === "recording") {
          recorder.pause();
          // Aquí puedes cambiar el estado del botón o interfaz según sea necesario
        } else if (recorder && recorder.state === "paused") {
          recorder.resume();
          // Cambiar estado del botón o interfaz aquí si es necesario
        }
      }

      function stopRecording() {
        recorder.stop();
        stream.getTracks().forEach(track => track.stop());
      }

      // Función para descargar localmente la grabación, se puede adaptar para subir al servidor
      function downloadRecording(blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = "recording.webm";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      }

      // Asociar las funciones con los botones
      document.getElementById("grabar-clase").addEventListener("click", startRecording);
      document.getElementById("pausar-grabacion").addEventListener("click", pauseRecording);
      document.getElementById("finalizar-grabacion").addEventListener("click", stopRecording);

    }
  };
})(jQuery, Drupal);