<?php

namespace Drupal\suscriptions_events\EventSubscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Drupal\state_machine\Event\WorkflowTransitionEvent;
use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\InvokeCommand;
use Drupal\user\Entity\User;
use \Drupal\Core\StringTranslation\TranslatableMarkup;
use Drupal\node\Entity\Node;


/**
 * Subscribes to the order place post transition event.
 */
class SuscriptionsEventsEventSubscriber implements EventSubscriberInterface {

  /**
   * {@inheritdoc}
   */
  public static function getSubscribedEvents() {
    return [
      'commerce_order.place.post_transition' => 'onOrderPlace',
    ];
  }

  /**
   * Responds to the order place post transition event.
   *
   * @param \Drupal\state_machine\Event\WorkflowTransitionEvent $event
   *   The workflow transition event.
   */
  public function onOrderPlace(WorkflowTransitionEvent $event) {

    // You can use $event->getEntity() to get the entity. print
    // $event->getToState()->getLabel() to see the state label.
    // You can use $event->getTransition()->getLabel() to see the transition
    // label.
    // You can use $event->getTransition()->getId() to see the transition ID.
    // You can use $event->getFromState()->getLabel() to see the state label.
    // You can use $event->getToState()->getLabel() to see the state label.
    // You can use $event->getTransition()->getToState()->getLabel() to see the
    // state label.

    // Mostrar un mensaje de depuración.
    \Drupal::messenger()->addMessage('Suscripción creada correctamente.');


    // Obtener el id del usuario actual.
    $user = \Drupal::currentUser();
    $user_id = $user->id();
    // obtener roles del usuario.
    $roles = $user->getRoles();
    $director_colegio = in_array('director_colegio', $roles)? true : false;
    \Drupal::messenger()->addMessage('ID del usuario: ' . $user_id);


    if (!$director_colegio) {
      // Mostrar Drupal::messenger() el id de la orden.
      $order = $event->getEntity();
      $order_id = $order->id();
      \Drupal::messenger()->addMessage('ID de la orden: ' . $order_id);
      // Obtener cookie numero de semanas.
      $numerosemanas = isset($_COOKIE['numerosemanas']) ? $_COOKIE['numerosemanas'] : '';
      \Drupal::messenger()->addMessage('Número de semanas: ' . $numerosemanas);

      // Obtener cookie totalclases.
      $totalclases = isset($_COOKIE['totalclases']) ? $_COOKIE['totalclases'] : '';
      \Drupal::messenger()->addMessage('Total de clases: ' . $totalclases);    

      // Borrar las cookies.
      setcookie('numerosemanas', '', time() - 3600, '/');
      setcookie('totalclases', '', time() - 3600, '/');
      // Borrar local storage de la pagina.
      $response = new AjaxResponse();
      $response->addCommand(new InvokeCommand(NULL, 'localStorage.clear'));
      $response->addCommand(new InvokeCommand(NULL, 'location.reload'));
      $this->crearSuscripcion($order_id, $user_id, $numerosemanas, $totalclases);

    } else {

      $order = $event->getEntity();
      $order_id = $order->id();
      \Drupal::messenger()->addMessage('ID de la orden: ' . $order_id);
      // Obtener cookie numero de semanas.
      $numerosemanas = isset($_COOKIE['numerosemanas']) ? $_COOKIE['numerosemanas'] : '';
      \Drupal::messenger()->addMessage('Número de semanas: ' . $numerosemanas);

      // Obtener cookie totalclases.
      $totalclases = isset($_COOKIE['totalclases']) ? $_COOKIE['totalclases'] : '';
      \Drupal::messenger()->addMessage('Total de clases: ' . $totalclases);    

      // Obtener cookie idpago
      $idpago = isset($_COOKIE['idpago']) ? $_COOKIE['idpago'] : '';
      \Drupal::messenger()->addMessage('ID de pago: ' . $idpago);

      // Borrar las cookies.
      setcookie('numerosemanas', '', time() - 3600, '/');
      setcookie('totalclases', '', time() - 3600, '/');
      setcookie('idpago', '', time() - 3600, '/');
      // Borrar local storage de la pagina.
      $response = new AjaxResponse();
      $response->addCommand(new InvokeCommand(NULL, 'localStorage.clear'));
      $response->addCommand(new InvokeCommand(NULL, 'location.reload'));


      // Cargar el nodo que tenga el id de la orden.
      $nodeOrdenPago = Node::load($idpago);

      //get entity reference field value field_colegio_al_que_pertenece_c
      $field_colegio_al_que_pertenece = $nodeOrdenPago->get('field_colegio_al_que_pertenece_c')->getValue();
      $field_colegio_al_que_pertenece = $field_colegio_al_que_pertenece[0]['target_id'];

      // get value of field_nro_de_clases_maxima_por_e
      $field_nro_de_clases_maxima_por_e = $nodeOrdenPago->get('field_nro_de_clases_maxima_por_e')->getValue();
      $field_nro_de_clases_maxima_por_e = $field_nro_de_clases_maxima_por_e[0]['value'];

      $nodeOrdenPago->set('field_pago_procesado', 1);
      $nodeOrdenPago->set('field_orden_de_pagada', 1);
      $nodeOrdenPago->set('field_nro_de_orden', $order_id);
      $nodeOrdenPago->save();

      // buscar todos los usuarios con el rol de padre_escuela y que pertenezcan al colegio seleccionado (field_colegio_al_que_pertenece_c) 
      $query = \Drupal::entityQuery('user')
        ->condition('roles', 'padre_escuela')
        ->condition('field_colegio_al_que_pertenece_e', $field_colegio_al_que_pertenece)
        ->execute();
      $usuarios_padres = User::loadMultiple($query);

      // recorrer los usuarios 
      foreach ($usuarios_padres as $usuario) {
        $usuarios_padres_ids = $usuario->id();
        
        // contar cuantos usuarios hay con rol hijo_escuela que pertenezca al colegio seleccionado (field_colegio_al_que_pertenece_c) 
        // y que field_padre = $usuarios_padres_ids
        $query = \Drupal::entityQuery('user')
          ->condition('roles', 'hijo_escuela')
          ->condition('field_colegio_al_que_pertenece_e', $field_colegio_al_que_pertenece)
          ->condition('field_padre', $usuarios_padres_ids)
          ->execute();
        $numero_hijos = count($query);
        $numero_clases_estudiante = (int)$field_nro_de_clases_maxima_por_e * (int)$numero_hijos;
        $this->crearSuscripcionColegios($usuarios_padres_ids, $numerosemanas, $numero_clases_estudiante, $field_colegio_al_que_pertenece);

        $tipo_suscripcion = '';
        if ($numerosemanas == '4') {
          $tipo_suscripcion = '3';
        } elseif ($numerosemanas == '12') {
          $tipo_suscripcion = '4';
        } elseif ($numerosemanas == '24') {
          $tipo_suscripcion = '5';
        }

        $this->crearSuscripcionNinosEscuelasM($usuarios_padres_ids, $numerosemanas, $field_nro_de_clases_maxima_por_e,$tipo_suscripcion);
      }

    }
  }

  /* 
    Funcion para Crear un nodo de tipo suscripciones. 
  */
  public function crearSuscripcion($order_id, $user_id, $numerosemanas, $totalclases) {
    $fecha_actual = date("Y-m-d");
    // Total de clases transformar a entero.
    $totalclases = (int)$totalclases;

    // Obtener fecha de finalizacion de la suscripcion.
    $fecha_finalizacion = date("Y-m-d", strtotime($fecha_actual . "+ $numerosemanas week"));

    // Crear nodo de tipo suscripciones.
    $node = \Drupal::entityTypeManager()->getStorage('node')->create([
      'type' => 'suscripciones',
      'title' => 'Suscripción de ' . $user_id,
      'field_clases_compradas' => $totalclases,
      'field_clases_restantes' => $totalclases,
      'field_clases_usadas' => 0,
      'field_fecha_de_finalizacion_de_l' => $fecha_finalizacion,
      'field_fecha_de_inicio_de_la_susc' => $fecha_actual,
      'field_nro_de_orden' => $order_id,
      'field_plan_comprado' => $numerosemanas,
      'field_usuario_padre' => $user_id,
    ]);
    $node->save();

    // Load user by id.
    $user = \Drupal\user\Entity\User::load($user_id);
    // add true to field_suscripcion_activa and save.
    $user->field_suscripcion_activa->value = true;
    $user->save();    
  }

  /* 
    Funcion para Crear un nodo de tipo suscripciones. 
  */
  public function crearSuscripcionColegios($user_id, $numerosemanas, $numero_clases_estudiante,$colegio_al_que_pertenece) {
    $fecha_actual = date("Y-m-d");
    // Total de clases transformar a entero.
    $totalclases = (int)$numero_clases_estudiante;

    // Obtener fecha de finalizacion de la suscripcion.
    $fecha_finalizacion = date("Y-m-d", strtotime($fecha_actual . "+ $numerosemanas week"));

    // Crear nodo de tipo suscripciones.
    $node = \Drupal::entityTypeManager()->getStorage('node')->create([
      'type' => 'suscripciones',
      'title' => 'Suscripción de padre de escuela' . $user_id,
      'field_clases_compradas' => $totalclases,
      'field_clases_restantes' => $totalclases,
      'field_clases_usadas' => 0,
      'field_fecha_de_finalizacion_de_l' => $fecha_finalizacion,
      'field_fecha_de_inicio_de_la_susc' => $fecha_actual,
      'field_plan_comprado' => $numerosemanas,
      'field_suscripcion_padre_de_escue' => true,
      'field_usuario_padre' => $user_id,
      'field_colegio_al_que_pertenece_c' => $colegio_al_que_pertenece,

    ]);
    $node->save();

    // Load user by id.
    $user = \Drupal\user\Entity\User::load($user_id);
    // add true to field_suscripcion_activa and save.
    $user->field_suscripcion_activa->value = true;
    $user->save();
  }

  /* 
    Funcion para Crear un nodo de tipo suscripciones_ninos_escuelas. 
    $user_id: id del usuario padre de escuela.
    $numerosemanas: numero de semanas de la suscripcion.
    $totalclases: total de clases a asignar al niño.
*/
public function crearSuscripcionNinosEscuelasM($user_id, $numerosemanas, $totalclases, $field_tipo_de_suscripcion) {
  $fecha_actual = date("Y-m-d");
  // Total de clases transformar a entero.
  $totalclases = (int)$totalclases;

  // Obtener fecha de finalizacion de la suscripcion.
  $fecha_finalizacion = date("Y-m-d", strtotime($fecha_actual . "+ $numerosemanas week"));

  // buscar los usuarios con el rol hijo_escuela que tengan el campo field_padre = $user_id
  $query = \Drupal::entityQuery('user')
    ->condition('roles', 'hijo_escuela')
    ->condition('field_padre', $user_id)
    ->execute();
  $usuarios_hijos = User::loadMultiple($query);

  if ($usuarios_hijos) {
    foreach ($usuarios_hijos as $usuario) {
      $usuario_id = $usuario->id();
      // Crear nodo de tipo suscripciones_ninos_escuelas.
      $node = \Drupal::entityTypeManager()->getStorage('node')->create([
        'type' => 'suscripciones_ninos_escuelas',
        'title' => 'Suscripción de niño de escuela ' . $usuario_id,
        'field_clases_asignadas_en_la_sus' => $totalclases,
        'field_clases_restantes_de_la_sus' => $totalclases,
        'field_clases_consumidas_de_la_su' => 0,
        'field_inasistencias_del_nino' => 0,
        'field_fecha_de_finalizacion_de_l' => $fecha_finalizacion,
        'field_fecha_de_inicio_de_la_susc' => $fecha_actual,
        'field_tipo_de_suscripcion' => $field_tipo_de_suscripcion,
        'field_suscripcion_finalizada	' => false,
        'field_alumno_relacionado' => $usuario_id,
        'uid' => $user_id,
      ]);
      $node->save();
    }
  }
}

}