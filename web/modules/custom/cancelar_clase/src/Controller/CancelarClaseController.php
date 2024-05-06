<?php

namespace Drupal\cancelar_clase\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Drupal\node\Entity\Node;
use Drupal\Core\Access\AccessResult;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Drupal\Core\Entity\Query\QueryFactory;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\StringTranslation\TranslatableMarkup;

/**
 * Define el controlador para el módulo cancelar_clase.
 */
class CancelarClaseController extends ControllerBase {
  /**
  * The entity type manager.
  *
  * @var \Drupal\Core\Entity\EntityTypeManagerInterface
  */
  protected $entityTypeManager;

  /**
  * Constructs a new CancelarClaseController object.
  *
  * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entity_type_manager
  *   The entity type manager.
  */
  public function __construct(EntityTypeManagerInterface $entity_type_manager) {
      $this->entityTypeManager = $entity_type_manager;
  }

  /**
  * {@inheritdoc}
  */
  public static function create(ContainerInterface $container) {
      return new static(
        $container->get('entity_type.manager')
      );
  }


  public function cancelar(Request $request) {
    $id = $request->query->get('id');

    if (!empty($id)) {
      $node = Node::load($id);
      if ($node instanceof Node && $node->bundle() == 'agendar_clase') {
        // Verificar si el usuario tiene permiso para eliminar este nodo específico.
        $access = $node->access('delete');
        if (!$access) {
          return new JsonResponse(['status' => 'error', 'message' => 'No tienes permisos para cancelar esta clase.']);
        }
        if ($node->get('field_tipo_clase')->value == 'Gratis') {          
          // Eliminar la clase.
          $node->delete();
          //return new JsonResponse(['status' => 'success', 'message' => 'Clase cancelada con éxito.']);
          return new RedirectResponse('/en/padres');
        } else {
          $language = \Drupal::languageManager()->getCurrentLanguage()->getId();

          $titulo = new TranslatableMarkup('Cancelar clase');
          $mensaje = new TranslatableMarkup('¿Estás seguro de que quieres cancelar esta clase?');
          $mensaje2 = new TranslatableMarkup('¿Estás seguro de que quieres cancelar esta clase?. Esta acción no se puede deshacer');
          $texto_enlace_si = new TranslatableMarkup('Cancelar clase');
          $texto_enlace_no = new TranslatableMarkup('Regresar');

          $html = '<div class="cancelar-clase">';
          $html .= '<h2>'.$titulo.'</h2>';
          $html .= '<p class="text-center">'.$mensaje2.'</p>';
          if ($language == 'es'){
            $html .= '<div class="acciones d-flex"><a href="/cancelar-clase/' . $id . '/confirmar" class="btn-cancelar">'.$texto_enlace_si.'</a>';
            $html .= '<a href="/padres/mi-calendario" class="btn-volver">'.$texto_enlace_no.'</a></div>';
          } else {
            $html .= '<div class="acciones d-flex"><a href="/cancelar-clase/' . $id . '/confirmar" class="btn-cancelar">'.$texto_enlace_si.'</a>';
            $html .= '<a href="/en/padres/mi-calendario" class="btn-volver">'.$texto_enlace_no.'</a></div>';
          }
          $html .= '</div>';
          // Mostrar html con el mensaje "¿Estás seguro de cancelar la clase gratis?"
          return [
            '#markup' => $html,
          ];
        }
      }
    }

    return new JsonResponse(['status' => 'error', 'message' => 'Clase no encontrada.']);
  }

  public function cancelarConfirmar(Request $request) {  
    $id = $request->get('id_clase');
    if (!empty($id)) {
      $node = Node::load($id);
      if ($node instanceof Node && $node->bundle() == 'agendar_clase') {
        // Verificar si el usuario tiene permiso para eliminar este nodo específico.
        $access = $node->access('delete');
        if (!$access) {
          return new JsonResponse(['status' => 'error', 'message' => 'No tienes permisos para cancelar esta clase.']);
        }
        if ($node->get('field_tipo_clase')->value == 'Gratis') {          
          // Eliminar la clase.
          $node->delete();
          //return new JsonResponse(['status' => 'success', 'message' => 'Clase cancelada con éxito.']);
          return new RedirectResponse('/padres');
        } else {

          // mostrar un popup para confirmar si desea cancelar la clase.
          

          $nids = $this->entityTypeManager->getListBuilder('node')->getStorage()->getQuery()
                ->condition('type', 'asignar_clase_a_estudiante')
                ->condition('field_seleccionar_clase_agendada', $id)
                ->execute();

          if (!empty($nids)) {
              $nodes = Node::loadMultiple($nids);
              foreach ($nodes as $node) {
                  $node->delete();
              }
          }

          $node = Node::load($id);
          $node->delete();

          return new RedirectResponse('/en/padres');
        }
      }
    }
    return new JsonResponse(['status' => 'error', 'message' => 'Clase no encontrada.']);
  }

}