<?php

namespace Drupal\enviar_estrellas\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Drupal\Core\Session\AccountInterface;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Drupal\node\Entity\Node;

class EstrellaController extends ControllerBase {
  
  public function enviar(Request $request, AccountInterface $user) {
    // Asegurar los permisos y validar la entrada
    if (!$user->hasPermission('enviar estrella')) {
      throw new AccessDeniedHttpException();
    }

    $data = json_decode($request->getContent(), TRUE);
    $idClase = $data['idClase'] ?? NULL;
    $maxEstrellas = 10;

    if ($idClase) {
      // Cargar el nodo y verificar que existe.
      $node = Node::load($idClase);
      if ($node && $node->bundle() === 'agendar_clase') {
        // Verificar que el campo existe y es del tipo esperado.
        if ($node->hasField('field_estrellas_obtenidas')) {
          $estrellasActuales = (int) $node->get('field_estrellas_obtenidas')->value;
          // Comprobar si ya se alcanzó el número máximo de estrellas.
          if ($estrellasActuales < $maxEstrellas) {
            // Incrementar el número de estrellas y guardar el nodo.
            $node->set('field_estrellas_obtenidas', min($estrellasActuales + 1, $maxEstrellas));
            $node->save();

            return new JsonResponse(['success' => TRUE, 'message' => 'Estrella agregada correctamente a clase ' . $idClase]);
          } else {
            // Ya se han agregado el máximo de estrellas permitidas.
            return new JsonResponse(['success' => FALSE, 'message' => 'Se ha alcanzado el número máximo de estrellas para esta clase.']);
          }
        } else {
          return new JsonResponse(['success' => FALSE, 'message' => 'El nodo no tiene el campo de estrellas.']);
        }
      } else {
        return new JsonResponse(['success' => FALSE, 'message' => 'No se encontró un nodo con el ID proporcionado o no es del tipo correcto.']);
      }
    } else {
      return new JsonResponse(['success' => FALSE, 'message' => 'ID de clase no proporcionado.']);
    }
  }
}