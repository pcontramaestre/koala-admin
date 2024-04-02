jQuery(document).ready(function($) {
	console.log("1");
  if ($('body.rol-director_colegio').length > 0) {
  	console.log("2")
    if ($('.enlace-pago').length > 0) {
    	console.log("3")
      let dataNroclases = $('.enlace-pago').attr('data-nroclases');
      let dataSemanas = $('.enlace-pago').attr('data-semanas');
      let dataId = $('.enlace-pago').attr('data-id');
      //dataSemanas hago un split para obtener el valor de la semana, ya que viene en formato "12 semanas"
      let semanas = dataSemanas.split(' ');
      let semana = semanas[0];

      // Guardar en localStorage
      localStorage.setItem('semanas', semana);
      localStorage.setItem('totalClases', dataNroclases);
      localStorage.setItem('idPago', dataId);

      semanas = localStorage.getItem('semanas');
      totalClases = localStorage.getItem('totalClases');
      idPago = localStorage.getItem('idPago');
          
      if (semanas) {
        console.log(semanas);
        // Crear cookie con el valor del localStorage
        document.cookie = "numerosemanas=" + semanas + "; path=/";
      } 
      // Si no hay valor, se crea el objeto
      if (totalClases) {
        console.log(totalClases);
        // Crear cookie con el valor del localStorage
        document.cookie = "totalclases=" + totalClases + "; path=/";
      }
      if (idPago) {
        console.log(idPago);
        // Crear cookie con el valor del localStorage
        document.cookie = "idpago=" + idPago + "; path=/";
      }
    }
  }
});