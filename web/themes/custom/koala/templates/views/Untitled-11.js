// Crear arreglo de cantidad de clases por semana, seria con estos datos:
// total de clases, clases por semana, cantidad de semanas, id del curso
// Ejemplo: 20 clases, 2 clases por semana, 10 semanas, id del curso 1

const clasesComprar4Semanas = [
  {clases: 4,id: 9},
  {clases: 8,id: 10},
  {clases: 12,id: 11},
  {clases: 16,id: 12},
  {clases: 20,id: 21},
  {clases: 24,id: 22},
  {clases: 28,id: 23},
  {clases: 32,id: 24},
  {clases: 36,id: 25},
  {clases: 40,id: 26},
]

const clasesComprar12Semanas = [
  {clases: 12,id: 13},
  {clases: 24,id: 14},
  {clases: 36,id: 15},
  {clases: 48,id: 16},
  {clases: 60,id: 27},
  {clases: 72,id: 28},
  {clases: 84,id: 29},
  {clases: 96,id: 30},
  {clases: 108,id: 31},
  {clases: 120,id: 32},
]

const clasesComprar24Semanas = [
  {clases: 24,id: 17},
  {clases: 48,id: 18},
  {clases: 72,id: 19},
  {clases: 96,id: 20},
  {clases: 120,id: 33},
  {clases: 144,id: 34},
  {clases: 168,id: 35},
  {clases: 192,id: 36},
  {clases: 216,id: 37},
  {clases: 240,id: 38},
]


const datosCosteClases = [
  { clases: 4, coste: 70.00, costePorClase: 17.50000 },
  { clases: 8, coste: 120.00, costePorClase: 15.00000 },
  { clases: 12, coste: 170.00, costePorClase: 14.16650 },
  { clases: 16, coste: 220.00, costePorClase: 13.75000 },
  { clases: 20, coste: 260.00, costePorClase: 13.00000 },
  { clases: 24, coste: 300.00, costePorClase: 12.50000 },
  { clases: 28, coste: 330.00, costePorClase: 11.78560 },
  { clases: 32, coste: 375.00, costePorClase: 11.71880 },
  { clases: 36, coste: 420.00, costePorClase: 11.66680 },
  { clases: 40, coste: 465.00, costePorClase: 11.62500 },
  { clases: 44, coste: 510.00, costePorClase: 11.59100 },
  { clases: 48, coste: 555.00, costePorClase: 11.56260 },
  { clases: 52, coste: 600.00, costePorClase: 11.53849 },
  { clases: 56, coste: 645.00, costePorClase: 11.51785 },
  { clases: 60, coste: 690.00, costePorClase: 11.50000 },
  { clases: 64, coste: 735.00, costePorClase: 11.48438 },
  { clases: 68, coste: 780.00, costePorClase: 11.47059 },
  { clases: 72, coste: 825.00, costePorClase: 11.45833 },
  { clases: 76, coste: 870.00, costePorClase: 11.44737 },
  { clases: 80, coste: 915.00, costePorClase: 11.43750 },
  { clases: 84, coste: 960.00, costePorClase: 11.42857 },
  { clases: 88, coste: 1005.00, costePorClase: 11.42045 },
  { clases: 92, coste: 1050.00, costePorClase: 11.41304 },
  { clases: 96, coste: 1095.00, costePorClase: 11.40625 },
  { clases: 100, coste: 1140.00, costePorClase: 11.40000 },
  { clases: 104, coste: 1185.00, costePorClase: 11.39423 },
  { clases: 108, coste: 1230.00, costePorClase: 11.38889 },
  { clases: 112, coste: 1275.00, costePorClase: 11.38393 },
  { clases: 116, coste: 1320.00, costePorClase: 11.37931 },
  { clases: 120, coste: 1365.00, costePorClase: 11.37500 },
  { clases: 124, coste: 1410.00, costePorClase: 11.37097 },
  { clases: 128, coste: 1455.00, costePorClase: 11.36719 },
  { clases: 132, coste: 1500.00, costePorClase: 11.36364 },
  { clases: 136, coste: 1545.00, costePorClase: 11.36029 },
  { clases: 140, coste: 1590.00, costePorClase: 11.35714 },
  { clases: 144, coste: 1620.00, costePorClase: 11.25000 },
  { clases: 156, coste: 1710.00, costePorClase: 10.96157 },
  { clases: 168, coste: 1838.25, costePorClase: 10.94196 },
  { clases: 180, coste: 1966.50, costePorClase: 10.92500 },
  { clases: 192, coste: 2094.75, costePorClase: 10.91016 },
  { clases: 204, coste: 2223.00, costePorClase: 10.89706 },
  { clases: 216, coste: 2351.25, costePorClase: 10.88542 },
  { clases: 228, coste: 2479.50, costePorClase: 10.87500 },
  { clases: 240, coste: 2607.75, costePorClase: 10.86563 },
  { clases: 252, coste: 2736.00, costePorClase: 10.85714 },
  { clases: 264, coste: 2864.25, costePorClase: 10.84943 },
  { clases: 276, coste: 2992.50, costePorClase: 10.84239 },
  { clases: 288, coste: 3120.75, costePorClase: 10.83594 },
  { clases: 300, coste: 3249.00, costePorClase: 10.83000 },
  { clases: 312, coste: 3377.25, costePorClase: 10.82452 },
  { clases: 324, coste: 3505.50, costePorClase: 10.81944 },
  { clases: 336, coste: 3633.75, costePorClase: 10.81473 },
  { clases: 348, coste: 3762.00, costePorClase: 10.81034 },
  { clases: 360, coste: 3890.25, costePorClase: 10.80625 },
  { clases: 372, coste: 4018.50, costePorClase: 10.80242 },
  { clases: 384, coste: 4146.75, costePorClase: 10.79883 },
  { clases: 396, coste: 4275.00, costePorClase: 10.79545 },
  { clases: 408, coste: 4403.25, costePorClase: 10.79228 },
  { clases: 420, coste: 4531.50, costePorClase: 10.78929 },
  { clases: 432, coste: 4455.00, costePorClase: 10.31250 },
  { clases: 456, coste: 4698.00, costePorClase: 10.30263 },
  { clases: 480, coste: 4941.00, costePorClase: 10.29375 },
  { clases: 504, coste: 5184.00, costePorClase: 10.28571 },
  { clases: 528, coste: 5427.00, costePorClase: 10.27841 },
  { clases: 552, coste: 5670.00, costePorClase: 10.27174 },
  { clases: 576, coste: 5913.00, costePorClase: 10.26563 },
  { clases: 600, coste: 6156.00, costePorClase: 10.26000 },
  { clases: 624, coste: 6399.00, costePorClase: 10.25481 },
  { clases: 648, coste: 6642.00, costePorClase: 10.25000 },
  { clases: 672, coste: 6885.00, costePorClase: 10.24554 },
  { clases: 696, coste: 7128.00, costePorClase: 10.24138 },
  { clases: 720, coste: 7371.00, costePorClase: 10.23750 },
  { clases: 744, coste: 7614.00, costePorClase: 10.23387 },
  { clases: 768, coste: 7857.00, costePorClase: 10.23047 },
  { clases: 792, coste: 8100.00, costePorClase: 10.22727 },
  { clases: 816, coste: 8343.00, costePorClase: 10.22426 },
  { clases: 840, coste: 8586.00, costePorClase: 10.22143 }
];
   
  const clases4Semanas = [
    { clasesPorSemana: 1, totalClases: 4, total: 70, valorPorClase: 17.5 },
    { clasesPorSemana: 2, totalClases: 8, total: 120, valorPorClase: 15 },
    { clasesPorSemana: 3, totalClases: 12, total: 170, valorPorClase: 14.1665 },
    { clasesPorSemana: 4, totalClases: 16, total: 220, valorPorClase: 13.75 },
    { clasesPorSemana: 5, totalClases: 20, total: 260, valorPorClase: 13 },
    { clasesPorSemana: 6, totalClases: 24, total: 300, valorPorClase: 12.5 },
    { clasesPorSemana: 7, totalClases: 28, total: 330, valorPorClase: 11.7856 },
    { clasesPorSemana: 8, totalClases: 32, total: 375, valorPorClase: 11.7188 },
    { clasesPorSemana: 9, totalClases: 36, total: 420, valorPorClase: 11.6668 },
    { clasesPorSemana: 10, totalClases: 40, total: 465, valorPorClase: 11.625 },
    { clasesPorSemana: 11, totalClases: 44, total: 510, valorPorClase: 11.591 },
    { clasesPorSemana: 12, totalClases: 48, total: 555, valorPorClase: 11.5626 },
    { clasesPorSemana: 13, totalClases: 52, total: 600, valorPorClase: 11.53849 },
    { clasesPorSemana: 14, totalClases: 56, total: 645, valorPorClase: 11.51785 },
    { clasesPorSemana: 15, totalClases: 60, total: 690, valorPorClase: 11.5 },
    { clasesPorSemana: 16, totalClases: 64, total: 735, valorPorClase: 11.48438 },
    { clasesPorSemana: 17, totalClases: 68, total: 780, valorPorClase: 11.47059 },
    { clasesPorSemana: 18, totalClases: 72, total: 825, valorPorClase: 11.45833 },
    { clasesPorSemana: 19, totalClases: 76, total: 870, valorPorClase: 11.44737 },
    { clasesPorSemana: 20, totalClases: 80, total: 915, valorPorClase: 11.4375 },
    { clasesPorSemana: 21, totalClases: 84, total: 960, valorPorClase: 11.42857 },
    { clasesPorSemana: 22, totalClases: 88, total: 1005, valorPorClase: 11.42045 },
    { clasesPorSemana: 23, totalClases: 92, total: 1050, valorPorClase: 11.41304 },
    { clasesPorSemana: 24, totalClases: 96, total: 1095, valorPorClase: 11.40625 },
    { clasesPorSemana: 25, totalClases: 100, total: 1140, valorPorClase: 11.4 },
    { clasesPorSemana: 26, totalClases: 104, total: 1185, valorPorClase: 11.39423 },
    { clasesPorSemana: 27, totalClases: 108, total: 1230, valorPorClase: 11.38889 },
    { clasesPorSemana: 28, totalClases: 112, total: 1275, valorPorClase: 11.38393 },
    { clasesPorSemana: 29, totalClases: 116, total: 1320, valorPorClase: 11.37931 },
    { clasesPorSemana: 30, totalClases: 120, total: 1365, valorPorClase: 11.375 },
    { clasesPorSemana: 31, totalClases: 124, total: 1410, valorPorClase: 11.37097 },
    { clasesPorSemana: 32, totalClases: 128, total: 1455, valorPorClase: 11.36719 },
    { clasesPorSemana: 33, totalClases: 132, total: 1500, valorPorClase: 11.36364 },
    { clasesPorSemana: 34, totalClases: 136, total: 1545, valorPorClase: 11.36029 },
    { clasesPorSemana: 35, totalClases: 140, total: 1590, valorPorClase: 11.35714 },
  ];

  
  

  const clases12Semanas = [
    { clasesPorSemana: 1, totalClases: 12, total: 199.50, valorPorClase: 16.62500 },
    { clasesPorSemana: 2, totalClases: 24, total: 342.00, valorPorClase: 14.25000 },
    { clasesPorSemana: 3, totalClases: 36, total: 484.49, valorPorClase: 13.45818 },
    { clasesPorSemana: 4, totalClases: 48, total: 627.00, valorPorClase: 13.06250 },
    { clasesPorSemana: 5, totalClases: 60, total: 741.00, valorPorClase: 12.35000 },
    { clasesPorSemana: 6, totalClases: 72, total: 855.00, valorPorClase: 11.87500 },
    { clasesPorSemana: 7, totalClases: 84, total: 940.49, valorPorClase: 11.19632 },
    { clasesPorSemana: 8, totalClases: 96, total: 1068.75, valorPorClase: 11.13286 },
    { clasesPorSemana: 9, totalClases: 108, total: 1197.01, valorPorClase: 11.08346 },
    { clasesPorSemana: 10, totalClases: 120, total: 1325.25, valorPorClase: 11.04375 },
    { clasesPorSemana: 11, totalClases: 132, total: 1453.51, valorPorClase: 11.01145 },
    { clasesPorSemana: 12, totalClases: 144, total: 1581.76, valorPorClase: 10.98447 },
    { clasesPorSemana: 13, totalClases: 156, total: 1710.00, valorPorClase: 10.96157 },
    { clasesPorSemana: 14, totalClases: 168, total: 1838.25, valorPorClase: 10.94196 },
    { clasesPorSemana: 15, totalClases: 180, total: 1966.50, valorPorClase: 10.92500 },
    { clasesPorSemana: 16, totalClases: 192, total: 2094.75, valorPorClase: 10.91016 },
    { clasesPorSemana: 17, totalClases: 204, total: 2223.00, valorPorClase: 10.89706 },
    { clasesPorSemana: 18, totalClases: 216, total: 2351.25, valorPorClase: 10.88542 },
    { clasesPorSemana: 19, totalClases: 228, total: 2479.50, valorPorClase: 10.87500 },
    { clasesPorSemana: 20, totalClases: 240, total: 2607.75, valorPorClase: 10.86563 },
    { clasesPorSemana: 21, totalClases: 252, total: 2736.00, valorPorClase: 10.85714 },
    { clasesPorSemana: 22, totalClases: 264, total: 2864.25, valorPorClase: 10.84943 },
    { clasesPorSemana: 23, totalClases: 276, total: 2992.50, valorPorClase: 10.84239 },
    { clasesPorSemana: 24, totalClases: 288, total: 3120.75, valorPorClase: 10.83594 },
    { clasesPorSemana: 25, totalClases: 300, total: 3249.00, valorPorClase: 10.83000 },
    { clasesPorSemana: 26, totalClases: 312, total: 3377.25, valorPorClase: 10.82452 },
    { clasesPorSemana: 27, totalClases: 324, total: 3505.50, valorPorClase: 10.81944 },
    { clasesPorSemana: 28, totalClases: 336, total: 3633.75, valorPorClase: 10.81473 },
    { clasesPorSemana: 29, totalClases: 348, total: 3762.00, valorPorClase: 10.81034 },
    { clasesPorSemana: 30, totalClases: 360, total: 3890.25, valorPorClase: 10.80625 },
    { clasesPorSemana: 31, totalClases: 372, total: 4018.50, valorPorClase: 10.80242 },
    { clasesPorSemana: 32, totalClases: 384, total: 4146.75, valorPorClase: 10.79883 },
    { clasesPorSemana: 33, totalClases: 396, total: 4275.00, valorPorClase: 10.79545 },
    { clasesPorSemana: 34, totalClases: 408, total: 4403.25, valorPorClase: 10.79228 },
    { clasesPorSemana: 35, totalClases: 420, total: 4531.50, valorPorClase: 10.78929 }
  ];
  
  const clases24Semanas = [
    { clasesPorSemana: 1, totalClases: 24, total: 378.00, valorPorClase: 15.75 },
    { clasesPorSemana: 2, totalClases: 48, total: 648.00, valorPorClase: 13.50 },
    { clasesPorSemana: 3, totalClases: 72, total: 917.99, valorPorClase: 12.74985 },
    { clasesPorSemana: 4, totalClases: 96, total: 1188.00, valorPorClase: 12.375 },
    { clasesPorSemana: 5, totalClases: 120, total: 1404.00, valorPorClase: 11.7 },
    { clasesPorSemana: 6, totalClases: 144, total: 1620.00, valorPorClase: 11.25 },
    { clasesPorSemana: 7, totalClases: 168, total: 1781.98, valorPorClase: 10.60704 },
    { clasesPorSemana: 8, totalClases: 192, total: 2025.01, valorPorClase: 10.54692 },
    { clasesPorSemana: 9, totalClases: 216, total: 2268.03, valorPorClase: 10.50012 },
    { clasesPorSemana: 10, totalClases: 240, total: 2511.00, valorPorClase: 10.4625 },
    { clasesPorSemana: 11, totalClases: 264, total: 2754.02, valorPorClase: 10.4319 },
    { clasesPorSemana: 12, totalClases: 288, total: 2997.03, valorPorClase: 10.40634 },
    { clasesPorSemana: 13, totalClases: 312, total: 3240.01, valorPorClase: 10.38464 },
    { clasesPorSemana: 14, totalClases: 336, total: 3483.00, valorPorClase: 10.36607 },
    { clasesPorSemana: 15, totalClases: 360, total: 3726.00, valorPorClase: 10.35 },
    { clasesPorSemana: 16, totalClases: 384, total: 3969.00, valorPorClase: 10.33594 },
    { clasesPorSemana: 17, totalClases: 408, total: 4212.00, valorPorClase: 10.32353 },
    { clasesPorSemana: 18, totalClases: 432, total: 4455.00, valorPorClase: 10.3125 },
    { clasesPorSemana: 19, totalClases: 456, total: 4698.00, valorPorClase: 10.30263 },
    { clasesPorSemana: 20, totalClases: 480, total: 4941.00, valorPorClase: 10.29375 },
    { clasesPorSemana: 21, totalClases: 504, total: 5184.00, valorPorClase: 10.28571 },
    { clasesPorSemana: 22, totalClases: 528, total: 5427.00, valorPorClase: 10.27841 },
    { clasesPorSemana: 23, totalClases: 552, total: 5670.00, valorPorClase: 10.27174 },
    { clasesPorSemana: 24, totalClases: 576, total: 5913.00, valorPorClase: 10.26563 },
    { clasesPorSemana: 25, totalClases: 600, total: 6156.00, valorPorClase: 10.26 },
    { clasesPorSemana: 26, totalClases: 624, total: 6399.00, valorPorClase: 10.25481 },
    { clasesPorSemana: 27, totalClases: 648, total: 6642.00, valorPorClase: 10.25 },
    { clasesPorSemana: 28, totalClases: 672, total: 6885.00, valorPorClase: 10.24554 },
    { clasesPorSemana: 29, totalClases: 696, total: 7128.00, valorPorClase: 10.24138 },
    { clasesPorSemana: 30, totalClases: 720, total: 7371.00, valorPorClase: 10.2375 },
    { clasesPorSemana: 31, totalClases: 744, total: 7614.00, valorPorClase: 10.23387 },
    { clasesPorSemana: 32, totalClases: 768, total: 7857.00, valorPorClase: 10.23047 },
    { clasesPorSemana: 33, totalClases: 792, total: 8100.00, valorPorClase: 10.22727 },
    { clasesPorSemana: 34, totalClases: 816, total: 8343.00, valorPorClase: 10.22426 },
    { clasesPorSemana: 35, totalClases: 840, total: 8586.00, valorPorClase: 10.22143 },
  ];


  // Obtener todos los elementos con la clase "incrementa" y "decrementa"
  const incrementaButtons = document.querySelectorAll('.incrementa');
  const decrementaButtons = document.querySelectorAll('.decrementa');
  const totalDeClases = document.querySelector('.total-de-clases');
  // Función para actualizar la suma total
  function actualizarTotal() {
    let sumaTotal = 0;
    const totalElements = document.querySelectorAll('.total');
    totalElements.forEach((element) => {
      sumaTotal += parseInt(element.textContent);
    });
    totalDeClases.textContent = sumaTotal;
  }
  // Función para manejar el evento de incremento
  function incrementarTotal(event) {
    const totalElement = event.target.previousElementSibling;
    let total = parseInt(totalElement.textContent);
    total++;
    totalElement.textContent = total;
    // actualizarTotal();
    // actualizarClasesPorSemana();
    // actualizarDuracion();
    actualizarValores();
  }
  // Función para manejar el evento de decremento
  function decrementarTotal(event) {
    const totalElement = event.target.nextElementSibling;
    let total = parseInt(totalElement.textContent);
    if (total > 0) {
      total--;
      totalElement.textContent = total;
      // actualizarTotal();
      // actualizarClasesPorSemana();
      // actualizarDuracion();
      actualizarValores();
    }
  }

  // Funcion para actualizar .clase-por-semana, se toma el valor de .total-de-clases
  function actualizarClasesPorSemana() {
    const totalDeClases = document.querySelector('.total-de-clases');
    const clasePorSemana = document.querySelector('.clase-por-semana');
    clasePorSemana.textContent = totalDeClases.textContent;
  }

  /* Funcion para actualizar el valor de .valores .duracion y .total-clases
  1) .duracion se le agrega el texto del atributo texto del radio seleccionado
  2) .duracion se le agrega el valor del atributo semanas del radio seleccionado
  3) .total-clases se le agrega el valor de .total-de-clases multiplicado por el valor de .duracion    
  */
  function actualizarDuracion() {
    const duracion = document.querySelector('.duracion');
    const totalClases = document.querySelector('.total-clases');
    const suscription = document.querySelector('input[name="suscription"]:checked');
    duracion.textContent = suscription.getAttribute('texto');
    duracion.setAttribute('semanas', suscription.value);
    totalClases.textContent = parseInt(totalDeClases.textContent) * parseInt(duracion.getAttribute('semanas'));
  }

  // Al seleccionar un radio ejecuta actualizarDuracion()
  const radios = document.querySelectorAll('input[name="suscription"]');
  radios.forEach((radio) => {
    radio.addEventListener('change', actualizarValores);
  });

 /* Crear una funcion para que cuando se actualice el numero total de clases ".total-clases" 
  se agregue el precio por clase ".precio-clase", actualice el atributo precio de ".precio-clase"
  y actualice el valor de ".valor-total" con el valor de ".total-clases" por el valor de ".precio-clase"
  Los valores son obtenidos de los arreglos clases4Semanas, clases12Semanas y clases24Semanas
  Notas:
  1) El precio de la clase se obtiene del atributo precio de ".precio-clase"
  2) El precio de la clase lo obtiene del arreglo clases4Semanas, clases12Semanas y clases24Semanas. De aqui usamos clasesPorSemana como referencia
  */
  function actualizarPrecioPorClase() {
    const totalClases = document.querySelector('.total-clases');
    const precioClase = document.querySelector('.precio-clase');
    const valorTotal = document.querySelector('.valor-total');
    const suscription = document.querySelector('input[name="suscription"]:checked');
    const clasesPorSemana = parseInt(totalClases.textContent) / parseInt(suscription.value);
    console.log('totalClases.textContent', totalClases.textContent);
    console.log('suscription.getAttribute("semanas")', suscription.value);

    let precio = 0;
    if (suscription.value == 4) {
      console.log('clasesPorSemana', clasesPorSemana);
      console.log('suscription.value', suscription.value);
      clases4Semanas.forEach((clase) => {
        if (clase.clasesPorSemana == clasesPorSemana) {
          precio = clase.valorPorClase;
        }
      });

    } else if (suscription.value == 12) {
      clases12Semanas.forEach((clase) => {
        if (clase.clasesPorSemana == clasesPorSemana) {
          precio = clase.valorPorClase;
        }
      });
    } else if (suscription.value == 24) {
      clases24Semanas.forEach((clase) => {
        if (clase.clasesPorSemana == clasesPorSemana) {
          precio = clase.valorPorClase;
        }
      });
    }

  // Buscar el valor de la clase en el arreglo datosCosteClases, tomando en cuenta el total de clases
  datosCosteClases.forEach((clase) => {
    if (clase.clases == parseInt(totalClases.textContent)) {
      precio = clase.costePorClase;
    }
  });



    precioClase.textContent = '$ ' + precio;
    precioClase.setAttribute('precio', precio);
    redondeoTotal = Math.round(parseInt(totalClases.textContent) * parseFloat(precioClase.getAttribute('precio')) * 100) / 100;
    valorTotal.textContent = '$ ' + redondeoTotal ;
    
    // Agregar valor a descuento ".descuento". Se obtiene de restar el valor del atributo precio de ".precio-clase" menos el primer valor del arreglo clases4Semanas
    const descuento = document.querySelector('.descuento');
    //descuento.textContent = Math.round((parseFloat(precioClase.getAttribute('precio')) - datosCosteClases[0].costePorClase) * 100) / 100;
    // El descuenta mostrado en % ".descuento"
    descuento.textContent = Math.round((1 - (parseFloat(precioClase.getAttribute('precio')) / datosCosteClases[0].costePorClase)) * 100) + '%';

    
    
    // Agregar valor a ahorro ".ahorro". Se obtiene (total-clases * primer-valor-del-arreglo-clases4Semanas) - (total-clases * precio-clase)
    const ahorro = document.querySelector('.ahorro');
    ahorro.textContent = ' $ ' + Math.round((parseInt(totalClases.textContent) * datosCosteClases[0].costePorClase) - (parseInt(totalClases.textContent) * parseFloat(precioClase.getAttribute('precio'))));

  }


  


  // Agregar enlace al boton .btn-comprar con las siguientes condiciones:
  // 1) Si el valor de suscription es 4, el enlace es /product/3
  // 2) Si el valor de suscription es 12, el enlace es /product/4
  // 3) Si el valor de suscription es 24, el enlace es /product/5
  // 4) Obtener el valor de .total-clases y agregarlo al enlace como parametro ?clases=valor
  function actualizarEnlace() {
    const botonComprar = document.querySelector('.btn-comprar');
    const suscription = document.querySelector('input[name="suscription"]:checked');
    const totalClases = document.querySelector('.total-clases');
    let enlace = '';
    if (suscription.value == 4) {
      enlace = '/product/3';
      // Buscar en el arreglo clasesComprar4Semanas el valor de totalClases, y guardar el valor de id en una variable
      clasesComprar4Semanas.forEach((clase) => {
        // posicion del array
        if (clase.clases == parseInt(totalClases.textContent)) {
          id_producto = clase.id;
        }
      });

      //Buscar el total de clases en el arreglo datosCosteClases, tomando en cuenta el total de clases
      totalclasesSeleccionadas = document.querySelector('.total-de-clases');
      precio12Semanas = parseInt(totalclasesSeleccionadas.textContent) * 12;
      console.log('precio12Semanas', precio12Semanas);

      precio24Semanas = parseInt(totalclasesSeleccionadas.textContent) * 24;
      console.log('precio24Semanas', precio24Semanas);

      datosCosteClases.forEach((clase) => {
        if (clase.clases == parseInt(totalClases.textContent)) {
          precio = clase.costePorClase;
        }
      });
      


    } else if (suscription.value == 12) {
      enlace = '/product/4';
      // Buscar en el arreglo clasesComprar12Semanas el valor de totalClases, y guardar el valor de id en una variable
      clasesComprar12Semanas.forEach((clase) => {
        if (clase.clases == parseInt(totalClases.textContent)) {
          id_producto = clase.id;
        }
      });

    } else if (suscription.value == 24) {
      enlace = '/product/5';
      // Buscar en el arreglo clasesComprar24Semanas el valor de totalClases, y guardar el valor de id en una variable
      clasesComprar24Semanas.forEach((clase) => {
        if (clase.clases == parseInt(totalClases.textContent)) {
          id_producto = clase.id;
        }
      });

    }
    enlace += '?clases=' + totalClases.textContent + '&v=' + id_producto;
    botonComprar.setAttribute('href', enlace);

    // Comprobar que el total de clases sea mayor que 0, si es asi
    // remover la clase .disabled del boton .btn-comprar de lo contrario agregar la clase .disabled
    if (parseInt(totalClases.textContent) > 0) {
      botonComprar.classList.remove('disabled');
    } else {
      botonComprar.classList.add('disabled');
    }    
  }


  function guardarLocalstorage() {
    //Guardar en localstorage el valor de .total-de-clases, numero de semanas y el valor de .precio-clase
    const totalClases = document.querySelector('.total-clases');
    const duracion = document.querySelector('.duracion');
    // duracion atributo semanas
    const semanas = duracion.getAttribute('semanas');
    localStorage.setItem('totalClases', totalClases.textContent);
    localStorage.setItem('semanas', semanas);
  }
  
  // Crear una funcion para actualizar todos los valores
  function actualizarValores() {
    actualizarTotal();
    actualizarClasesPorSemana();
    actualizarDuracion();
    actualizarPrecioPorClase();
    actualizarEnlace()
    guardarLocalstorage();
  }


  // Agregar manejadores de eventos a los botones de incremento y decremento
  incrementaButtons.forEach((button) => {
    button.addEventListener('click', incrementarTotal);
  });

  decrementaButtons.forEach((button) => {
    button.addEventListener('click', decrementarTotal);
  });
  