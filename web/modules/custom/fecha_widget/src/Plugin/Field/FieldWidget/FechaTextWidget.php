<?php

namespace Drupal\fecha_widget\Plugin\Field\FieldWidget;

use Drupal\Core\Field\FieldDefinitionInterface;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\WidgetBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Plugin implementation of the 'fecha_text_widget' widget.
 *
 * @FieldWidget(
 *   id = "fecha_text_widget",
 *   label = @Translation("Fecha"),
 *   field_types = {
 *     "text"
 *   }
 * )
 */
class FechaTextWidget extends WidgetBase {

  /**
   * {@inheritdoc}
   */
  public function formElement(FieldItemListInterface $items, $delta, Array $element, Array &$form, FormStateInterface $form_state) {
    $element += [
      '#type' => 'date',
      '#default_value' => isset($items[$delta]->value) ? $items[$delta]->value : NULL,
      '#date_date_format' => 'Y-m-d',
      '#date_year_range' => '-18:-2',
    ];

    return ['value' => $element];
  }

}
