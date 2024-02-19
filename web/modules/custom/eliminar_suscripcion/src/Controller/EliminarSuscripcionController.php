<?php

namespace Drupal\eliminar_suscripcion\Controller;

use Drupal\Core\Controller\ControllerBase;

class EliminarSuscripcionController extends ControllerBase {
  public function showForm() {
    // get current language
    $language = \Drupal::languageManager()->getCurrentLanguage()->getId();
    return [
      '#theme' => 'eliminar-suscripcion',
      '#language' => $language,
      '#cache' => ['max-age' => 0], // Deshabilitar caching para este contenido dinámico.
    ];
  }
}