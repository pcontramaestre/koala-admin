<?php

namespace Drupal\clases_profesores\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\HtmlCommand;
use Drupal\node\Entity\Node;
use Drupal\Core\Ajax\MessageCommand;
// funcion api_pencil_connect_authorize_user esta en un modulo custom llamado api_pencil_connect


class ClasesProfesoresController extends ControllerBase {
  
  public function content(Request $request) {
    // Obtiene el parámetro URL desde la consulta GET
    $url = $request->query->get('url');
    $idClase = $request->query->get('idClase');
    $field_pencil_id_profesor = $request->query->get('idprofesor');
    $space_lync_url = $request->query->get('url');
    $token_estudiante = api_pencil_connect_authorize_user($field_pencil_id_profesor,$space_lync_url);
    $url_completa = $token_estudiante;

    //Validar que el usuario logueado sea el profesor de la clase y tenga permisos, el id de la clase sea la del usuario logueado.

    // Validar la URL. Por ejemplo, podrías asegurarte de que es una URL válida.
    // if (!$this->isValidURL($url)) {
    //   throw new AccessDeniedHttpException('URL no válida.');
    // }
    //dump($url);
    //dump($idClase);

    // Convertir $idClase a entero
    $idClase = (int) $idClase;
    $url = urldecode($url_completa);

    return [
      '#theme' => 'clases-profesores',
      '#url' => $url,
      '#idClase' => $idClase,
      '#attached' => [
        'library' => [
          'clases_profesores/clases-profesores',
        ],
      ],
    ];
  }

  public function asignarEstrella(Request $request) {
    $idClase = $request->request->get('idClase');

    //Hay que chekear que el id de la clase sea la del usuario logueado, tenga permisos

    // Resto del código para buscar el nodo y sumar 1 a 'field_estrellas_obtenidas' aquí ...

    // Crear una respuesta Ajax
    $response = new AjaxResponse();

    // Lógica para buscar el nodo y sumar la estrella.
    $node = Node::load($idClase);
    if ($node && $node->bundle() === 'agendar_clase' && $node->hasField('field_estrellas_obtenidas')) {
      $estrellasActuales = (int) $node->get('field_estrellas_obtenidas')->value;
      
      // if estrellasActuales es igual a vacio o null, entonces asignar 0
      if ($estrellasActuales === 0 || $estrellasActuales === null || $estrellasActuales === '') {
        $node->set('field_estrellas_obtenidas', 1);
        $node->save();
        $response->addCommand(new HtmlCommand('#selector-para-mensajes', 'Estrellas enviadas: 1 de 10'));
      } else {

        if ($estrellasActuales < 10) {
          $node->set('field_estrellas_obtenidas', $estrellasActuales + 1);
          $node->save();
          $response->addCommand(new HtmlCommand('#selector-para-mensajes', 'Estrellas enviadas: ' . ($estrellasActuales + 1). ' de 10'));
        } else {
          $message = 'No se pueden asignar más de 10 estrellas.';
          $this->messenger()->addMessage($this->t($message));
          //drupal_set_message($message, 'error');
          $response->addCommand(new HtmlCommand('#selector-para-mensajes', $message));
        }
      }
    } else {
      $response->addCommand(new HtmlCommand('#selector-para-mensajes', 'No se pudo encontrar la clase o el nodo no tiene el campo requerido.'));
    }
      
    return $response;
  }

  public function activarClase(Request $request) {
    $idClase = $request->request->get('idClase');

    //Hay que chekear que el id de la clase sea la del usuario logueado, tenga permisos
    // Crear una respuesta Ajax
    $response = new AjaxResponse();

    // Lógica para buscar el nodo y sumar la estrella.
    $node = Node::load($idClase);

    if ($node && $node->bundle() === 'agendar_clase') {
      // save field_clase_activa field type boolean
      $node->set('field_clase_activa', "1");
      // $node->save();
      
      if ($node->save()) {
        //$response->addCommand(new HtmlCommand('#selector-para-mensajes', 'Clase activada'));
        $message = 'Clase activada con éxito.';
        //$this->messenger()->addMessage($this->t($message));
        $response->addCommand(new MessageCommand($message, NULL, ['type' => 'status']));

      } else {
        //$response->addCommand(new HtmlCommand('#selector-para-mensajes', 'No se pudo activar la clase'));
        $message = 'No se pudo activar la clase.';
        //$this->messenger()->addMessage($this->t($message));
        $response->addCommand(new MessageCommand($message, NULL, ['type' => 'status']));
      }
    } else {
      $response->addCommand(new HtmlCommand('#selector-para-mensajes', 'No se pudo encontrar la clase o el nodo no tiene el campo requerido.'));
    }
    return $response;
  }

  public function desactivarClase(Request $request) {
    $idClase = $request->request->get('idClase');

    //Hay que chekear que el id de la clase sea la del usuario logueado, tenga permisos
    // Crear una respuesta Ajax
    $response = new AjaxResponse();

    // Lógica para buscar el nodo y sumar la estrella.
    $node = Node::load($idClase);

    if ($node && $node->bundle() === 'agendar_clase') {
      // save field_clase_activa field type boolean
      $node->set('field_clase_activa', "2");
      //$node->save();
      // Comprobamos que se ha guardado correctamente
      if ($node->save()) {
        $response->addCommand(new HtmlCommand('#selector-para-mensajes', 'Clase desactivada'));
        $message = 'Clase desactivada con éxito.';
        $this->messenger()->addMessage($this->t($message));
        
      } else {
        $response->addCommand(new HtmlCommand('#selector-para-mensajes', 'No se pudo desactivar la clase'));
        $message = 'No se pudo desactivar la clase.';
        $this->messenger()->addMessage($this->t($message));
      }
    } else {
      $response->addCommand(new HtmlCommand('#selector-para-mensajes', 'No se pudo encontrar la clase o el nodo no tiene el campo requerido.'));
    }
    return $response;
  }

  public function consultarClaseActiva(Request $request) {
    $idClase = $request->request->get('idClase');

    //Hay que chekear que el id de la clase sea la del usuario logueado, tenga permisos
    // Crear una respuesta Ajax
    $response = new AjaxResponse();

    // Lógica para buscar el nodo y sumar la estrella.
    $node = Node::load($idClase);

    if ($node && $node->bundle() === 'agendar_clase') {
      // save field_clase_activa field type boolean
      $clase_activa = $node->get('field_clase_activa')->value;
      //$node->save();
      // Comprobamos que se ha guardado correctamente

      //Clase activa son 0, 1 y 2
      if ($clase_activa === '0') {
        $response->addCommand(new HtmlCommand('#respuesta', '0'));
      } else if ($clase_activa === '1') {
        $response->addCommand(new HtmlCommand('#respuesta', '1'));
      } else if ($clase_activa === '2') {
        $response->addCommand(new HtmlCommand('#respuesta', '2'));
      } else {
        $response->addCommand(new HtmlCommand('#respuesta', 'No se pudo consultar la clase'));
      }
    } else {
      $response->addCommand(new HtmlCommand('#selector-para-mensajes', 'No se pudo encontrar la clase o el nodo no tiene el campo requerido.'));
    }
    return $response;
  }

  private function isValidURL($url) {
    // Implementa una lógica que valide la URL aquí. Por ejemplo:
    return filter_var($url, FILTER_VALIDATE_URL);
  }
}