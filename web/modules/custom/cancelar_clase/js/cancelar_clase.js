(function ($, Drupal) {
  
  jQuery(document).ready(function ($) {
    console.log('cancelar_clase.js');
    $('#cancelarclase').click(function (e) {
      e.preventDefault();
      var href = $(this).attr('data-url');    
      // Popup de confirmación.
      if(confirm("¿Deseas cancelar esta clase? Si la eliminas, tendrás que volver a agendarla.")) {
        // Si es confirmado, redirigir a la ruta.
        window.location.href = href;
      }
    });
  
    $('#cancelarclase').on('click', function (e) {
      e.preventDefault();
      var href = $(this).attr('data-url');    
      // Popup de confirmación.
      if(confirm("¿Deseas cancelar esta clase? Si la eliminas, tendrás que volver a agendarla.")) {
        // Si es confirmado, redirigir a la ruta.
        window.location.href = href;
      }
    });
  });





  // $('a.cancelar-clase').on('click', function (e) {
  //   e.preventDefault();
  //   var href = $(this).attr('href');
  //   // Popup de confirmación.
  //   if(confirm("¿Deseas cancelar esta clase? Si la eliminas, tendrás que volver a agendarla.")) {
  //     // Si es confirmado, redirigir a la ruta.
  //     window.location.href = href;
  //   }
  // });
  Drupal.behaviors.cancelarClaseModal = {
    attach: function (context, settings) {

      // console.log('cancelarClaseModal'  + context);
      // // Detecta el evento de click en el enlace con el id cancelarclase,
      // //y obtener el atributo data-url del enlace.
      // // despues confirmar e ir a la url.

      // $('#cancelarclase', context).once('cancelarClaseModal').on('click', function (e) {
      //   console.log('cancelarClaseModal');
      //   e.preventDefault();
      //   var href = $(this).attr('data-url');
      //   // Popup de confirmación.
      //   if(confirm("¿Deseas cancelar esta clase? Si la eliminas, tendrás que volver a agendarla.")) {
      //     // Si es confirmado, redirigir a la ruta.
      //     window.location.href = href;
      //   }
      // });
      // $('a.cancelar-clase', context).once('cancelarClaseModal').on('click', function (e) {
      //   e.preventDefault();
      //   var href = $(this).attr('href');
        
      //   // Configura el enlace del botón "Sí" del modal para que proceda con la acción.
      //   $('#confirmDeleteModal .confirm-delete', context).attr('href', href);
        
      //   // Muestra el modal de Bootstrap.
      //   $('#confirmDeleteModal').modal('show');
      // });
    }
  };
})(jQuery, Drupal);