<?php
namespace Drupal\custom_padre_login\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Url;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Drupal\user\Entity\User;
use Drupal\user\UserInterface;
use Drupal\Core\Messenger\MessengerInterface;

/**
 * Controller para el inicio de sesión como padre.
 */
class CustomPadreLoginController extends ControllerBase {
  /**
   * Página de inicio de sesión como padre.
   *
   * @param int $uid
   *   El ID del usuario padre seleccionado.
   */
  public function startSession($uid) {

    //obtener usuario actual y detectar si tiene el rol de administrador
    $user = \Drupal\user\Entity\User::load(\Drupal::currentUser()->id());
    $roles = $user->getRoles();
    if (in_array('administrator', $roles)) {
      $user = User::load($uid);
      if ($user) {
        user_login_finalize($user);
        $this->messenger()->addMessage($this->t('Ahora estás logueado como el padre seleccionado.'));
      }
      //return new RedirectResponse('/padres');
      // redireccionar al front <front>
      return new RedirectResponse('/');
    } else {
      $this->messenger()->addMessage($this->t('No tienes permisos para realizar esta acción.'), MessengerInterface::TYPE_ERROR);
      return new RedirectResponse('/');
    }


  }
}