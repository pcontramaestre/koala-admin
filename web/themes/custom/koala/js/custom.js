/**
 * @file
 * Global utilities.
 *
*/
/* jshint esversion: 6 */
(function ($, Drupal) {
  ("use strict");

  Drupal.behaviors.koala = {
    attach: function (context, settings) {},
  };

  jQuery(document).ready(function ($) {
    jQuery('input[name="field_profesor"]').on("click", function () {
      console.log("Se ha seleccionado un profesor");
      var selectedValue = $(this).val();

      var idbuscar = $(this).attr("id");
      console.log(idbuscar);
      var idusuario = jQuery(
        'label[for="field_profesor_' + idbuscar + '"] .idusuario'
      ).text();

      console.log(idusuario);

      var linkUrl =
        "/node/add/agendar_clase/agendando_clase?id=" +
        getLastParameterFromUrl() +
        "&field_profesor=" +
        idusuario;
      $("#boton-agendamos-clase").attr("href", linkUrl);
    });

    function getLastParameterFromUrl() {
      var url = window.location.href;
      var urlSegments = url.split("/");
      var lastSegment = urlSegments[urlSegments.length - 1];
      var noultimo = urlSegments[urlSegments.length - 2];
      console.log(noultimo);
      return lastSegment;
    }
  });

  jQuery(document).ready(function ($) {
    // console.log("ready inicio");
    $("input[id^='field_profesor']").on("change", function () {
      console.log("Se ha seleccionado un profesor");
      var selectedValue = $(this).val();
      var linkUrl =
        "/agendar_cita?id=" +
        getLastParameterFromUrl() +
        "&field_profesor=" +
        selectedValue;
      $("#boton-agendamos-clase").attr("href", linkUrl);
    });

  });
  // console.log("ready inicio");
  $("input[id^='field_profesor']").on("click", function () {
    console.log("Se ha seleccionado un profesor");
    var selectedValue = $(this).val();
    var linkUrl =
      "/agendar_cita?id=" +
      getLastParameterFromUrl() +
      "&field_profesor=" +
      selectedValue;
    $("#boton-agendamos-clase").attr("href", linkUrl);
  });

  function getLastParameterFromUrl() {
    var url = window.location.href;
    var urlSegments = url.split("/");
    var lastSegment = urlSegments[urlSegments.length - 1];
    return lastSegment;
  }

  jQuery("#edit-field-fecha-nac-0-value").datepicker({
    dateFormat: "dd-mm-yy", // 22-05-2019
    changeMonth: true,
    changeYear: true,
    // yearRange: "2001:2019",
    altFormat: "dd/mm/yy",
    maxDate: "-6y",
    //minDate: new Date(2001, 1 - 1, 1),
    minDate: "-14y",
  });

  jQuery("#edit-field-fecha-de-la-cita-0-value").datepicker({
    dateFormat: "dd-mm-yy", // 22-05-2019
    changeMonth: true,
    changeYear: true,
    yearRange: "2023:2024",
    altFormat: "dd/mm/yy",
    maxDate: "+1m",
    minDate: "+1d",
  });

  jQuery(
    ".view-mis-koalas.view-display-id-block_3 .view-filters .form-item-field-fechas-laborables-value-min input"
  ).datepicker({
    dateFormat: "mm/dd/yy", // 06-30-2019
    changeMonth: true,
    changeYear: true,
    yearRange: "2023:2024",
    altFormat: "dd/mm/yy",
    maxDate: "+1m",
    minDate: "+1d",
  });

  //form-item-field-fechas-laborables-value-max
  jQuery(
    ".view-mis-koalas.view-display-id-block_3 .view-filters .form-item-field-fechas-laborables-value-max input"
  ).datepicker({
    dateFormat: "mm/dd/yy", // 06-30-2019
    changeMonth: true,
    changeYear: true,
    yearRange: "2023:2024",
    altFormat: "dd/mm/yy",
    maxDate: "+1m",
    minDate: "+1d",
  });

  jQuery("#edit-field-hora-clase-0-value").attr(
    "placeholder",
    "Hora de la clase"
  );

  jQuery(document).ready(function ($) {
    $('#cancelarclase').on('click', function (e) {
      e.preventDefault();
      var href = $(this).attr('data-url');    
      // Popup de confirmación.
      if(confirm("¿Deseas cancelar esta clase? Si la eliminas, tendrás que volver a agendarla.")) {
        // Si es confirmado, redirigir a la ruta.
        window.location.href = href;
      }
    });
    //COUNTDOWN
    let pageNodePADRES = document.body.classList.contains("path-padres");
    if (pageNodePADRES === true) {
      // Detectar clase del div que contiene el countdown. view-id-clases_gratuitas view-display-id-block_1
      let countdown = document.querySelector(
        ".view-id-clases_gratuitas.view-display-id-block_1"
      );
      // Varificar si countdown existe y tiene un valor diferente de null
      if (countdown != null) {
        //Fecha y Hora detectada en el campo de la vista .views-field-field-fecha-de-la-cita time
        let fechaHora = jQuery(
          ".views-field-field-fecha-de-la-cita time"
        ).html();
        fechaHora = fechaHora.trim();
        // Unix timestamp (in seconds) to count down to
        var twoDaysFromNow = new Date(fechaHora).getTime() / 1000;
        console.log(twoDaysFromNow);
        // // Set up FlipDown
        // var flipdown = new FlipDown(twoDaysFromNow)

        //   // Start the countdown
        //   .start()

        //   // Do something when the countdown ends
        //   .ifEnded(() => {
        //     console.log("The countdown has ended!");
        //   });
      }
    }

    // detectar el tamaño de la pantalla y guardarlo en variable para usarla en el codigo
    let screenWidth = window.screen.width;

    // detectar las clases .path-node en el body
    let pageNode = document.body.classList.contains("path-node");
    let pageFront = document.body.classList.contains("path-frontpage");
    // console.log(pageNode);
    // console.log(pageFront);
    // si existe la clase .page-node-27 o .page-node-26 en el body
    if (pageNode === true || pageFront === true) {
      // console.log("mobile");
      // si el tamaño de la pantalla es menor a 1200px
      if (screenWidth <= 1200) {
        // agregar la clase .mobile a la etiqueta body
        document.body.classList.add("mobile");
      }
      if (screenWidth <= 580) {
        document.body.classList.add("mobile-580");
      }
    }

    let pageMobile = document.body.classList.contains("mobile");
    let pageMobile580 = document.body.classList.contains("mobile-580");

    window.addEventListener("resize", function () {
      // tu código aquí
      let screenWidth = window.screen.width;
      // console.log("La pantalla ha cambiado de tamaño");
      // console.log(screenWidth);
    });

    if (screenWidth <= 1200) {
    }

    if (screenWidth <= 992) {
    }
  });
})(jQuery, Drupal);

(function ($) {
  function parseHora(hora) {
    var partes = hora.split(':');
    var fecha = new Date();
    fecha.setHours(parseInt(partes[0]), parseInt(partes[1]), parseInt(partes[2]), 0);
    return fecha;
  }

  //comprobar que existe el campo de hora-inicio input[id^="hora-inicio"]
  if ($('input[id^="hora-inicio"]').length) { 
    var horaInicio = $('input[id^="hora-inicio"]').val();
    var horaFinal = $('input[id^="hora-final"]').val();
    localStorage.setItem('horaInicio', horaInicio);
    localStorage.setItem('horaFinal', horaFinal);
  }

  // Cuando se cambie o agregue un valor en el campo input[id^="hora-inicio"] o input[id^="hora-final"], guardar el valor en una variable de localStorage
  $('input[id^="hora-inicio"], input[id^="hora-final"]').on('change', function () {
    var horaInicio = $('input[id^="hora-inicio"]').val();
    var horaFinal = $('input[id^="hora-final"]').val();
    localStorage.setItem('horaInicio', horaInicio);
    localStorage.setItem('horaFinal', horaFinal);
  });  


  // Se ejecuta cuando hay un evento ajax de una vista. Para que no se pierda el datepicker
  $(document).ajaxComplete(function (event, xhr, settings) {
    $('#cancelarclase').on('click', function (e) {
      e.preventDefault();
      var href = $(this).attr('data-url');    
      // Popup de confirmación.
      if(confirm("¿Deseas cancelar esta clase? Si la eliminas, tendrás que volver a agendarla.")) {
        // Si es confirmado, redirigir a la ruta.
        window.location.href = href;
      }
    });
    // Cuando se cambie o agregue un valor en el campo input[id^="hora-inicio"] o input[id^="hora-final"], guardar el valor en una variable de localStorage
    $('input[id^="hora-inicio"], input[id^="hora-final"]').on('change', function () {
      var horaInicio = $('input[id^="hora-inicio"]').val();
      var horaFinal = $('input[id^="hora-final"]').val();
      localStorage.setItem('horaInicio', horaInicio);
      localStorage.setItem('horaFinal', horaFinal);
    });    
    // Esta función se ejecutará cada vez que se complete una solicitud AJAX.
    // Puedes colocar aquí el código que deseas que se ejecute después de cada
    // actualización de la página o filtrado de vistas.
    // Por ejemplo, aquí puedes volver a inicializar un date picker u otros elementos.
    // Inicializar el Datepicker en el campo de entrada
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
        $('input[id^="edit-field-fechas-laborables-value-min"]').val(dateText);
        $('input[id^="edit-field-fechas-laborables-value-max"]').val(
          nuevaFecha
        );
      },     
    });
    $(
      ".filtro-agendar .ui-datepicker-calendar .ui-datepicker-current-day a"
    ).removeClass("ui-state-active");
    var fechaseleccionada = $(
      'input[id^="edit-field-fechas-laborables-value-min"]'
    ).val();
    var fechaJS = new Date(fechaseleccionada);
    var nuevoDia = fechaJS.getDate();
    // console.log("Dia seleccionado " + nuevoDia);
    $("a[data-date='" + nuevoDia + "']").addClass("ui-state-active");

    $('.filtro-agendar a.ui-state-active').click();
    $('#boton-agendamos-clase').css('display','none');

        //localstorage hora_inicio_buscar y hora_fin_buscar
        if (localStorage.getItem('hora_inicio_buscar') != null) {
          $('#hora-inicio-select').val(localStorage.getItem('hora_inicio_buscar'));
          $('#hora-inicio').val(localStorage.getItem('hora_inicio_buscar'));
        }
        if (localStorage.getItem('hora_fin_buscar') != null) {
          $('#hora-final-select').val(localStorage.getItem('hora_fin_buscar'));
          $('#hora-final').val(localStorage.getItem('hora_fin_buscar'));
        }
    
        
        if ($('.filtro-agendar').length > 0) {
          //Si el select #hora-inicio-select cambiar de valor, asignarlo al input #hora-inicio
          $('#hora-inicio-select').change(function(){
            $('#hora-inicio').val($(this).val());
            localStorage.setItem('hora_inicio_buscar', $(this).val());
            localStorage.setItem('horaInicio', $(this).val());
          });
          //Si el select #hora-fin-select cambiar de valor, asignarlo al input #hora-final
          $('#hora-final-select').change(function(){
            $('#hora-final').val($(this).val());
            localStorage.setItem('hora_fin_buscar', $(this).val());  
            localStorage.setItem('horaFinal', $(this).val());      
          });
        }
    if (window.innerWidth < 1024) {
      if ($('input[id^="field_profesor_"]').length) {
        var targetId = $('input[id^="field_profesor_"]').first().attr('id');
        posicion = $('#' + targetId).offset().top - 150;
        console.log(posicion);
        $('html, body').animate({
          scrollTop: posicion
        }, 1000);
      }
    }

    // Convertir texto de hora a un objeto Date
    function parseHora(hora) {
      var partes = hora.split(':');
      var fecha = new Date();
      fecha.setHours(parseInt(partes[0]), parseInt(partes[1]), parseInt(partes[2]), 0);
      return fecha;
    }

    // Función para decidir si una hora está en el rango especificado
    function horaEnRango(hora, inicio, fin) {
        return hora >= inicio && hora <= fin;
    }

    // Leer los valores del localStorage y convertirlos a objetos Date
    var horaInicio = localStorage.getItem('horaInicio');
    var horaFinal = localStorage.getItem('horaFinal');

    $('input[id^="hora-inicio"]').val(horaInicio);
    $('input[id^="hora-final"]').val(horaFinal);
    $('#hora-inicio').val(localStorage.getItem('hora_inicio_buscar'));
    $('#hora-final').val(localStorage.getItem('hora_fin_buscar'));

    // Comprobar si alguna de las horas está dentro del rango
    function algunaHoraEnRango(horaInicio, horaFin, filtroInicio, filtroFin) {
       console.log(horaInicio);

       if (horaInicio < filtroFin && filtroInicio < horaFin) {
        console.log('horaInicio < filtroFin && filtroInicio < horaFin');
        return true;
       }

        if (horaFin > filtroInicio && horaFin < filtroFin) {
          console.log('horaFin > filtroInicio && horaFin < filtroFin');
        }

      return (horaInicio >= filtroInicio && horaInicio < filtroFin) || (horaFin > filtroInicio && horaFin < filtroFin);
      //return (horaInicio >= filtroInicio && horaInicio <= filtroFin) && (horaFin >= filtroInicio);

    }

    // Leer el valor de todos los .views-field-field-fechas-laborables-value > span y convertir a hora local
    $('.views-field-field-fechas-laborables-value > span, .views-field-field-fechas-laborables-end-value > span').each(function() {
      var utcTime = $(this).text().trim(); // Obtener la hora en formato UTC
      var horaLocal = getLocalTime(utcTime);
      var hora = horaLocal.split(' ')[1];
      $(this).text(hora);
    });

    var filtroHoraInicio = parseHora(horaInicio+':00');
    var filtroHoraFin = parseHora(horaFinal+':00');
    // Recorrer cada fila de la vista
    $('.view-content-detail > .views-row').each(function() {
      var horaInicioTxt = $(this).find('.views-field-field-fechas-laborables-value .field-content').text().trim();
      var horaFinTxt = $(this).find('.views-field-field-fechas-laborables-end-value .field-content').text().trim();
      var horaInicio = parseHora(horaInicioTxt); // Obtener hora de inicio en formato objeto Date
      var horaFin = parseHora(horaFinTxt); // Obtener hora de fin en formato objeto Date
      // Verificar si alguna de las horas está dentro del rango especificado
      if (algunaHoraEnRango(horaInicio, horaFin, filtroHoraInicio, filtroHoraFin)) {
          // Si se cumple la condición, podrías simplemente dejarlas visibles o aplicar alguna acción
          $(this).show(); 
      } else {
          // Si no, puedes decidir ocultarlas o hacer otra acción
          $(this).hide();
      }
  });


    /*

    */


    function getLocalTime(utcTime) {
      var zonaHoraria = Intl.DateTimeFormat().resolvedOptions().timeZone;
      var fechaHora = new Date('2022-10-15T'+utcTime + 'Z'); // Convertir a hora local
      var localTime = fechaHora.toLocaleString([], {timeZone: zonaHoraria}); // Convertir a hora local
      return localTime;
    }


    $('.field--type-smartdate details').attr('open', true);
    $('.field--type-smartdate details summary').attr('aria-expanded', 'true');
    $('.field--type-smartdate details summary').attr('aria-pressed', 'true');
    //console.log('Se ha recargado el ajax de la vista');  
    // $('.field--type-smartdate select.recur-repeat option[value="DAILY"]').attr('selected', 'selected');
    // $('.field--type-smartdate select.recur-repeat option[value="DAILY"]').prop('selected', true);v
    $('select option[value="COUNT"]').remove();

    // al seleccionar select.recur-repeat la opción DAILY, buscar select option[value="UNTIL"] seleccionarlo y mostrarlo
    $('.field--type-smartdate select.recur-repeat').on('change', function () {
      var selectedValue = $(this).val();
      console.log(selectedValue);
      if (selectedValue == 'DAILY') {
        $('.field--type-smartdate select.recur-end option[value="UNTIL"]').attr('selected', 'selected');
        $('.field--type-smartdate select.recur-end option[value="UNTIL"]').prop('selected', true);
        $('.field--type-smartdate select.recur-end').show();
      } else {
        $('.field--type-smartdate select.recur-end option[value="UNTIL"]').removeAttr('selected');
        $('.field--type-smartdate select.recur-end option[value="UNTIL"]').prop('selected', false);
        $('.field--type-smartdate select.recur-end').hide();
      }
    });


  });
})(jQuery);