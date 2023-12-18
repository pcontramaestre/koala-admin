<?php

namespace Drupal\suscriptions_events\EventSubscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Drupal\state_machine\Event\WorkflowTransitionEvent;
use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\InvokeCommand;

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
    // Implementa tu lógica personalizada aquí.
    // @todo Write code that will run when the subscribed event fires.
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

    // Mostrar Drupal::messenger() el id de la orden.
    $order = $event->getEntity();
    $order_id = $order->id();
    \Drupal::messenger()->addMessage('ID de la orden: ' . $order_id);

    // Obtener el id del usuario actual.
    $user = \Drupal::currentUser();
    $user_id = $user->id();
    \Drupal::messenger()->addMessage('ID del usuario: ' . $user_id);

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


    /* Crear un nodo de tipo suscripciones. 
      Campos:
      field_clases_compradas = $totalclases
      field_clases_restantes = $totalclases
      field_clases_usadas = 0
      field_fecha_de_finalizacion_de_l = ( si $numerosemanas = 4 es un mes, si $numerosemanas = 12 es tres meses, si $numerosemanas = 24 es seis meses)
      field_fecha_de_inicio_de_la_susc = fecha actual
      field_nro_de_orden = $order_id (Entidad relacionada)
      field_plan_comprado = $numerosemanas
      field_usuario_padre = $user_id (Entidad relacionada)
    */
    $this->crearSuscripcion($order_id, $user_id, $numerosemanas, $totalclases);

  }


     /* Funcion para Crear un nodo de tipo suscripciones. 
      Campos:
      field_clases_compradas = $totalclases
      field_clases_restantes = $totalclases
      field_clases_usadas = 0
      field_fecha_de_finalizacion_de_l = ( si $numerosemanas = 4 es un mes, si $numerosemanas = 12 es tres meses, si $numerosemanas = 24 es seis meses)
      field_fecha_de_inicio_de_la_susc = fecha actual
      field_nro_de_orden = $order_id (Entidad relacionada)
      field_plan_comprado = $numerosemanas
      field_usuario_padre = $user_id (Entidad relacionada)
    */
  public function crearSuscripcion($order_id, $user_id, $numerosemanas, $totalclases) {
    // Obtener fecha actual.
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
}