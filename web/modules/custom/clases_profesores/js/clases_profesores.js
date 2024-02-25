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
                startRecording();
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
                stopRecording();
              },
              error: function (jqXHR, textStatus, errorThrown) {                
                console.log(errorThrown);
                console.log(textStatus);
              }        
            });            
          }
        });
      });

      

      

      // Activar y desactivar clase #activar-clase
      //console.log('Se ha adjuntado el comportamiento al botón de activar clase.');


    }
  };


  $('#asignar-estrella').click(function (e) {
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


        //GRABAR CLASE    
        let recorder, stream;


        async function startRecording() {
          try {
            console.log('Iniciando grabación');
            // Obtener la pantalla con el audio del sistema
            const screenStream = await navigator.mediaDevices.getDisplayMedia({
              video: {
                displaySurface: "browser",
                width: { max: 854 },
                height: { max: 480 },
                frameRate: { max: 15 },
              },
              audio: true,  // Asegúrate de solicitar el audio aquí para capturar el audio del sistema
              "preferCurrentTab": true,
              "cursor": 'always',
            });
        
            // Obtener el audio del micrófono
            const micStream = await navigator.mediaDevices.getUserMedia({
              audio: {
                sampleRate: 8100,
                echoCancellation: true,
                noiseSuppression: true,
              },
              video: false,  // No necesitamos video del getUserMedia
            });
        
            // Crea un nuevo MediaStream que combina el audio del micrófono con el video y el audio del sistema
            const combinedStream = new MediaStream([
              ...screenStream.getVideoTracks(),
              ...micStream.getAudioTracks(),
              ...screenStream.getAudioTracks(),  // En caso de que getDisplayMedia también pueda capturar audio del sistema
            ]);
        
            stream = combinedStream; // Actualiza la variable stream a la combinada
        
            // Opciones para el recorder
            const options = { mimeType: 'video/webm; codecs=vp9,opus' };
            recorder = new MediaRecorder(stream, options);
        
            const chunks = [];
            recorder.ondataavailable = e => chunks.push(e.data);
        
            recorder.onstop = async () => {
              const completeBlob = new Blob(chunks, { type: chunks[0].type });
              downloadRecording(completeBlob);
              // Mostrar un mensaje de "Subiendo grabación" o algo similar                          
              console.log('Subiendo grabación');

              mensajesSubiendoGrabacion();
              
              // Subir la grabación al servidor
              uploadRecording(completeBlob);
              
              mensajesSubidaCompleta();
              console.log('Subida completa');
            };
            
            // Iniciar la grabación
            recorder.start();

          } catch (error) {
            console.error("Error al iniciar la grabación: ", error);
          }
        }

        function mensajesSubiendoGrabacion() {
          alert('Subiendo grabación, por favor no cierres esta ventana hasta que se complete la subida.');
          window.onbeforeunload = function() {
            return "Tu grabación aún se está subiendo. ¿Estás seguro de que quieres cerrar esta página?";
          };
        }

        function mensajesSubidaCompleta() {
          alert('Grabación subida al servidor');
          window.onbeforeunload = null;
        }

        // async function startRecording() {
        //   stream = await navigator.mediaDevices.getDisplayMedia({
        //     "video": {
        //       "displaySurface": "browser",
        //       "width": { max: 854 },
        //       "height": { max: 480 },
        //       "frameRate": { max: 15 },
        //     },
        //     "audio": {
        //       // echoCancellation: true,
        //       // noiseSuppression: true,
        //       sampleRate: 8100,
        //       // suppressLocalAudioPlayback: true,
        //     },
        //     "preferCurrentTab": true,
        //     "cursor": 'always',
        //   });
          
        //   const options = { mimeType: 'video/webm; codecs=vp9,opus' };
        //   recorder = new MediaRecorder(stream, options);
          
        //   const chunks = [];
        //   recorder.ondataavailable = e => chunks.push(e.data);
          
        //   recorder.onstop = async () => {
        //     const completeBlob = new Blob(chunks, { type: chunks[0].type });
        //     downloadRecording(completeBlob);
        //     uploadRecording(completeBlob);
        //   };
          
        //   recorder.start();
        // }
  
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
  
        function uploadRecording(blob) {
          let formData = new FormData();
          formData.append('video', blob, "recording.webm");
          
          //get parameters from url (idClase)
          let url = new URL(window.location.href);
          let idClase = url.searchParams.get("idClase");
  
          fetch('/clases_profesores/upload', {
            method: 'POST',
            body: formData,
            // send idClase
            headers: {
              'idClase': idClase
            },
          })
          .then(
            response => response.json()
          )
          .then(data => console.log(data.message))
          .catch(error => console.error('Error:', error));
        }
})(jQuery, Drupal);