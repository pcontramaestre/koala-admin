<?php

namespace Drupal\acceso_clases\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\Request;

class ClaseController extends ControllerBase {
  public function contenidoClase(Request $request) {
    $url_param = $request->query->get('url');
    
    // Asegúrese de validar y desinfectar la URL aquí.
    //$url = $url_param; //filter_var($url_param, FILTER_SANITIZE_URL);
    $url = urldecode($url_param);

    // Servir de manera predeterminada un mensaje o una URL por defecto si es necesario.
    // if (!filter_var($url, FILTER_VALIDATE_URL)) {
    //   $url = ''; // O establecer una URL por defecto o presentar un mensaje de error adecuado.
    // }

    return [
      '#theme' => 'clase-page',
      '#url' => $url,
      '#cache' => ['max-age' => 0], // Deshabilitar caching para este contenido dinámico.
    ];
  }
}