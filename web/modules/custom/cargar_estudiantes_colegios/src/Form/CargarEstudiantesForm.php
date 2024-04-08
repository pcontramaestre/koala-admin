<?php

namespace Drupal\cargar_estudiantes_colegios\Form;

use Drupal\api_pencil_connect\api_pencil_connect;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\node\Entity\Node;
use Drupal\Core\StringTranslation\TranslatableMarkup;
use Drupal\Core\File\FileSystemInterface;

/**
 * Proporciona un formulario para cargar estudiantes a colegios.
 */
class CargarEstudiantesForm extends FormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'cargar_estudiantes_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {

    // Colegios
    $form['colegio'] = [
      '#type' => 'select',
      '#title' => $this->t('Colegio'),
      '#options' => $this->getColegiosOptions(),
      '#ajax' => [
        'callback' => '::updateGrupos',
        'wrapper' => 'grupos-wrapper',
      ],
      '#required' => TRUE,
    ];

    // Grupos (actualizado por AJAX)
    $form['grupos'] = [
      '#type' => 'select',
      '#title' => $this->t('Grupos'),
      '#prefix' => '<div id="grupos-wrapper">',
      '#suffix' => '</div>',
      '#options' => [],
      '#validated' => TRUE, // Este ayuda en las respuestas AJAX. 
      '#states' => [
        'visible' => [
          ':input[name="colegio"]' => ['!value' => ''],
        ],
        // no visible if colegio is not selected
        'required' => [
          ':input[name="colegio"]' => ['!value' => ''],
        ],
      ], 
      '#required' => TRUE,
    ];

    // HTML con información adicional sobre el formato del archivo CSV.
    $form['archivo_csv_info'] = [
      '#markup' => '<p>' . $this->t('Un ejemplo del archivo CSV es el siguiente:') . '</p>',
    ];

    // Tabla con el formato del archivo CSV.
    // llevara los siguientes campos: correo_del_nino	clave_ingreso	nombres_nino	apellidos_nino	sexo	fecha_nacimiento	correo_padre	nombre_padre	apellido_padre	celular_padre
    $form['archivo_csv_info_table'] = [
      '#type' => 'table',
      '#header' => [
        $this->t('correo_del_nino'),
        $this->t('clave_ingreso'),
        $this->t('nombres_nino'),
        $this->t('apellidos_nino'),
        $this->t('sexo'),
        $this->t('fecha_nacimiento'),
        $this->t('correo_padre'),
        $this->t('clave_padre'),
        $this->t('nombre_padre'),
        $this->t('apellido_padre'),
        $this->t('celular_padre'),
      ],
      '#rows' => [
        [
          'correo1@correo.com',
          '123456',
          'Pablo Antonio',
          'Contramaestre',
          'M',
          '31/05/2014',
          'correo1padre@correo.com',
          '123456',
          'Pedro Antonio',
          'Contramaestre',
          '3232907169',
        ],
        [
          'correo2@correo.com',
          '123456',
          'María Antonia',
          'Contramaestre',
          'F',
          '31/05/2014',
          'correo2padre@correo.com',
          '123456',
          'Pedro Antonio',
          'Contramaestre',
          '3232907169',
        ],
      ],
    ];

    // crear un enlace para descargar el archivo de ejemplo, en la ruta /themes/custom/koala/docs/formato-carga-estudiantes.csv
    $form['archivo_csv_info_download'] = [
      '#markup' => '<p>' . $this->t('Puedes descargar el archivo de ejemplo <a href="/themes/custom/koala/docs/formato-carga-estudiantes.csv">aquí</a>.') . '</p>',
    ];



    $form['archivo_csv'] = [
      '#type' => 'managed_file',
      '#title' => $this->t('Cargar archivo CSV'),
      '#description' => $this->t('Carga un archivo CSV con los estudiantes.'),
      '#upload_location' => 'public://upload/csv/',
      '#upload_validators' => [
        'file_validate_extensions' => ['csv'],
      ],
      '#required' => TRUE,
    ];

    // Botón de envío
    $form['actions']['#type'] = 'actions';
    $form['actions']['submit'] = [
      '#type' => 'submit',
      '#value' => new TranslatableMarkup('Cargar'),
      '#button_type' => 'primary',
    ];

    return $form;
  }

  /**
   * Retorna las opciones de colegios.
   */
  private function getColegiosOptions() {
    //$options = [];
    $options = ['' => $this->t('- Seleccione -')];
    $nids = \Drupal::entityQuery('node')->condition('type', 'colegios')->execute();
    $nodes = Node::loadMultiple($nids);
    foreach ($nodes as $node) {
      $options[$node->id()] = $node->label();
    }
    return $options;
  }

  /**
   * AJAX Callback para actualizar grupos.
   */
  public function updateGrupos(array &$form, FormStateInterface $form_state) {
    $colegio_id = $form_state->getValue('colegio');
    $grupos_options = $this->getGruposOptions($colegio_id);

    $form['grupos']['#options'] = $grupos_options;

    return $form['grupos'];
  }

    /**
     * Retorna las opciones de grupos basado en el colegio seleccionado.
     */
    private function getGruposOptions($colegio_id) {
      $options = [];
      $nids = \Drupal::entityQuery('node')
          ->condition('type', 'colegios_grupos')
          ->condition('field_colegio_al_que_pertenece_c', $colegio_id)
          ->execute();
      $nodes = Node::loadMultiple($nids);
      foreach ($nodes as $node) {
        $options[$node->id()] = $node->label();
      }
      return $options;
    }

  /**
   * {@inheritdoc}
   */
  

   public function submitForm(array &$form, FormStateInterface $form_state) {

    // obtener el valor del colegio y el grupo
    $colegio_id = $form_state->getValue('colegio');
    $grupo_id = $form_state->getValue('grupos');

    $grupo = Node::load($grupo_id);
    //get entity reference field_coordinador_del_grupo
    $coordinador_grupo = $grupo->get('field_coordinador_del_grupo')->target_id;
    

    //load colegio and get field_zona_horaria_del_colegio
    $colegio = Node::load($colegio_id);
    $zona_horaria = $colegio->get('field_zona_horaria_del_colegio')->value;



    // Verifica y crea la carpeta si no existe.
    $directory = 'public://upload/csv/';
    if (!\Drupal::service('file_system')->prepareDirectory($directory, \Drupal\Core\File\FileSystemInterface::CREATE_DIRECTORY)) {
      $this->messenger()->addError($this->t('No se pudo crear el directorio para cargar archivos. Por favor, contacte al administrador del sitio.'));
      return;
    }
  
    $fid = $form_state->getValue(['archivo_csv', 0]);
    if (!empty($fid)) {
      $file = \Drupal\file\Entity\File::load($fid);
  
      $file_uri = $file->getFileUri();
      $file_path = \Drupal::service('file_system')->realpath($file_uri);
  
      // Abre el archivo CSV para leer.
      if (($handle = fopen($file_path, "r")) !== FALSE) {
        $rowNum = 0; // Contador de líneas para omitir la primera
        while (($data = fgetcsv($handle, 1000, ";")) !== FALSE) { // Asumimos ';' como delimitador basado en el dump previo
          if ($rowNum > 0) { // Omite la primera línea (encabezado)
            // Asigna los valores de $data a variables individuales para mayor claridad en el uso.
            list($correoNino, $claveIngreso, $nombresNino, $apellidosNino, $sexo, $fechaNacimiento, $correoPadre, $clavePadre, $nombrePadre, $apellidoPadre, $celularPadre) = $data;
  
            $this->messenger()->addMessage($this->t('Procesando entrada: @correoNino, @nombresNino el colegio: @colegio y el grupo @grupo', [
              '@correoNino' => $correoNino,
              '@nombresNino' => $nombresNino,
              '@colegio' => $colegio_id,
              '@grupo' => $grupo_id,
            ]));

            // Verificar que todos los campos estén llenos, tambien verificar que los correos sean validos
            if (empty($correoNino) || empty($claveIngreso) || empty($nombresNino) || empty($apellidosNino) || empty($sexo) || empty($fechaNacimiento) || empty($correoPadre) || empty($nombrePadre) || empty($apellidoPadre) || empty($celularPadre) || empty($clavePadre)) {
              $this->messenger()->addError($this->t('Todos los campos son requeridos en el archivo csv.'));
              // saltar al siguiente registro
              continue;
            } else {
              if (!filter_var($correoNino, FILTER_VALIDATE_EMAIL) || !filter_var($correoPadre, FILTER_VALIDATE_EMAIL)) {
                $this->messenger()->addError($this->t('Los correos no son validos.' . $correoNino . ' ' . $correoPadre));
                continue;
              } else {
                // validar correo no exista
                if ($this->validateEmailNotExists($correoNino)) {
                  $this->messenger()->addError($this->t('El correo del niño ya existe.'));
                  continue;
                } else {
                  // validar correo padre
                  $idPadre = $this->validateEmailPadre($correoPadre, $clavePadre, $nombrePadre, $apellidoPadre, $celularPadre, $colegio_id, $zona_horaria);

                  // crear usuario niño
                  $idNino = $this->createUserNino($correoNino, $claveIngreso, $nombresNino, $apellidosNino, $sexo,$fechaNacimiento, $colegio_id, $grupo_id, $idPadre, $zona_horaria,$nombrePadre, $apellidoPadre,$coordinador_grupo);

                  if ($idNino) {
                    $this->messenger()->addMessage($this->t('El niño ha sido creado correctamente.' . $idNino));
                  } else {
                    $this->messenger()->addError($this->t('Error al crear el niño.'));
                  }
                }
              }
            }

            
          }
          $rowNum++; // Incrementa el contador de líneas.
        }
        fclose($handle);
      }
  
      // Mensaje al usuario.
      $this->messenger()->addMessage($this->t('El formulario se ha enviado correctamente y el archivo CSV se ha procesado.'));
    }
  }

  private function validateEmailNotExists($email){
    $query = \Drupal::entityQuery('user')
      ->condition('mail', $email)
      ->execute();
    // si el correo existe retorna verdadero si no falso
    return !empty($query);
  }

  //funcion para validar el correo del padre, si existe retorna el id del usuario, si no existe lo crea y retorna el id
  private function validateEmailPadre($correoPadre, $clavePadre, $nombrePadre, $apellidoPadre, $celularPadre, $colegio_id, $zona_horaria){
    $query = \Drupal::entityQuery('user')
      ->condition('mail', $correoPadre)
      ->execute();

    // si el correo existe retorna verdadero si no falso
    if (!empty($query)) {
      // si el correo existe retorna el id del usuario
      $user = \Drupal\user\Entity\User::load(reset($query));
      return $user->id();
    } else {
      return $this->createUserPadre($correoPadre, $clavePadre, $nombrePadre, $apellidoPadre, $celularPadre, $colegio_id, $zona_horaria);
    }
  }

  private function createUserPadre($correoPadre, $clavePadre, $nombrePadre, $apellidoPadre, $celularPadre, $colegio_id, $zona_horaria){
    // Crear usuario con rol padre y padre_escuela
    $user = \Drupal\user\Entity\User::create();
    $user->setUsername($correoPadre);
    $user->setEmail($correoPadre);
    $user->set("init", $correoPadre);
    $user->set("pass", $clavePadre);
    $user->addRole('padre');
    $user->addRole('padre_escuela');
    $user->set('field_colegio_al_que_pertenece_e', $colegio_id); 
    $user->set('field_nombre_del_director', $nombrePadre . ' ' . $apellidoPadre);
    $user->set('field_nombre_del_acudiente', $nombrePadre);
    $user->set('field_apellidos', $apellidoPadre);
    $user->set('field_celular', $celularPadre);
    //preferred_langcode EN
    $user->set('preferred_langcode', 'en'); 
    // zona horaria
    $user->set('timezone', $zona_horaria);
  
    $user->activate();
    $user->save();

    $uid = $user->id();

    // Obtener la ruta absoluta del tema
    $theme_path = \Drupal::service('theme_handler')->getTheme('koala')->getPath();
    // Ruta del archivo dentro de la carpeta del tema
    $filename = 'images/avatares/avatar1.png';
    $filepath = $theme_path . '/' . $filename;

    $directory = 'public://avatares';
    /** @var \Drupal\Core\File\FileSystemInterface $file_system */
    $file_system = \Drupal::service('file_system');
    $file_system->prepareDirectory($directory, FileSystemInterface:: CREATE_DIRECTORY | FileSystemInterface::MODIFY_PERMISSIONS);
    $file_system->copy($filepath, $directory . '/' . basename($filepath), FileSystemInterface::EXISTS_REPLACE);
    $file = \Drupal\file\Entity\File::create([
      'uid' => $uid,
      'filename' => basename($filepath),
      'uri' => $directory . '/' . basename($filepath),
      'status' => 1,
    ]);
    $file->save();
    
    $user->set('user_picture', $file->id());
    $user->save();

    return $user->id();
  }

  private function createUserNino($correoNino, $claveIngreso, $nombresNino, $apellidosNino, $sexo, $fechaNacimiento, $colegio_id, $grupo_id, $idPadre, $zona_horaria, $nombrePadre, $apellidoPadre,$coordinador_grupo){
    // si $sexo es M, $sexo - Niño, si $sexo es F, $sexo - Niña, default $sexo - NA
    if ($sexo == 'M') {
      $sexo = 'Niño';
    } elseif ($sexo == 'F') {
      $sexo = 'Niña';
    } else {
      $sexo = 'NA';
    }

    // Crear usuario con rol estudiante
    $user = \Drupal\user\Entity\User::create();
    $user->setUsername($correoNino);
    $user->setEmail($correoNino);
    $user->set("init", $correoNino);
    $user->set("pass", $claveIngreso);
    $user->addRole('hijo_escuela');
    $user->addRole('hijo');
    $user->set('field_colegio_al_que_pertenece_e', $colegio_id); 
    $user->set('field_grupo_al_que_pertenece_el_', $grupo_id);
    $user->set('field_nombre_del_hijo', $nombresNino);
    $user->set('field_apellidos', $apellidosNino);
    $user->set('field_coordinador_relacionado', $coordinador_grupo);
    //field_nombre_del_acudiente
    $user->set('field_nombre_del_acudiente', $nombrePadre . ' ' . $apellidoPadre);
    $user->set('field_padre', $idPadre);
    // language EN
    $user->set('preferred_langcode', 'en');
    // zona horaria
    $user->set('timezone', $zona_horaria);


    $create_user_pencil = api_pencil_connect_create_user($nombresNino. '' .$apellidosNino,'Student');  
    if ($create_user_pencil !== FALSE) {
      $user->set('field_pencil_id', $create_user_pencil['userId']);    
      $user->set('field_pencil_email', $create_user_pencil['email']);    
      // $user->save();
    } else {
      \Drupal::messenger()->addError(new TranslatableMarkup('Error creating user student in the API'. $create_user_pencil ));
    }

    $user->activate();
    $user->save();
    $newidhijo = $user->id();

    // Obtener la ruta absoluta del tema
    $theme_path = \Drupal::service('theme_handler')->getTheme('koala')->getPath();
    // Ruta del archivo dentro de la carpeta del tema
    $filename = 'images/avatares/avatar1.png';
    $filepath = $theme_path . '/' . $filename;

    $directory = 'public://avatares';
    /** @var \Drupal\Core\File\FileSystemInterface $file_system */
    $file_system = \Drupal::service('file_system');
    $file_system->prepareDirectory($directory, FileSystemInterface:: CREATE_DIRECTORY | FileSystemInterface::MODIFY_PERMISSIONS);
    $file_system->copy($filepath, $directory . '/' . basename($filepath), FileSystemInterface::EXISTS_REPLACE);
    $file = \Drupal\file\Entity\File::create([
      'uid' => $newidhijo,
      'filename' => basename($filepath),
      'uri' => $directory . '/' . basename($filepath),
      'status' => 1,
    ]);
    $file->save();
    
    $user->set('user_picture', $file->id());
    $user->save();

    //convertir $fechaNacimiento que esta en formato dd/mm/yy a dd-mm-yyyy
    $fechaNacimiento = str_replace('/', '-', $fechaNacimiento);
    $fechaNacimiento = date('d-m-Y', strtotime($fechaNacimiento));


    // Crear un nuevo nodo de tipo crear_hijos.
    $node = Node::create([
      'type'        => 'crear_hijos',
      'title'       => $nombresNino. ' ' .$apellidosNino,
      'field_sexo'  => $sexo,
      'field_fecha_nacimiento' => $fechaNacimiento,
      'field_hijo_relacionado' => $newidhijo,
      'uid' => $idPadre,
    ])->save();

    // Crear un nuevo nodo de tipo koala_ninos. con los campos 
    // field_describe_tu_koala, field_hijo_relacionado
    // Crea un nodo de tipo "horarios_profesores".
    $title = 'Mi primer Koala';
    $description = 'Mi primer Koala descripción';


    $nodekoalas = Node::create([
      'type' => 'koala_ninos',
      'title' => $title,
      'field_describe_tu_koala' => $description,
      'field_hijo_relacionado' => $newidhijo,
      'uid' => $newidhijo,
    ]);
    $nodekoalas->save();

    return $user->id();
  }
}