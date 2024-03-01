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
          
          $(document).ajaxComplete(function (event, xhr, settings) {

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
                //$('.estrella-saliente').css('display', 'flex');
                
                // Escuchar un mp3 de estrella saliente por 2 segundos
                // var audio = new Audio('/themes/custom/koala/audio/audio.mp3');
                // audio.play();
                // pausar 2 segundos
                //reproducirAudio();
                $('.estrella-contenedor').addClass('mostrar').removeClass('nomostrar');
                // Si es diferente, actualizar el valor del localStorage
                localStorage.setItem(itemGuardar, cantidad);
                // Actualizar la vista    
                console.log('Se ha actualizado la vista.'); 
                setTimeout(function() {
                  //$('.estrella-saliente').css('display', 'none');
                  $('.estrella-contenedor').addClass('nomostrar').removeClass('mostrar');
                }, 2000);
                
              } else  {
                //$('.estrella-saliente').css('display', 'none');
                //$('.estrella-contenedor').addClass('nomostrar').removeClass('mostrar');
              }
            } else {
              localStorage.setItem(itemGuardar, cantidad);
            }
          });

          consultarClaseActiva(idclase);
          
        }, 10000); // 10000 milisegundos == 10 segundos
      });

      function reproducirAudio() {
        // Reproducir el audio
        //var audio = new Audio('/themes/custom/koala/audio/audio.mp3');
        //audio.play();
        // Ocultar el elemento .estrella-saliente después de 2 segundos
        $('.estrella-contenedor').addClass('mostrar').removeClass('nomostrar');
        setTimeout(function() {
          $('.estrella-saliente').css('display', 'none');
         // $('.estrella-contenedor').addClass('nomostrar').removeClass('mostrar');
        }, 3000);
      }

      /* 
        Funcion para consular /clases-profesor/consultar-activa por ajax.        
      */
      function consultarClaseActiva(idClase) {
        $.ajax({
          url: Drupal.url('clases-profesor/consultar-activa'),
          type: 'POST',
          dataType: 'json',
          data: {
            idClase: idClase,
          },
          success: function (response) {
            //$('#selector-para-mensajes').html(response[0].data);
            console.log(response);
            console.log(response[0].data);
            var respuesta = response[0].data;
            if (respuesta == '0') {
              console.log('Clase no iniciada');
              $('.cuadro-clases-noiniciada-finalizada').addClass('d-flex').removeClass('d-none');
              $('.cuadro-clases-noiniciada-finalizada .titulo h1').text('Clase no iniciada');
              $('.cuadro-clases-noiniciada-finalizada .texto strong').text('La clase aún no ha iniciado, por favor espera a que el profesor inicie la clase.');
            } else if (respuesta == '1') {
              console.log('Clase iniciada');
              $('.cuadro-clases-noiniciada-finalizada').addClass('d-none').removeClass('d-flex');
            } else if (respuesta == '2') {
              console.log('Clase finalizada');
              $('.cuadro-clases-noiniciada-finalizada').addClass('d-flex').removeClass('d-none');
              $('.cuadro-clases-noiniciada-finalizada .titulo h1').text('Clase finalizada');
              $('.cuadro-clases-noiniciada-finalizada .texto strong').text('La clase ha finalizado, gracias por tu participación.');
            } else {
              console.log('No se ha recibido respuesta');
            }            
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
            console.log(textStatus);                
          }        
        });
      }
      
    }
  };

})(jQuery, Drupal, drupalSettings);