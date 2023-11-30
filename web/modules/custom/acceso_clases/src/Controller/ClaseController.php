<?php

namespace Drupal\acceso_clases\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\HtmlCommand;
use Drupal\node\Entity\Node;
use Symfony\Component\HttpFoundation\Request;


class ClaseController extends ControllerBase {
  public function contenidoClase(Request $request) {
    //$url_param = $request->query->get('url');
    // Supongamos que esta es la URL que deseas pasar al iframe
    //$url_completa = "https://staging.pencilapp.com?loginMethod=token&loginType=api&token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTcwMDI0NTIzMywiZXhwIjoxNzAwMjQ4ODMzLCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay16aDJhcEBwZW5jaWwtZnJvbnRlbmQtc3RhZ2luZy5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInN1YiI6ImZpcmViYXNlLWFkbWluc2RrLXpoMmFwQHBlbmNpbC1mcm9udGVuZC1zdGFnaW5nLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwidWlkIjoiNjU1N2FlZDY4MTFjNGQyZTY1NTcwYjZlIn0.QnC-v96iCMYWfsiBMMvMYwshWF4HxTfAaiagHg4iJ1husXbPKyyQue44VnPZvxOrJTkri4hUZ3FmKhzIbq0ulqtOdw3KsLQVnuBt8L8PXj_dHFroSaDGyf1zjxv7BU3iWpC2KgDW7avyuRMhMDEuqaKvJJmvZ6Z9e_itEJuQULIgcc_uITm_SJJLbfT7Mfu1q_CQs6rqdZoP_4_0QDCtJ-lUGBVrH3LEa5MiD6YLcJlZkwPTajilTBKxTRpVUfOudup1cFdZi8Sm9Cl0RQ3l4NmriKQD8O1Wh71zQdEztPx5haiej111xImMKl2VssJhslihnQVyiRUVKiLz-dZhLA&continueUrl=spaces/6557aef1811c4d2e65570b6f";

    // $url_loginType = $request->query->get('loginType');
    // $url_loginMethod = $request->query->get('loginMethod');
    // $url_token = $request->query->get('token');
    // $url_continueUrl = $request->query->get('continueUrl');

    $field_pencil_id_estudiante = $request->query->get('idestudiante');
    $space_lync_url = $request->query->get('url');

    $token_estudiante = api_pencil_connect_authorize_user($field_pencil_id_estudiante,$space_lync_url);
    $url_completa = $token_estudiante;
    // Codifica la URL para su uso en un parámetro de consulta

    //$url_completa = "https://staging.pencilapp.com?loginMethod=" . $url_loginMethod . "&loginType=" . $url_loginType . "&token=" . $url_token . "&continueUrl=" . $url_continueUrl;

    // Asegúrese de validar y desinfectar la URL aquí.
    //$url = $url_param; //filter_var($url_param, FILTER_SANITIZE_URL);
    $url = urldecode($url_completa);

    // Servir de manera predeterminada un mensaje o una URL por defecto si es necesario.
    // if (!filter_var($url, FILTER_VALIDATE_URL)) {
    //   $url = ''; // O establecer una URL por defecto o presentar un mensaje de error adecuado.
    // }

    //Obtener el rol del usuario
    $user = \Drupal\user\Entity\User::load(\Drupal::currentUser()->id());
    $roles = $user->getRoles();
    // buscar el rol de hijo o padre    
    $rol_buscar_hijo = in_array('hijo', $roles);
    $rol_buscar_padre = in_array('padre', $roles);
    $rol_actual = $rol_buscar_hijo || $rol_buscar_padre;
    // comprobar si el usuario tiene el rol de hijo
    if ($rol_actual) {
      return [
        '#theme' => 'clase-page',
        '#url' => $url,
        '#rol' => 'hijo',
        '#cache' => ['max-age' => 0], // Deshabilitar caching para este contenido dinámico.
        '#attached' => [
          'library' => [
            'acceso_clases/acceso-clases-js', // Asegúrate de que esto coincida con el nombre de la biblioteca definida en tu .libraries.yml
          ],
        ],
      ];
    } else {
      return [
        '#theme' => 'clase-page',
        '#url' => $url,
        '#rol' => 'otro',
        '#cache' => ['max-age' => 0], // Deshabilitar caching para este contenido dinámico.
        '#attached' => [
          'library' => [
            'acceso_clases/acceso-clases-js', // Asegúrate de que esto coincida con el nombre de la biblioteca definida en tu .libraries.yml
          ],
        ],
      ];
    }
  }

  // function consultaClase
  function consultaClase(Request $request) {
    $response = new AjaxResponse();
    $idClase = $request->query->get('idClase');
    if ($request->isXmlHttpRequest()) {      
      $node = Node::load($idClase);
    }
    return $response;
  }
}

function buscar_id_estudiante() {

}

function generar_enlace_estudiante() {

}
