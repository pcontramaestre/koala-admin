jQuery(document).ready(function($) {
  $("#datepicker-seleccionar-fecha").datepicker({
    inline: true, // Mostrar el Datepicker en línea
    dateFormat: "mm/dd/yy", // Formato de la fecha
    changeMonth: true, //Cambiar mes
    defaultDate: "+1D",
    minDate: "+1D",
    maxDate: "+1M +10D",
    onSelect: function (dateText) {
      var fechaInput = dateText;
      var fechaJS = new Date(fechaInput);
      // Sumamos un día a la fecha.
      fechaJS.setDate(fechaJS.getDate() + 1);
      // Obtenemos los componentes de la nueva fecha (mes, día, año).
      var nuevoMes = fechaJS.getMonth() + 1;
      var nuevoDia = fechaJS.getDate();
      var nuevoAnio = fechaJS.getFullYear();
      // Formateamos la nueva fecha al formato "mm/dd/yyyy".
      var nuevaFecha = nuevoMes + "/" + nuevoDia + "/" + nuevoAnio;
      
      // Actualizar el valor del campo de entrada cuando se selecciona una fecha
      $("#datepicker-input").val(dateText);
      $("#edit-field-fechas-laborables-value-min").val(dateText);
      $("#edit-field-fechas-laborables-value-max").val(nuevaFecha);
      
      console.log($('input[id^="hora-inicio"]').val());
      console.log($('input[id^="hora-final"]').val());
      console.log("Seleccionado");
    },
  });


$(document).on('click', 'input[name="field_profesor"]', function() {
  var selectedValue = $(this).val();
  
    var idbuscar = $(this).attr("id");
    var idusuario2 = jQuery('label[for="' + idbuscar + '"] > div.idusuario').html();
    var fecha_usar = $("input[id^='edit-field-fechas-laborables-value-min']").val();
    var partesFecha = fecha_usar.split('/'); // Divide la cadena en partes usando el separador '/'
    var fecha_formateada = partesFecha[2] + '-' + partesFecha[0].padStart(2, '0') + '-' + partesFecha[1].padStart(2, '0');
    
    var idiomaIngles = $('#page-wrapper').hasClass('current_language-en');
    
    if (idiomaIngles) {
      var linkUrl = '/en/node/add/agendar_clase/agendando_clase?id=' + getLastParameterFromUrl() + '&field_profesor=' + idusuario2  + '&fecha='+fecha_formateada;
    } else {
      var linkUrl = '/node/add/agendar_clase/agendando_clase?id=' + getLastParameterFromUrl() + '&field_profesor=' + idusuario2  + '&fecha='+fecha_formateada;	
    }
    
  $('#boton-agendamos-clase').attr('href', linkUrl);
  window.location.href = linkUrl;		
});

function getLastParameterFromUrl() {
  var url = window.location.href;
  var urlSegments = url.split('/');
  var lastSegment = urlSegments[urlSegments.length - 1];
  var noultimo = urlSegments[urlSegments.length - 2];
  lastSegment = lastSegment +'&idcontenido='+noultimo;
  return lastSegment;
}

// Verificar si los radios ya están presentes al cargar la página
if ($('input[name="field_profesor"]').length > 0) {
  // Activar el evento si los radios están presentes inicialmente
  $('input[name="field_profesor"]').on('click', function() {
    var selectedValue = $(this).val();
    var fecha_usar = $("input[id^='edit-field-fechas-laborables-value-min']").val();
    var partesFecha = fecha_usar.split('/'); // Divide la cadena en partes usando el separador '/'
    var fecha_formateada = partesFecha[2] + '-' + partesFecha[0].padStart(2, '0') + '-' + partesFecha[1].padStart(2, '0');      
    var linkUrl = '/agendar_cita?id=' + getLastParameterFromUrl() + '&field_profesor=' + selectedValue + '&fecha='+fecha_formateada;
  });
}



// Ruta de la pagina
// Obtener la ruta relativa
var rutaRelativa = window.location.pathname;

// Obtener los parámetros de la URL en un objeto
var parametros = {};
window.location.search.substr(1).split("&").forEach(function(item) {
  var partes = item.split("=");
  parametros[partes[0]] = decodeURIComponent(partes[1]);
});

// Acceder a los valores de los parámetros individuales
var id = parametros.id;
var idcontenido = parametros.idcontenido;
var field_profesor = parametros.field_profesor;
var fecha = parametros.fecha;

// Imprimir los resultados en la consola
console.log('Ruta Relativa: ', rutaRelativa);
console.log('ID: ', id);
console.log('ID Contenido: ', idcontenido);
console.log('Field Profesor: ', field_profesor);
console.log('Fecha: ', fecha);

// Verificar si el input existe
if ($('input[name="field_fecha_cita_oculta[0][value][date]"]').length && fecha !== undefined) {
  // Obtén la fecha en formato "2023-08-23"
  var fechaOriginal = fecha;

  // Divide la fecha en año, mes y día
  var partesFecha = fechaOriginal.split('-');
  var year = partesFecha[0];
  var month = partesFecha[1];
  var day = partesFecha[2];

  // Formatea la fecha en el formato deseado "23/08/2023"
  var fechaFormateada = year + '-' + month + '-' + day;

  // Establece la fecha formateada como valor del input
  $('input[name="field_fecha_cita_oculta[0][value][date]"]').val(fechaFormateada);
  
  var horaInicio = $('.views-field-field-fechas-laborables-value .field-content').text();
  var duracionMinutos = parseInt($('.views-field-field-fechas-laborables-duration .field-content').text());
  var horaFinal = $('.views-field-field-fechas-laborables-end-value .field-content').text();
  var horaInicioDate = new Date('2023-01-01 ' + horaInicio);
  var horaFinalDate = new Date('2023-01-01 ' + horaFinal);

  var horainiciono = $('.views-field-field-fechas-laborables-value-1 .field-content').text().trim();
  var horafinalno = $('.views-field-field-fechas-laborables-end-value-1 .field-content').text().trim();

  var horainicionoDate = new Date(horainiciono);
  var horafinalnoDate = new Date(horafinalno);
  // Obtener el dia de horainiciono y horafinalno
  var diaInicio = horainicionoDate.getDate();
  var diaFinal = horafinalnoDate.getDate();

  // Si horafinalno es un dia siguiente a horainiciono, asignarle el mismo dia que horainiciono y la hora en 23:30
  if (diaFinal > diaInicio) {
    horafinalnoDate.setDate(diaInicio);
    horafinalnoDate.setHours(23);
    horafinalnoDate.setMinutes(30);
  }

  
  var intervaloMinutos = 30;
  var horariosDiv = $('#select-horario .horario');
  
  for (var tiempo = horainicionoDate; tiempo < horafinalnoDate; tiempo.setMinutes(tiempo.getMinutes() + intervaloMinutos)) {
    var hora = tiempo.getHours();
    var minutos = tiempo.getMinutes();
    var horaFormateada = ('0' + hora).slice(-2) + ':' + ('0' + minutos).slice(-2);
  
    var enlace = $('<a>', {
      href: '#',
      text: horaFormateada,
      class: 'mr-3 hora-enlace',
      click: function() {
        // Capturar el valor del enlace seleccionado
        var horaSeleccionada = $(this).text() + ':00';
        console.log(horaSeleccionada);
        // Asignar el valor al campo de hora
        $('input[name="field_fecha_cita_oculta[0][value][time]"]').val(horaSeleccionada);
        
        // Remover la clase "active" de todos los enlaces
        $('a', horariosDiv).removeClass('active');
        
        // Agregar la clase "active" al enlace seleccionado
        $(this).addClass('active');
      }
    });
  
    horariosDiv.append(enlace);
  }
  
  //MARCAR HORAS DESABILITADAS
  
  
  //Crear un arreglo con las clases agendadas 
      var clasesAgendadas = [];
      $('.profesor-agendado-tr').each(function() {

        var fechaHora = $(this).find('.views-field-field-fecha-cita-oculta time').text().trim();
        var horaUsada = new Date(fechaHora);
        var hours = horaUsada.getHours().toString().padStart(2, '0');
        var minutes = horaUsada.getMinutes().toString().padStart(2, '0');
        var horaAgendada = hours + ':' + minutes;

        $(this).find('.hora-cita-agendada').html(horaAgendada);

        //var $horaAgendada = $(this).find('.hora-cita-agendada');
        //var horaAgendada = $horaAgendada.text().trim();
        //console.log("Hora Agendada: "+horaAgendada);
        //horaAgendada = horaAgendada.split(':');
        //horaAgendada = horaAgendada[0]+":"+horaAgendada[1];

        var $idProfesor = $(this).find('.views-field-field-asignar-profesor-1');
        var idProfesor = $idProfesor.text().trim();
        console.log("ID Profesor: "+idProfesor);
        var fechaAgendada = $(this).find('.views-field-field-fecha-cita-oculta-1').text().trim();
        //console.log("Fecha Agendada: "+fechaAgendada);

          console.log("Fecha encontrada: "+fechaAgendada);          
          $('.hora-enlace').each(function() {
            var DataHora = $(this).text().trim();
            //console.log("Hora agendada - DataHora: "+DataHora);
            if (DataHora === horaAgendada) {
              $(this).addClass('disabled');
              //console.log("Consegui una para disabled: "+horaAgendada+" Profesor: "+idProfesor);
            }
          });
        //clasesAgendadas.push(horaAgendada);
      });
  
}


});

jQuery(document).ready(function($) {
//Comprobar que el body tenga las clases .path-product y .rol-padre 
if ($('body').hasClass('path-product') && $('body').hasClass('rol-padre')) {
  // Verificar que exista el botón de agregar al carrito, en caso contrario se repite la acción
  var intervalo = setInterval(function() {
    if ($('#commerce-product-add-to-cart-form .form-actions .button--add-to-cart').length && $('.field--widget-commerce-product-variation-attributes select').length) {
      //
      // get parameter clases from url 
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const clases = urlParams.get('clases');
      const id_variacion = urlParams.get('v');

      // si existe el parametro id_variacion hacer click en el boton
      if (id_variacion !== null) {
        $('#commerce-product-add-to-cart-form .form-actions .button--add-to-cart').click();
      } 

      // buscar el select field--widget-commerce-product-variation-attributes select
      
      $('.field--widget-commerce-product-variation-attributes select option').each(function() {
        var text = $(this).text();
        var splitText = text.split('/');
        var desiredText = splitText[1].trim(); // Obtenemos lo que está después de "/"
        //resultado de desiredText es: 36 clases en total para 4 semanas                    
        var texto_a_buscar = clases+' clases';
        //buscar en el texto del option si existe el texto_a_buscar
        if (desiredText.includes(texto_a_buscar)) {
          $(this).prop('selected', true);
          //get value of selected option
          var value_select = $(this).val();
          // Disparar el evento change
          $('.field--widget-commerce-product-variation-attributes select').val(value_select);
          $('.field--widget-commerce-product-variation-attributes select').change();
          var url = window.location.href;
          var newUrl = url + '&v=' + value_select;
          window.location.replace(newUrl);  				
        }
      }); 

    } else {
      clearInterval(intervalo);
    }
  }, 1000);  
}
});