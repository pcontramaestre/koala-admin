<?php

namespace Drupal\eliminar_usuario\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\Request;
use Drupal\user\Entity\User;
use Drupal\Core\Session\AccountInterface;


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
      
      // // Buscar todos los usuarios cuyo campo `field_padre` tiene el ID del usuario actual
      // $usuarios_hijos = \Drupal::entityTypeManager()
      //   ->getStorage('user')
      //   ->loadByProperties(['field_padre' => $user_id]);
        
      // // ... Tu lógica para manejar los usuarios hijos...

      // // Buscar en el tipo de contenido suscripciones que tenga el campo field_usuario_padre con el id del usuario actual
      // $query = \Drupal::entityQuery('node')
      // ->condition('type', 'suscripciones')
      // ->condition('field_usuario_padre', $user_id);
      
      // $nids = $query->execute();
      // $suscripciones = \Drupal\node\Entity\Node::loadMultiple($nids);
  
      
      // // Buscar en el tipo de contenido agendar_clase que tenga el uid del usuario actual
      // $query = \Drupal::entityQuery('node')
      // ->condition('type', 'agendar_clase')
      // ->condition('uid', $user_id);

      // $nids = $query->execute();
      // $agendar_clase = \Drupal\node\Entity\Node::loadMultiple($nids);

      // // Buscar en el tipo de contenido asignar_clase_a_estudiante el uid del usuario actual
      // $query = \Drupal::entityQuery('node')
      // ->condition('type', 'asignar_clase_a_estudiante')
      // ->condition('uid', $user_id);

      // $nids = $query->execute();
      // $asignar_clase_a_estudiante = \Drupal\node\Entity\Node::loadMultiple($nids);

      $transactions = [];
    
      // Eliminar nodos de $asignar_clase_a_estudiante
      $this->eliminarNodosPorTipo($user_id, 'asignar_clase_a_estudiante');

      // Eliminar nodos de $agendar_clase
      $this->eliminarNodosPorTipo($user_id, 'agendar_clase');
      
      // Eliminar nodos de $suscripciones
      $this->eliminarNodosPorTipo($user_id, 'suscripciones');
      
      // Eliminar $usuarios_hijos
      $usuarios_hijos = \Drupal::entityTypeManager()->getStorage('user')->loadByProperties(['field_padre' => $user_id]);
      foreach ($usuarios_hijos as $hijo) {
        $hijo->delete();
      }
      
      // Eliminar $current_user
      $user_to_delete = \Drupal\user\Entity\User::load($user_id);
      if ($user_to_delete) {
        $user_to_delete->delete();
      }
      
      // Cerrar sesión después de eliminar el usuario actual
      user_logout();
      
      // Renderizar la respuesta utilizando una plantilla Twig
      $language = \Drupal::languageManager()->getCurrentLanguage()->getId();
      return [
        '#theme' => 'usuario-eliminado',
        '#language' => $language,
        // Pasar variables a la plantilla Twig si es necesario.
        // '#usuarios_hijos' => $usuarios_hijos,
        // '#suscripciones' => $suscripciones,
        // '#agendar_clase' => $agendar_clase,
        // '#asignar_clase_a_estudiante' => $asignar_clase_a_estudiante,
      ];
    }
  
    // Opcional: Manejar el caso de que el usuario no tenga el rol "padre"
    return [
      '#type' => 'markup',
      '#markup' => $this->t('No tienes permisos para acceder a esta página.'),
    ];
  }

  /**
   * Función auxiliar para eliminar nodos de un tipo específico asociados al usuario.
   *
   * @param integer $user_id ID del usuario.
   * @param string $tipo Tipo de nodo a eliminar.
   */
  protected function eliminarNodosPorTipo($user_id, $tipo) {
    $query = \Drupal::entityQuery('node')->condition('type', $tipo)->condition('uid', $user_id);
    $nids = $query->execute();
    $nodos = \Drupal\node\Entity\Node::loadMultiple($nids);
    foreach ($nodos as $nodo) {
      $nodo->delete();
    }
  }
}