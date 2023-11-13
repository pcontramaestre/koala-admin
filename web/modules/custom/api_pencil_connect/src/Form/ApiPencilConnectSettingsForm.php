<?php

namespace Drupal\api_pencil_connect\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Formulario de configuración para API Pencil Connect.
 */
class ApiPencilConnectSettingsForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'api_pencil_connect_settings_form';
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return ['api_pencil_connect.settings'];
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('api_pencil_connect.settings');

    $form['api_url'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Dirección URL de la API'),
      '#default_value' => $config->get('api_url'),
    ];

    $form['api_credentials'] = [
      '#type' => 'fieldset',
      '#title' => $this->t('Credenciales de API'),
      '#collapsible' => TRUE,
      '#collapsed' => FALSE,
    ];
    
    $form['api_credentials']['authorization_token'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Token de autorización'),
      '#description' => $this->t('Introduce el token de autorización Bearer'),
      '#default_value' => $config->get('authorization_token'),
    ];

    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $this->config('api_pencil_connect.settings')
      ->set('api_url', $form_state->getValue('api_url'))
      ->save();
    
    $this->config('api_pencil_connect.settings')
      ->set('authorization_token', $form_state->getValue('authorization_token'))
      ->save();

    parent::submitForm($form, $form_state);
  }
}