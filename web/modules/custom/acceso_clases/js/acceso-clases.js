(function ($, Drupal, drupalSettings) {
  'use strict';

  Drupal.behaviors.accesoClasesBehavior = {
    attach: function (context, settings) {
      
      // Establece el selector CSS que identifica tu vista. Puede necesitar ajustar el selector según tu marcado.
      var viewSelector = '.view-id-estrellas'; // Asegúrate de que este selector corresponda al wrapper de tu vista particular.
      var $view = $(viewSelector, context);


      $(context).find('.vista-estrellas-estudiantes').once('accesoClasesBehavior').each(function () {
        localStorage.setItem(itemGuardar, cantidad);
        var idclase = $('.estrellas-recibidas').attr('id-clase');
        var cantidad = $('.imgs-estrellas').attr('cantidad');
        var itemGuardar = 'cantidad_' + idclase;
        // Este código se ejecutará una sola vez por cada elemento iframe.
        console.log('Se ha adjuntado el comportamiento a la clase del profesor.');
          // Establece el intervalo para recargar la vista. 
        setInterval(function () {
          $('.vista-estrellas-estudiantes').trigger('RefreshView');      
          
          // Uso de localstorage para actualizar la vista
          var idclase = $('.estrellas-recibidas').attr('id-clase');
          var cantidad = $('.imgs-estrellas').attr('cantidad');
          var itemGuardar = 'cantidad_' + idclase;
          // Leer el valor del localStorage
          var cantidadLocalStorage = localStorage.getItem(itemGuardar);
          // Comprobar exitencia de localStorage
          if (cantidadLocalStorage) {
            console.log('El valor del localStorage es: ' + cantidadLocalStorage);
            // Si existe, verificar si el valor es igual a la cantidad actual
            if (cantidadLocalStorage != cantidad) {              
              console.log('El valor del localStorage es diferente a la cantidad actual.');
              $('.estrella-saliente').css('display', 'flex');
              // Escuchar un mp3 de estrella saliente por 2 segundos
              // var audio = new Audio('/themes/custom/koala/audio/audio.mp3');
              // audio.play();
              // pausar 2 segundos
              reproducirAudio();
              // Si es diferente, actualizar el valor del localStorage
              localStorage.setItem(itemGuardar, cantidad);
              // Actualizar la vista    
              console.log('Se ha actualizado la vista.'); 
              
            } else  {
              $('.estrella-saliente').css('display', 'none');
            }
          } else {
            localStorage.setItem(itemGuardar, cantidad);
          }
          $('.estrella-saliente').css('display', 'none');
        }, 10000); // 10000 milisegundos == 10 segundos
      });

      function reproducirAudio() {
        // Reproducir el audio
        var audio = new Audio('/themes/custom/koala/audio/audio.mp3');
        audio.play();
        // Ocultar el elemento .estrella-saliente después de 2 segundos
        setTimeout(function() {
          $('.estrella-saliente').css('display', 'none');
        }, 2000);
      }
      
    }
  };

})(jQuery, Drupal, drupalSettings);



 