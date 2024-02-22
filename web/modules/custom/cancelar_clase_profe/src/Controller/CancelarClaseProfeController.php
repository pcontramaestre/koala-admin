<?php

namespace Drupal\cancelar_clase_profe\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Drupal\Core\Messenger\MessengerInterface;

class CancelarClaseProfeController extends ControllerBase {

  public function cancelarClase(Request $request) {
    // Obtener el parámetro 'id_clase'
    $idClase = $request->query->get('id_clase');

    $valor = array();

    // Verificar si el profesor tiene permiso para cancelar la clase
    $valor = $this->verificarProfesor($idClase);

    // Lógica para mostrar la información inicial y el botón de confirmación
    // Aquí podrías usar un render array o cargar directamente una plantilla Twig.

    return [
      '#theme' => 'cancelar-clase',
      '#valores' => $valor,
      //Eliminar el cache de la página
      '#cache' => [
        'max-age' => 0,
      ],
    ];
  }

  public function confirmarCancelacion(Request $request) {
    // Obtener el parámetro 'id_clase'
    $idClase = $request->query->get('id_clase');

    $valor = array();
    $valor = $this->verificarProfesor($idClase, 'eliminar');

    // Lógica para cancelar la clase
    // Aquí podrías usar un render array o cargar directamente una plantilla Twig.

    return [
      '#theme' => 'cancelar-clase-confirmacion',
      '#valores' => $valor,
      // Otros parámetros necesarios para tu plantilla
    ];
  }



  /**
   * Verifica si el profesor tiene permiso para cancelar una clase.
   *
   * @param int $idClase El ID de la clase a verificar.
   * @param string $tipo (opcional) El tipo de verificación a realizar.
   * @return bool Retorna true si el profesor tiene permiso, de lo contrario retorna false.
   */
  protected function verificarProfesor($idClase, $tipo = '') {
    
    
    if ($idClase) {
        // Obtener el usuario actual
      $current_user = \Drupal::currentUser();
      $user_id = $current_user->id();
      //get field_nombres_y_apellidos_del_pr from the user
      $user = \Drupal\user\Entity\User::load($user_id);
      $nombre_profesor = $user->get('field_nombres_y_apellidos_del_pr')->getValue();
      $nombre_profesor = $nombre_profesor[0]['value'];
      
      if ($tipo == ''){
        
        //Abrir el nodo de la clase $idClase y obtener el valor del campo referenciado field_asignar_profesor
        $node = \Drupal\node\Entity\Node::load($idClase);
        $profesor = $node->get('field_asignar_profesor')->getValue();
        $profesor = $profesor[0]['target_id'];

        // Obtener el valor de tipo fecha del campo field_fecha_cita_oculta
        $fecha = $node->get('field_fecha_cita_oculta')->getValue();
        $fecha = $fecha[0]['value'];

        $fecha_mostrar = date('d-m-Y H:i:s', strtotime($fecha));


        //$fecha se devuelve en formato 2024-02-23T13:00:00, necesito verificar si la fecha es mayor a la actual, tambien necesito verificar si la fecha es mayor a 24 horas de la actual.
        $fecha_actual = date('Y-m-d H:i:s');
        $fecha_actual = strtotime($fecha_actual);
        $fecha = strtotime($fecha);
        $diferencia = $fecha - $fecha_actual;
        $diferencia = $diferencia / 3600;

        if ($user_id == $profesor) {
          $permitido = true;
        } else {
          $permitido = false;
        }
        $arregloenviar = array(
          'id_clase' => $idClase,
          'profesor' => $profesor,
          'fecha' => $fecha_mostrar,
          'diferencia' => $diferencia,
          'permitido' => $permitido,
          'nombre_profesor' => $nombre_profesor,
        );
        return $arregloenviar;
      } else {
        //Eliminar del nodo de la clase $idClase, si el profesor tiene permiso, elimina al profesor de la clase.
        $node = \Drupal\node\Entity\Node::load($idClase);
        $profesor = $node->get('field_asignar_profesor')->getValue();
        $profesor = $profesor[0]['target_id'];
        if ($user_id == $profesor) {
          $node->field_asignar_profesor->setValue(NULL);
          $success = $node->save();
          if ($success) {
            $arregloenviar = array(
              'id_clase' => $idClase,
              'profesor' => $profesor,
              'nombre_profesor' => $nombre_profesor,
              'mensaje' => 'La clase ha sido cancelada exitosamente.',
              'eliminado' => true,
            );
            return $arregloenviar;
          } else {
            $arregloenviar = array(
              'id_clase' => $idClase,
              'profesor' => $profesor,
              'nombre_profesor' => $nombre_profesor,
              'mensaje' => 'No se pudo cancelar la clase.',
              'eliminado' => false,
            );
            return $arregloenviar;
          }
        } else {
          $arregloenviar = array(
            'id_clase' => 0,
            'profesor' => 0,
            'nombre_profesor' => '',
            'mensaje' => 'No tienes permiso para cancelar esta clase.',
          );
          return $arregloenviar;
        }
      }
    } else {
      $arregloenviar = array(
        'id_clase' => 0,
        'profesor' => 0,
        'fecha' => 0,
        'diferencia' => 0,
        'permitido' => false,
        'nombre_profesor' => '',
      );
    }     
  }
}