<?php

namespace Drupal\custom_role_redirect\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Session\AccountInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Routing\Route;

class CustomRoleRedirectController extends ControllerBase
{

  /**
   * Redirige a los usuarios según su rol.
   */
  public function redirectToRole()
  {
    $account = \Drupal::currentUser();
    // get current user role(s)
    $roles = $account->getRoles();
    // check user role(s) and redirect accordingly
    if (in_array('padre', $roles)) {
      return $this->redirectToPadres();
    } elseif (in_array('profesor', $roles)) {
      return $this->redirectToProfesor();
    } else {
      return $this->redirect('<front>');
    }



    // if ($account->hasRole('padre')) {
    //   return $this->redirectToPadres();
    // } elseif ($account->hasRole('profesor')) {
    //   return $this->redirectToProfesor();
    // } else {
    //   return $this->redirect('<front>');
    // }
  }

  /**
   * Redirige a la página '/padres'.
   */
  public function redirectToPadres()
  {
    return new RedirectResponse('/padres');
  }

  /**
   * Redirige a la página '/profesor'.
   */
  public function redirectToProfesor()
  {
    return new RedirectResponse('/profesor');
  }
}
