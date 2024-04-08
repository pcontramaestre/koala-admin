(function ($, Drupal) {
  Drupal.behaviors.changePasswordModal = {
    attach: function (context, settings) {
      var uid = settings.first_login_teacher.uid;
      var namae = settings.first_login_teacher.namae;
      
      var modalHtml = '<div id="change-password-modal" title="Bienvenida">' +
                      '<img src="/themes/custom/koala/images/logo-koala.png" alt="Logo">' +
                      '<p class="bienvenida">Bienvenid(o)a ' + namae + '</p>' +
                      '<p>Para continuar en tu zona privada debes actualizar tu contraseña.</p>' +
                      '<a href="/user/' + uid + '/edit/editar_profesor" class="button">Cambiar contraseña</a>' +
                      '</div>';

      $('body').once('change-password-modal').append(modalHtml);
      $('#change-password-modal').dialog({
        autoOpen: true,
        modal: true,
        closeOnEscape: false,
        width: 600,
        draggable: false,
        resizable: false,
        open: function(event, ui) {
          $(".ui-dialog-titlebar-close", ui.dialog | ui).hide();
        }
      });

      // Unset session variable to prevent popup on subsequent page loads.
      delete Drupal.settings.first_login_teacher;
    }
  };
})(jQuery, Drupal);