(function ($, Drupal) {
  Drupal.behaviors.facturacionProfes = {
    attach: function (context, settings) {
      $(document).ajaxComplete(function(event, xhr, settings) {
        
        //Comprobar si el body tiene la clase .path-facturacion 
        if ($('body').hasClass('path-facturacion')) {
          // Oculta el campo de valor de título
          //$('input[name="title[0][value]"]').hide();
          var fechaSeleccionada = $('.views-exposed-form .form-select option:selected').text();
          // Asigna el valor seleccionado al campo de valor de título
          $('input[name="title[0][value]"]').val(fechaSeleccionada);
          

          //Recorrer todos los divs con la clase .views-row
          $('.view-facturacion-profesor .views-row').each(function() {

          });
          
          // contar todos los divs con la clase .views-row
          var numeroDeFilas = $('.view-facturacion-profesor .views-row').length;

          // Ir a la última fila
          $('.view-facturacion-profesor .views-row').last().addClass('ultima-fila');

          // Leer el contenido de la última fila .views-field-field-cumulative-field .field-content y guardarlo en una variable
          var totalInasistencias = $('.ultima-fila .views-field-field-cumulative-field .field-content').text();
          var totalClases = $('.ultima-fila .views-field-field-cumulative-field-1 .field-content').text();

          // Eliminar espacios en blanco y saltos de línea
          totalInasistencias = totalInasistencias.replace(/\s/g, '');
          totalClases = totalClases.replace(/\s/g, '');


          $('input[name="field_clases_impartidas[0][value]"]').val(totalClases);
          $('input[name="field_inasistencias_del_estudian[0][value]"]').val(totalInasistencias);

          $('.cuadro.impartidas .valor').text(totalClases);
          $('.cuadro.inasistencias .valor').text(totalInasistencias);

          //Convertir los valores a enteros
          totalInasistencias = parseInt(totalInasistencias);
          totalClases = parseInt(totalClases);

          // Calcular el total de horas. 
          var totalHoras = totalClases / 2;
          // Redondear el valor de totalHoras a dos decimales
          totalHoras = totalHoras.toFixed(2);

          
          var totalInasistenciasHoras = totalInasistencias / 4;
          totalInasistenciasHoras = totalInasistenciasHoras.toFixed(2);          

          // Mostrar el total de horas en el cuadro de horas
          $('#total-horas-impartidas').val(totalHoras);
          $('#total-horas-inasistencias').val(totalInasistenciasHoras);

          // Sumar los totales de horas y mostrarlos en el cuadro de horas name="field_total_horas_a_pagar[0][value]"

          // Convertir los valores a numeros.
          totalHoras = parseFloat(totalHoras);
          totalInasistenciasHoras = parseFloat(totalInasistenciasHoras);

          var totalHorasAPagar = totalHoras + totalInasistenciasHoras;
          totalHorasAPagar = totalHorasAPagar.toFixed(2);
          console.log(totalHorasAPagar);
          // $('input[id^="edit-field-total-horas-a-pagar-0-value"]').val(totalHorasAPagar);
          $('input[id^="edit-field-horas-a-pagar-0-value"]').val(totalHorasAPagar);


          // En 0 inasistencias del profesor, temporalemte se asigna el valor de 0
          $('input[id^="edit-field-inasistencias-del-profesor-0-value"]').val(0);

          // Seleccionar el profesor actual
          var userid = $('.user-id.d-none').text();
          userid = userid.replace(/\s/g, '');
          // Select to select name="field_asignar_profesor" the value of userid. 
          $('select[name="field_asignar_profesor"]').val(userid).change();

          // Obtener el texto del select id="edit-field-fecha-cita-oculta-value" y guardarlo en una variable fecha_seleccionada.
          // A fecha_seleccionada separar por el " " y guardar el primer valor en una variable fecha_seleccionada.
          
          var fechaSeleccionadaDate = $('.views-exposed-form .form-select option:selected').text();
          if (fechaSeleccionadaDate) {
            fechaSeleccionadaDate = fechaSeleccionadaDate.split(" ");
            fechaSeleccionadaDate = fechaSeleccionadaDate[0];

            /* 
              Buscar el valor de fechaSeleccionadaDate en el texto del select name="field_mes_de_la_clase"
              Si lo encuentra, seleccionar el valor del select name="field_mes_de_la_clase" y asignarle el valor de fechaSeleccionadaDate
            */
            $('select[name="field_mes_de_la_clase"]').find('option').each(function() {
              if ($(this).text() === fechaSeleccionadaDate) {
                $('select[name="field_mes_de_la_clase"]').val($(this).val()).change();
              }
            });
     

          }
        }

        // if (settings.extraData && settings.extraData.view_name === 'nombre_de_la_vista' && settings.extraData.view_display_id === 'nombre_del_display') {
          // Obtén el valor seleccionado del filtro de fecha de la vista, debe se el texto y no el value
        //}
      });
    }
  };
})(jQuery, Drupal);