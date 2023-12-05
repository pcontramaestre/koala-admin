/**
 * @file
 * Global utilities.
 *
 */
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
    minDate: "-18y",
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
  // Se ejecuta cuando hay un evento ajax de una vista. Para que no se pierda el datepicker
  $(document).ajaxComplete(function (event, xhr, settings) {
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
        console.log("Seleccionado");
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
    console.log("Dia seleccionado " + nuevoDia);
    $("a[data-date='" + nuevoDia + "']").addClass("ui-state-active");

    $('.filtro-agendar a.ui-state-active').click();
    $('#boton-agendamos-clase').css('display','none');
  });
})(jQuery);
