<?php

namespace Drupal\clases_profesores\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Drupal\Core\File\FileSystemInterface;
use Drupal\Core\Url;
use Drupal\Core\Utility\UrlHelper;


class UploadController extends ControllerBase {

  /**
   * El servicio de sistema de archivos.
   *
   * @var \Drupal\Core\File\FileSystemInterface
   */
  protected $fileSystem;

  public function __construct(FileSystemInterface $file_system) {
    $this->fileSystem = $file_system;
  }

  public function upload(Request $request) {
    // Asegura que el método sea POST
    if ($request->isMethod('POST')) {
      $file = $request->files->get('video');
      // get idClase from request Header
      $idClase = $request->headers->get('idClase');
      dump($idClase);

      // Verificar si el directorio "video_uploads" existe
      $public_file_path = 'public://video_uploads/';
      $this->fileSystem->prepareDirectory($public_file_path, FileSystemInterface::CREATE_DIRECTORY);

      if (!is_null($file)) {
        // Asigna un nombre único al archivo y lo mueve a la carpeta pública (o privada) de archivos
        //$filename = 'video_' . time() . '.' . $file->getClientOriginalExtension();
        $filename = 'video_' . $idClase . '.' . $file->getClientOriginalExtension();
        $file->move('public://video_uploads/', $filename);

        // Guardar ruta del archivo en la variable de $file_upload
        $file_upload = $public_file_path . $filename;
        dump($file_upload);
        // convertir $file_upload a URI
        //$file_upload = \Drupal\Core\Url::fromUri($file_upload);

        $clase_asignada = $this->getClaseAsignada($idClase);
        $this->saveVideo($clase_asignada, $file_upload);

        return new JsonResponse(['message' => 'Archivo subido con éxito', 'filename' => $filename], 200);
      }
    }

    return new JsonResponse(['message' => 'Método no permitido o archivo no enviado.'], 400);
  }

  private function getClaseAsignada($idClase) {
    // Buscar idClase en el tipo de contenido agendar_clase en el id del nodo
    $query = \Drupal::entityQuery('node')
    ->condition('type', 'agendar_clase')
    ->condition('nid', $idClase);
    
    $nids = $query->execute();

    // Obtener el valor de campo referenciado field_clase_asignada
    $node = \Drupal\node\Entity\Node::load(reset($nids));
    $field_clase_asignada = $node->get('field_clase_asignada')->getValue();
    dump($field_clase_asignada);
    $clase_asignada = $field_clase_asignada[0]['target_id'];
    dump($clase_asignada);

    return $clase_asignada;
  }

  private function saveVideo($clase_asignada, $file_upload) {
    // Guardar la ruta del archivo en el campo field_video_clase
    $node = \Drupal\node\Entity\Node::load($clase_asignada);
    $node->set('field_ruta_video_clase', $file_upload);
    $node->save();
  }
}