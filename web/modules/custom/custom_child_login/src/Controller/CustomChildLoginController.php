<?php
namespace Drupal\custom_child_login\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Url;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Drupal\user\Entity\User;
/**
 * Controller para el inicio de sesión como hijo.
 */
class CustomChildLoginController extends ControllerBase {
  /**
   * Página de inicio de sesión como hijo.
   *
   * @param int $uid
   *   El ID del usuario hijo seleccionado.
   */
  public function startSession($uid) {
    //dump($uid);
    
    $user = User::load($uid);
    if ($user) { //&& $user->hasRole('padre')) {
      //dump($uid);
      //dump("Entro a padre con rol");
      user_login_finalize($user);
      $this->messenger()->addMessage($this->t('Ahora estás logueado como el hijo seleccionado.'));
    }
    //dump($uid);
    //dump("No es padre");
    //return $this->redirect('<front>');
    return new RedirectResponse('/en/hijo');
  }


  /**
   * Iniciar sesión como el hijo seleccionado.
   *
   * @param int $uid
   *   El ID del usuario hijo.
   *
   * @return \Symfony\Component\HttpFoundation\RedirectResponse
   *   La redirección a la página del hijo después del inicio de sesión.
   */
  public function startSessionNO($uid) {
    $child_user = \Drupal\user\Entity\User::load($uid);

    if ($child_user && $this->isValidChild($child_user)) {
      // Cerrar la sesión actual.
      user_logout();

      // Iniciar una nueva sesión con el usuario hijo seleccionado.
      user_login_finalize($child_user);

      // Redireccionar al perfil del hijo después del inicio de sesión.
      $response = new RedirectResponse(Url::fromRoute('entity.user.canonical', ['user' => $uid])->toString());
      return $response;
    }

    drupal_set_message(t('No se puede iniciar sesión como este usuario.'), 'error');
    $response = new RedirectResponse(Url::fromRoute('<front>')->toString());
    return $response;
  }

  /**
   * Verificar si un usuario hijo es válido para el padre actual.
   *
   * @param \Drupal\user\UserInterface $child_user
   *   El usuario hijo.
   *
   * @return bool
   *   TRUE si el usuario hijo es válido para el padre actual, FALSE en caso contrario.
   */
  private function isValidChild($child_user) {
    $parent_user = \Drupal::currentUser();

    // Verificar si el usuario actual es un padre.
    if (!$parent_user->hasRole('padre')) {
      return FALSE;
    }

    // Verificar si el usuario hijo tiene asociado el campo "field_padre" con el correo del padre.
    $field_padre = $child_user->get('field_padre')->getValue();
    $parent_email = $parent_user->getEmail();
    if (!empty($field_padre) && isset($field_padre[0]['value']) && $field_padre[0]['value'] === $parent_email) {
      return TRUE;
    }

    return FALSE;
  }

}
