<?php

namespace Drupal\eliminar_usuario\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\Request;

class EliminarUsuarioController extends ControllerBase {

  public function showForm() {
    // get current language
    $language = \Drupal::languageManager()->getCurrentLanguage()->getId();
    return [
      '#theme' => 'eliminar-usuario',
      '#language' => $language,
      '#cache' => ['max-age' => 0], // Deshabilitar caching para este contenido dinámico.
    ];
  }

  public function usuarioEliminado() {
    $current_user = \Drupal::currentUser();
    $user_roles = $current_user->getRoles();
    
    // Verificar si el rol del usuario actual incluye "padre"
    if(in_array('padre', $user_roles)) {
      $user_id = $current_user->id();
      
      // Buscar todos los usuarios cuyo campo `field_padre` tiene el ID del usuario actual
      $usuarios_hijos = \Drupal::entityTypeManager()
        ->getStorage('user')
        ->loadByProperties(['field_padre' => $user_id]);
        
      // ... Tu lógica para manejar los usuarios hijos...

      // Buscar en el tipo de contenido suscripciones que tenga el campo field_usuario_padre con el id del usuario actual
      $query = \Drupal::entityQuery('node')
      ->condition('type', 'suscripciones')
      ->condition('field_usuario_padre', $user_id);
      
      $nids = $query->execute();
      $suscripciones = \Drupal\node\Entity\Node::loadMultiple($nids);
  
      
      
      // Renderizar la respuesta utilizando una plantilla Twig
      return [
        '#theme' => 'usuario-eliminado',
        // Pasar variables a la plantilla Twig si es necesario.
        '#usuarios_hijos' => $usuarios_hijos,
        '#suscripciones' => $suscripciones,
      ];
    }
  
    // Opcional: Manejar el caso de que el usuario no tenga el rol "padre"
    return [
      '#type' => 'markup',
      '#markup' => $this->t('No tienes permisos para acceder a esta página.'),
    ];
  }
}