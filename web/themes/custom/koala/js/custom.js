/**
 * @file
 * Global utilities.
 *
 */
(function ($, Drupal) {
  "use strict";

  Drupal.behaviors.koala = {
    attach: function (context, settings) {},
  };

  jQuery("#edit-field-fecha-nac-0-value").datepicker({
    dateFormat: "dd-mm-yy", // 22-05-2019
    changeMonth: true,
    changeYear: true,
    yearRange: "2001:2023",
    altFormat: "dd/mm/yy",
    maxDate: "-1m -1w",
    minDate: new Date(2001, 1 - 1, 1),
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

  jQuery("#edit-field-hora-clase-0-value").attr(
    "placeholder",
    "Hora de la clase"
  );

  jQuery(document).ready(function ($) {
    // detectar el tamaño de la pantalla y guardarlo en variable para usarla en el codigo
    let screenWidth = window.screen.width;

    // detectar las clases .path-node en el body
    let pageNode = document.body.classList.contains("path-node");
    let pageFront = document.body.classList.contains("path-frontpage");
    console.log(pageNode);
    console.log(pageFront);
    // si existe la clase .page-node-27 o .page-node-26 en el body
    if (pageNode === true || pageFront === true) {
      console.log("mobile");
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

    // Slick Nuestra metodología
    $(".view-nuestra-metodologia > .view-content").slick({
      dots: false,
      infinite: false,
      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: false,
            dots: false,
          },
        },
        {
          breakpoint: 790,
          settings: {
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            dots: false,
          },
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            dots: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            centerPadding: "40px",
          },
        },
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ],
    });

    // Slick Testimonios
    $(".view-testimonios.view-id-testimonios .view-content.row").slick({
      dots: true,
      infinite: false,
      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: false,
            dots: true,
          },
        },
        {
          breakpoint: 790,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ],
    });

    //SLICK .view-barra-cuadros
    $(".view-barra-cuadros > .view-content").slick({
      dots: false,
      infinite: false,
      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 790,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ],
    });

    // Slick Nuestra Plataforma
    $(".view-slider-nuestra-plataforma > .view-content.row").slick({
      dots: false,
      infinite: false,
    });

    //FORMULARIO webform-submission-hoja-de-vida-form togglen .paragraph--id--195
    $(
      ".paragraph--id--195 .webform-submission-hoja-de-vida-form #edit-flexbox"
    ).hide();
    $(
      ".paragraph--id--195 .webform-submission-hoja-de-vida-form #edit-actions"
    ).hide();
    $(
      ".paragraph--id--195 .webform-submission-hoja-de-vida-form #edit-descripcion"
    ).hide();

    // ADD CLASS collapse-n TO #edit-titulo
    $(
      ".paragraph--id--195 .webform-submission-hoja-de-vida-form #edit-titulo"
    ).addClass("collapse-n");

    // ADD VARIUS CSS TO #edit-titulo ONE LINE
    $(
      ".paragraph--id--195 .webform-submission-hoja-de-vida-form #edit-titulo"
    ).css({ cursor: "pointer" });
    $(".paragraph--id--195 .webform-submission-hoja-de-vida-form").css({
      width: "30%",
      "padding-bottom": "0px",
      "border-radius": "32px",
    });
    if (pageMobile === true) {
      $(".paragraph--id--195 .webform-submission-hoja-de-vida-form").css({
        width: "70%",
      });
      if (pageMobile580 === true) {
        $(".paragraph--id--195 .webform-submission-hoja-de-vida-form").css({
          width: "90%",
        });
      }
    }

    $(
      ".paragraph--id--195 .webform-submission-hoja-de-vida-form #edit-titulo"
    ).click(function () {
      $(
        ".paragraph--id--195 .webform-submission-hoja-de-vida-form #edit-flexbox"
      ).toggle();
      $(
        ".paragraph--id--195 .webform-submission-hoja-de-vida-form #edit-actions"
      ).toggle();
      $(
        ".paragraph--id--195 .webform-submission-hoja-de-vida-form #edit-descripcion"
      ).toggle(function () {
        // comprobar que se este mostrando, si se muestra ejecutar un codigo de lo contrario ejecutar otro
        var display = $(
          ".webform-submission-hoja-de-vida-form #edit-descripcion"
        ).is(":visible");
        if (display === true) {
          $(".paragraph--id--195 .webform-submission-hoja-de-vida-form").css({
            width: "70%",
            "padding-bottom": "1rem",
            "border-radius": "32px",
          });
          $(
            ".paragraph--id--195 .webform-submission-hoja-de-vida-form #edit-flexbox"
          ).css({ display: "flex" });
          if (pageMobile === true) {
            $(".paragraph--id--195 .webform-submission-hoja-de-vida-form").css({
              width: "90%",
            });
          }
          // REMOVE CLASS collapse-n TO #edit-titulo
          $(
            ".paragraph--id--195 .webform-submission-hoja-de-vida-form #edit-titulo"
          ).removeClass("collapse-n");
        } else {
          $(".paragraph--id--195 .webform-submission-hoja-de-vida-form").css({
            width: "30%",
            "padding-bottom": "0px",
            "border-radius": "32px",
          });
          if (pageMobile === true) {
            $(".paragraph--id--195 .webform-submission-hoja-de-vida-form").css({
              width: "70%",
            });
            if (pageMobile580 === true) {
              $(
                ".paragraph--id--195 .webform-submission-hoja-de-vida-form"
              ).css({ width: "90%" });
            }
          }
          // ADD CLASS collapse-n TO #edit-titulo
          $(
            ".paragraph--id--195 .webform-submission-hoja-de-vida-form #edit-titulo"
          ).addClass("collapse-n");
        }
      });
    });

    //FORMULARIO webform-submission-hoja-de-vida-form toggle paragraph--id--232
    $(
      ".paragraph--id--232 .webform-submission-hoja-de-vida-form #edit-flexbox--2"
    ).hide();
    $(
      ".paragraph--id--232 .webform-submission-hoja-de-vida-form #edit-actions--3"
    ).hide();
    $(
      ".paragraph--id--232 .webform-submission-hoja-de-vida-form #edit-descripcion--2"
    ).hide();

    // ADD CLASS collapse-n TO #edit-titulo--2
    $(
      ".paragraph--id--232 .webform-submission-hoja-de-vida-form #edit-titulo--2"
    ).addClass("collapse-n");

    // ADD VARIUS CSS TO #edit-titulo ONE LINE
    $(
      ".paragraph--id--232 .webform-submission-hoja-de-vida-form #edit-titulo--2"
    ).css({ cursor: "pointer" });
    $(".paragraph--id--232 .webform-submission-hoja-de-vida-form").css({
      width: "30%",
      "padding-bottom": "0px",
      "border-radius": "32px",
    });
    if (pageMobile === true) {
      $(".paragraph--id--232 .webform-submission-hoja-de-vida-form").css({
        width: "70%",
      });
      if (pageMobile580 === true) {
        $(".paragraph--id--232 .webform-submission-hoja-de-vida-form").css({
          width: "90%",
        });
      }
    }

    $(
      ".paragraph--id--232 .webform-submission-hoja-de-vida-form #edit-titulo--2"
    ).click(function () {
      $(
        ".paragraph--id--232 .webform-submission-hoja-de-vida-form #edit-flexbox--2"
      ).toggle();
      $(
        ".paragraph--id--232 .webform-submission-hoja-de-vida-form #edit-actions--3"
      ).toggle();
      $(
        ".paragraph--id--232 .webform-submission-hoja-de-vida-form #edit-descripcion--2"
      ).toggle(function () {
        // comprobar que se este mostrando, si se muestra ejecutar un codigo de lo contrario ejecutar otro
        var display = $(
          ".paragraph--id--232 .webform-submission-hoja-de-vida-form #edit-descripcion--2"
        ).is(":visible");
        if (display === true) {
          $(".paragraph--id--232 .webform-submission-hoja-de-vida-form").css({
            width: "70%",
            "padding-bottom": "1rem",
            "border-radius": "32px",
          });
          $(
            ".paragraph--id--232 .webform-submission-hoja-de-vida-form #edit-flexbox--2"
          ).css({ display: "flex" });
          if (pageMobile === true) {
            $(".paragraph--id--232 .webform-submission-hoja-de-vida-form").css({
              width: "90%",
            });
          }
          // REMOVE CLASS collapse-n TO #edit-titulo--2
          $(
            ".paragraph--id--232 .webform-submission-hoja-de-vida-form #edit-titulo--2"
          ).removeClass("collapse-n");
        } else {
          $(".paragraph--id--232 .webform-submission-hoja-de-vida-form").css({
            width: "30%",
            "padding-bottom": "0px",
            "border-radius": "32px",
          });
          if (pageMobile === true) {
            $(".paragraph--id--232 .webform-submission-hoja-de-vida-form").css({
              width: "70%",
            });
            if (pageMobile580 === true) {
              $(
                ".paragraph--id--232 .webform-submission-hoja-de-vida-form"
              ).css({ width: "90%" });
            }
          }

          // ADD CLASS collapse-n TO #edit-titulo--2
          $(
            ".paragraph--id--232 .webform-submission-hoja-de-vida-form #edit-titulo--2"
          ).addClass("collapse-n");
        }
      });
    });

    //FORMULARIO webform-submission-agendemos-cita-form toggle paragraph--id--230
    $(
      ".paragraph--id--230 .webform-submission-agendemos-cita-form #edit-flexbox"
    ).hide();
    $(
      ".paragraph--id--230 .webform-submission-agendemos-cita-form #edit-actions"
    ).hide();
    $(
      ".paragraph--id--230 .webform-submission-agendemos-cita-form #edit-descripcion"
    ).hide();

    // ADD CLASS collapse-n TO #edit-titulo
    $(
      ".paragraph--id--230 .webform-submission-agendemos-cita-form #edit-titulo"
    ).addClass("collapse-n");

    // ADD VARIUS CSS TO #edit-titulo ONE LINE
    $(
      ".paragraph--id--230 .webform-submission-agendemos-cita-form #edit-titulo"
    ).css({ cursor: "pointer" });
    $(".paragraph--id--230 .webform-submission-agendemos-cita-form").css({
      width: "30%",
      "padding-bottom": "0px",
      "border-radius": "32px",
    });
    if (pageMobile === true) {
      $(".paragraph--id--230 .webform-submission-agendemos-cita-form").css({
        width: "70%",
      });
      if (pageMobile580 === true) {
        $(".paragraph--id--230 .webform-submission-agendemos-cita-form").css({
          width: "90%",
        });
      }
    }
    $(
      ".paragraph--id--230 .webform-submission-agendemos-cita-form #edit-titulo"
    ).click(function () {
      $(
        ".paragraph--id--230 .webform-submission-agendemos-cita-form #edit-flexbox"
      ).toggle();
      $(
        ".paragraph--id--230 .webform-submission-agendemos-cita-form #edit-actions"
      ).toggle();
      $(
        ".paragraph--id--230 .webform-submission-agendemos-cita-form #edit-descripcion"
      ).toggle(function () {
        // comprobar que se este mostrando, si se muestra ejecutar un codigo de lo contrario ejecutar otro
        var display = $(
          ".paragraph--id--230 .webform-submission-agendemos-cita-form #edit-descripcion"
        ).is(":visible");
        if (display === true) {
          $(".paragraph--id--230 .webform-submission-agendemos-cita-form").css({
            width: "80%",
            "padding-bottom": "1rem",
            "border-radius": "32px",
          });
          if (pageMobile === true) {
            $(
              ".paragraph--id--230 .webform-submission-agendemos-cita-form"
            ).css({ width: "90%" });
          }

          $(
            ".paragraph--id--230 .webform-submission-agendemos-cita-form #edit-flexbox"
          ).css({ display: "flex" });
          // REMOVE CLASS collapse-n TO #edit-titulo
          $(
            ".paragraph--id--230 .webform-submission-agendemos-cita-form #edit-titulo"
          ).removeClass("collapse-n");
        } else {
          $(".paragraph--id--230 .webform-submission-agendemos-cita-form").css({
            width: "30%",
            "padding-bottom": "0px",
            "border-radius": "32px",
          });
          if (pageMobile === true) {
            $(
              ".paragraph--id--230 .webform-submission-agendemos-cita-form"
            ).css({ width: "70%" });
            if (pageMobile580 === true) {
              $(
                ".paragraph--id--230 .webform-submission-agendemos-cita-form"
              ).css({ width: "90%" });
            }
          }
          // ADD CLASS collapse-n TO #edit-titulo
          $(
            ".paragraph--id--230 .webform-submission-agendemos-cita-form #edit-titulo"
          ).addClass("collapse-n");
        }
      });
    });

    //FORMULARIO webform-submission-agendemos-cita-paragraph-239-add-form toggle paragraph--id--239
    //#edit-titulo--2, #edit-descripcion--2, #edit-flexbox--2, #edit-actions--3
    $(
      ".paragraph--id--239 .webform-submission-agendemos-cita-paragraph-239-add-form #edit-flexbox--2"
    ).hide();
    $(
      ".paragraph--id--239 .webform-submission-agendemos-cita-paragraph-239-add-form #edit-actions--3"
    ).hide();
    $(
      ".paragraph--id--239 .webform-submission-agendemos-cita-paragraph-239-add-form #edit-descripcion--2"
    ).hide();

    // ADD CLASS collapse-n TO #edit-titulo--2
    $(
      ".paragraph--id--239 .webform-submission-agendemos-cita-paragraph-239-add-form #edit-titulo--2"
    ).addClass("collapse-n");

    // ADD VARIUS CSS TO #edit-titulo ONE LINE
    $(
      ".paragraph--id--239 .webform-submission-agendemos-cita-paragraph-239-add-form #edit-titulo--2"
    ).css({ cursor: "pointer" });
    $(
      ".paragraph--id--239 .webform-submission-agendemos-cita-paragraph-239-add-form"
    ).css({ width: "30%", "padding-bottom": "0px", "border-radius": "32px" });
    if (pageMobile === true) {
      $(
        ".paragraph--id--239 .webform-submission-agendemos-cita-paragraph-239-add-form"
      ).css({ width: "70%" });
      if (pageMobile580 === true) {
        $(
          ".paragraph--id--239 .webform-submission-agendemos-cita-paragraph-239-add-form"
        ).css({ width: "90%" });
      }
    }
    $(
      ".paragraph--id--239 .webform-submission-agendemos-cita-paragraph-239-add-form #edit-titulo--2"
    ).click(function () {
      $(
        ".paragraph--id--239 .webform-submission-agendemos-cita-paragraph-239-add-form #edit-flexbox--2"
      ).toggle();
      $(
        ".paragraph--id--239 .webform-submission-agendemos-cita-paragraph-239-add-form #edit-actions--3"
      ).toggle();
      $(
        ".paragraph--id--239 .webform-submission-agendemos-cita-paragraph-239-add-form #edit-descripcion--2"
      ).toggle(function () {
        // comprobar que se este mostrando, si se muestra ejecutar un codigo de lo contrario ejecutar otro
        var display = $(
          ".paragraph--id--239 .webform-submission-agendemos-cita-paragraph-239-add-form #edit-descripcion--2"
        ).is(":visible");
        if (display === true) {
          $(
            ".paragraph--id--239 .webform-submission-agendemos-cita-paragraph-239-add-form"
          ).css({
            width: "80%",
            "padding-bottom": "1rem",
            "border-radius": "32px",
          });
          if (pageMobile === true) {
            $(
              ".paragraph--id--239 .webform-submission-agendemos-cita-paragraph-239-add-form"
            ).css({ width: "90%" });
          }

          $(
            ".paragraph--id--239 .webform-submission-agendemos-cita-paragraph-239-add-form #edit-flexbox--2"
          ).css({ display: "flex" });
          // REMOVE CLASS collapse-n TO #edit-titulo--2
          $(
            ".paragraph--id--239 .webform-submission-agendemos-cita-paragraph-239-add-form #edit-titulo--2"
          ).removeClass("collapse-n");
        } else {
          $(
            ".paragraph--id--239 .webform-submission-agendemos-cita-paragraph-239-add-form"
          ).css({
            width: "30%",
            "padding-bottom": "0px",
            "border-radius": "32px",
          });
          if (pageMobile === true) {
            $(
              ".paragraph--id--239 .webform-submission-agendemos-cita-paragraph-239-add-form"
            ).css({ width: "70%" });
            if (pageMobile580 === true) {
              $(
                ".paragraph--id--239 .webform-submission-agendemos-cita-paragraph-239-add-form"
              ).css({ width: "90%" });
            }
          }
          // ADD CLASS collapse-n TO #edit-titulo
          $(
            ".paragraph--id--239 .webform-submission-agendemos-cita-paragraph-239-add-form #edit-titulo--2"
          ).addClass("collapse-n");
        }
      });
    });

    //FORMULARIO webform-submission-agendemos-cita-paragraph-233-add-form toggle paragraph--id--233
    $(
      ".paragraph--id--233 .webform-submission-agendemos-cita-paragraph-233-add-form #edit-flexbox--3"
    ).hide();
    $(
      ".paragraph--id--233 .webform-submission-agendemos-cita-paragraph-233-add-form #edit-actions--5"
    ).hide();
    $(
      ".paragraph--id--233 .webform-submission-agendemos-cita-paragraph-233-add-form #edit-descripcion--3"
    ).hide();

    // ADD CLASS collapse-n TO #edit-titulo--3
    $(
      ".paragraph--id--233 .webform-submission-agendemos-cita-paragraph-233-add-form #edit-titulo--3"
    ).addClass("collapse-n");
    // ADD VARIUS CSS TO #edit-titulo ONE LINE
    $(
      ".paragraph--id--233 .webform-submission-agendemos-cita-paragraph-233-add-form #edit-titulo--3"
    ).css({ cursor: "pointer" });
    $(
      ".paragraph--id--233 .webform-submission-agendemos-cita-paragraph-233-add-form"
    ).css({ width: "30%", "padding-bottom": "0px", "border-radius": "32px" });
    if (pageMobile === true) {
      $(
        ".paragraph--id--233 .webform-submission-agendemos-cita-paragraph-233-add-form"
      ).css({ width: "70%" });
      if (pageMobile580 === true) {
        $(
          ".paragraph--id--233 .webform-submission-agendemos-cita-paragraph-233-add-form"
        ).css({ width: "90%" });
      }
    }
    $(
      ".paragraph--id--233 .webform-submission-agendemos-cita-paragraph-233-add-form #edit-titulo--3"
    ).click(function () {
      $(
        ".paragraph--id--233 .webform-submission-agendemos-cita-paragraph-233-add-form #edit-flexbox--3"
      ).toggle();
      $(
        ".paragraph--id--233 .webform-submission-agendemos-cita-paragraph-233-add-form #edit-actions--5"
      ).toggle();
      $(
        ".paragraph--id--233 .webform-submission-agendemos-cita-paragraph-233-add-form #edit-descripcion--3"
      ).toggle(function () {
        // comprobar que se este mostrando, si se muestra ejecutar un codigo de lo contrario ejecutar otro
        var display = $(
          ".paragraph--id--233 .webform-submission-agendemos-cita-paragraph-233-add-form #edit-descripcion--3"
        ).is(":visible");
        if (display === true) {
          $(
            ".paragraph--id--233 .webform-submission-agendemos-cita-paragraph-233-add-form"
          ).css({
            width: "80%",
            "padding-bottom": "1rem",
            "border-radius": "32px",
          });
          if (pageMobile === true) {
            $(
              ".paragraph--id--233 .webform-submission-agendemos-cita-paragraph-233-add-form"
            ).css({ width: "90%" });
          }
          $(
            ".paragraph--id--233 .webform-submission-agendemos-cita-paragraph-233-add-form #edit-flexbox--3"
          ).css({ display: "flex" });
          // REMOVE CLASS collapse-n TO #edit-titulo
          $(
            ".paragraph--id--233 .webform-submission-agendemos-cita-paragraph-233-add-form #edit-titulo--3"
          ).removeClass("collapse-n");
        } else {
          $(
            ".paragraph--id--233 .webform-submission-agendemos-cita-paragraph-233-add-form"
          ).css({
            width: "30%",
            "padding-bottom": "0px",
            "border-radius": "32px",
          });
          if (pageMobile === true) {
            $(
              ".paragraph--id--233 .webform-submission-agendemos-cita-paragraph-233-add-form"
            ).css({ width: "70%" });
            if (pageMobile580 === true) {
              $(
                ".paragraph--id--233 .webform-submission-agendemos-cita-paragraph-233-add-form"
              ).css({ width: "90%" });
            }
          }

          // ADD CLASS collapse-n TO #edit-titulo
          $(
            ".paragraph--id--233 .webform-submission-agendemos-cita-paragraph-233-add-form #edit-titulo--3"
          ).addClass("collapse-n");
        }
      });
    });

    // //MANEJO DE ACORDEONES PARA QUE SE CIERREN AL ABRIR OTRO O AL ABRIR EL MISMO
    // $('.panel-group.accordion h2.accordion-header >.accordion-button').click(function(){
    //   var display = $(this).parent().parent().find('.accordion-body').is(':visible');
    //   if ( display === true ) {
    //     $(this).parent().parent().find('.accordion-body').hide();
    //     $(this).parent().parent().find('.accordion-body').removeClass('show');
    //     $(this).parent().parent().find('.accordion-body').addClass('show-not');
    //   }
    // });

    // $('.panel-group.accordion h2.accordion-header >.accordion-button').click(function(){
    //   //get class div parent parent div.show
    //   var display = $(this).parent().parent().find('.accordion-collapse').is(':visible');
    //   if ( display === true ) {
    //     $(this).parent().parent().find('.accordion-collapse').removeClass('show');
    //     $(this).parent().parent().find('.accordion-collapse').addClass('show-not');
    //   } else {
    //     $(this).parent().parent().find('.accordion-collapse').removeClass('show-not');
    //   }
    // });

    //has class show-not
    $(".panel-group.accordion h2.accordion-header >.accordion-button").click(
      function () {
        $(this)
          .parent()
          .parent()
          .parent()
          .find(".button-mostrando")
          .removeClass("button-mostrando");
        //$(this).parent().parent().parent().find('.accordion-collapse').removeClass('mostrando');

        var getClassShow = $(this)
          .parent()
          .parent()
          .find(".accordion-collapse")
          .hasClass("mostrando");

        if (getClassShow === true) {
          $(this)
            .parent()
            .parent()
            .find(".accordion-collapse")
            .removeClass("mostrando");
          // add class collapsing
          $(this)
            .parent()
            .parent()
            .find(".accordion-collapse")
            .addClass("collapsing");

          $(this)
            .parent()
            .parent()
            .find(".accordion-collapse")
            .removeClass("show");
          //.accordion-button remove class show-not
          $(this).removeClass("button-mostrando");
          // collapsed add class
          $(this).addClass("collapsed");
        } else {
          $(this)
            .parent()
            .parent()
            .find(".accordion-collapse")
            .addClass("show");
          $(this)
            .parent()
            .parent()
            .find(".accordion-collapse")
            .addClass("mostrando");
          $(this)
            .parent()
            .parent()
            .find(".accordion-collapse")
            .addClass("collapsing");
          //.accordion-button add class show-not
          $(this).addClass("button-mostrando");
          // collapsed remove class
          $(this).removeClass("collapsed");
        }
      }
    );

    $(".popup-youtube").magnificPopup({
      type: "iframe",
      iframe: {
        patterns: {
          youtube: {
            index: "youtube.com/",
            id: "v=",
            src: "//www.youtube.com/embed/%id%?autoplay=1",
          },
        },
      },
    });

    window.addEventListener("resize", function () {
      // tu código aquí
      let screenWidth = window.screen.width;
      console.log("La pantalla ha cambiado de tamaño");
      console.log(screenWidth);
    });

    if (screenWidth <= 1200) {
      console.log("Pantalla menor a 1200px");
      $(
        ".view-display-id-block_1_quienes .view-content.row .views-row .views-field-field-crear-bloques > .field-content"
      ).slick({
        dots: false,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 1,
              centerMode: true,
              slidesToScroll: 1,
              infinite: false,
              dots: true,
            },
          },
          {
            breakpoint: 790,
            settings: {
              slidesToShow: 1,
              centerMode: true,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              centerMode: true,
              slidesToScroll: 1,
            },
          },
          // You can unslick at a given breakpoint now by adding:
          // settings: "unslick"
          // instead of a settings object
        ],
      });

      $(".paragraph--id--165 > .paragraph__column").slick({
        dots: false,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
      });
    }

    if (screenWidth <= 992) {
      $(
        ".view-como-funciona.view-id-como_funciona > .view-content > .views-row:nth-child(2) .como-funcion > .izquierda > .row"
      ).slick({
        dots: false,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
      });
    }
  });
})(jQuery, Drupal);
