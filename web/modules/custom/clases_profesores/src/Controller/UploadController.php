<?php

namespace Drupal\clases_profesores\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Drupal\Core\File\FileSystemInterface;


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

      // Verificar si el directorio "video_uploads" existe
      $public_file_path = 'public://video_uploads/';
      $this->fileSystem->prepareDirectory($public_file_path, FileSystemInterface::CREATE_DIRECTORY);

      

      if (!is_null($file)) {
        // Asigna un nombre único al archivo y lo mueve a la carpeta pública (o privada) de archivos
        $filename = 'video_' . time() . '.' . $file->getClientOriginalExtension();
        $file->move('public://video_uploads/', $filename);

        // Aquí puedes guardar un registro en la base de datos o realizar acciones adicionales necesarias

        return new JsonResponse(['message' => 'Archivo subido con éxito', 'filename' => $filename], 200);
      }
    }

    return new JsonResponse(['message' => 'Método no permitido o archivo no enviado.'], 400);
  }
}