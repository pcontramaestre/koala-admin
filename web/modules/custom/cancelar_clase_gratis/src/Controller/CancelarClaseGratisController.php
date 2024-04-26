<?php

namespace Drupal\cancelar_clase_gratis\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\Request;
use Drupal\Core\StringTranslation\TranslatableMarkup;
use Symfony\Component\HttpFoundation\RedirectResponse;

/**
 * Define el controlador para el módulo cancelar_clase_gratis.
 */
class CancelarClaseGratisController extends ControllerBase {
  
    /**
    * Muestra el mensaje de cancelación de clase gratis.
    *
    * @return array
    *   Devuelve un array con el mensaje de cancelación de clase gratis.
    */
    public function cancelarClaseGratis(Request $request) {     
      $id_estudiante = $request->get('id_estudiante');
      $id_clase = $request->get('id_clase');
      $current_user = \Drupal::currentUser();
      $id_user = $current_user->id();
      //current language
      $language = \Drupal::languageManager()->getCurrentLanguage()->getId();
      // Load user by id
      $user = \Drupal\user\Entity\User::load($id_estudiante);
      // get field_padre      
      $field_padre = $user->get('field_padre')->target_id;
      
      if ($id_user != $field_padre) {
        return [
          // Mostrar un mensaje de error en html
          '#markup' => '<div class="alert alert-danger" role="alert">No tienes permisos para cancelar la clase</div>',
        ];
      } else {
        $titulo = new TranslatableMarkup('Reagendar clase gratis');
        $mensaje = new TranslatableMarkup('¿Estás seguro de reagendar la clase gratis?');
        $mensaje2 = new TranslatableMarkup('Si reagendas la clase, se cancelará la clase actual y se asignará una nueva clase gratis. Se le solicitarán nuevamente los datos del niño');
        $texto_enlace_si = new TranslatableMarkup('Reagendar clase');
        $texto_enlace_no = new TranslatableMarkup('Regresar');

        $valor = [
          'id_estudiante' => $id_estudiante,
          'id_clase' => $id_clase,
        ];

        $html = '<div class="cancelar-clase">';
        $html .= '<h2>'.$titulo.'</h2>';
        $html .= '<p class="text-center">'.$mensaje2.'</p>';
        if ($language == 'es'){
          $html .= '<div class="acciones d-flex"><a href="/cancelar-clase-gratis/' . $valor['id_estudiante'] . '/' . $valor['id_clase'] . '/confirmar" class="btn-cancelar">'.$texto_enlace_si.'</a>';
          $html .= '<a href="/padres/mi-calendario" class="btn-volver">'.$texto_enlace_no.'</a></div>';
        } else {
          $html .= '<div class="acciones d-flex"><a href="/en/cancelar-clase-gratis/' . $valor['id_estudiante'] . '/' . $valor['id_clase'] . '/confirmar" class="btn-cancelar">'.$texto_enlace_si.'</a>';
          $html .= '<a href="/en/padres/mi-calendario" class="btn-volver">'.$texto_enlace_no.'</a></div>';
        }
        $html .= '</div>';
        // Mostrar html con el mensaje "¿Estás seguro de cancelar la clase gratis?"
        return [
          '#markup' => $html,
        ];
        // return [
        //   '#theme' => 'cancelar-clase',
        //   // '#valores' => $valor,
        //   //Eliminar el cache de la página
        //   '#cache' => [
        //     'max-age' => 0,
        //   ],
        // ];
      }
    }

    public function cancelarClaseGratisConfirmar(Request $request) {
      $id_estudiante = $request->get('id_estudiante');
      $id_clase = $request->get('id_clase');
      $current_user = \Drupal::currentUser();
      $id_user = $current_user->id();
      // Load user by id
      $user = \Drupal\user\Entity\User::load($id_estudiante);
      // get field_padre      
      $field_padre = $user->get('field_padre')->target_id;
      
      if ($id_user != $field_padre) {
        $nodo_clase = \Drupal\node\Entity\Node::load($id_clase);
        // get field_alumno_relacionado from the referenced node
        $field_alumno_relacionado = $nodo_clase->get('field_alumno_relacionado')->target_id;
        return [
          // Mostrar un mensaje de error en html
          '#markup' => '<div class="alert alert-danger" role="alert">No tienes permisos para cancelar la clase</div>',
        ];
      } else { 
        $nodo_clase = \Drupal\node\Entity\Node::load($id_clase);
        $field_alumno_relacionado = $nodo_clase->get('field_alumno_relacionado')->target_id;

        // Lógica para cancelar la clase, primero validamos que la clase pertenezca al estudiante
        if ($field_alumno_relacionado != $id_estudiante) {
          return [
            // Mostrar un mensaje de error en html
            '#markup' => '<div class="alert alert-danger" role="alert">No tienes permisos para cancelar la clase</div>',
          ];
        } else {
          // Borramos nodo agendar_clase
          $nodo_clase->delete();
          /*
          *  Borramos 
          * (proximas_clases_estudiantes_,field_alumno_relacionado)
          * (crear_hijos,field_hijo_relacionado)
          * (koala_ninos, field_hijo_relacionado)
          * (asignar_clase_a_estudiante, field_alumno_relacionado)
          */
          $nids = \Drupal::entityQuery('node')
            ->condition('type', 'proximas_clases_estudiantes_')
            ->condition('field_alumno_relacionado', $id_estudiante)
            ->execute();
          $nodos = \Drupal\node\Entity\Node::loadMultiple($nids);
          $nodo_proxima_clase = reset($nodos);
          if ($nodo_proxima_clase) {
            $nodo_proxima_clase->delete();
          }

          // Crear hijos
          $nids = \Drupal::entityQuery('node')
          ->condition('type', 'crear_hijos')
          ->condition('field_hijo_relacionado', $id_estudiante)
          ->execute();
          $nodos = \Drupal\node\Entity\Node::loadMultiple($nids);
          $nodo_crear_hijos = reset($nodos);
          if ($nodo_crear_hijos) {
            $nodo_crear_hijos->delete();
          }
           // Asignar clases a estudiantes
           $nids = \Drupal::entityQuery('node')
           ->condition('type', 'asignar_clase_a_estudiante')
           ->condition('field_alumno_relacionado', $id_estudiante)
           ->execute();
           $nodos = \Drupal\node\Entity\Node::loadMultiple($nids);
           $nodo_asignar_clase = reset($nodos);
           if ($nodo_asignar_clase) {
             $nodo_asignar_clase->delete();
           }    
           
          // Koalas niños
          $nids = \Drupal::entityQuery('node')
            ->condition('type', 'koala_ninos')
            ->condition('uid', $id_estudiante)
            ->execute();
          $nodos = \Drupal\node\Entity\Node::loadMultiple($nids);
          $nodo_koala_ninos = reset($nodos);
          if ($nodo_koala_ninos) {
            $nodo_koala_ninos->delete();
          }

          //get language
          $language = \Drupal::languageManager()->getCurrentLanguage()->getId();
          // si es español
          if ($language == 'es') {
            $response = new RedirectResponse('/node/add/agendar_clase/agendar_clases?agregar=1');
            $response->send();
          } else {
            $response = new RedirectResponse('/en/node/add/agendar_clase/agendar_clases?agregar=1');
            $response->send();
          }
        }  
      }
    }
}