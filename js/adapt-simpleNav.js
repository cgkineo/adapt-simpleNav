define([
  'core/js/adapt',
  'core/js/views/componentView',
  'core/js/models/componentModel'
], function(Adapt, ComponentView, ComponentModel) {

  class SimpleNavView extends ComponentView {

    events() {
      return {
        'click .js-simplenav-btn-click': 'onBtnClick'
      };
    }

    onBtnClick(e) {
      this.setCompletionStatus();

      const goToId = e.currentTarget.getAttribute('data-gotoid');
      if (!goToId) {
        Adapt.log.error(`SimpleNavView: no goToId set for ${e.currentTarget.innerText}`);
        return;
      }

      Adapt.navigateToElement(goToId);
    }

    preRender() {
      this.checkIfResetOnRevisit();
    }

    postRender() {
      this.setReadyStatus();
    }

    checkIfResetOnRevisit() {
      const isResetOnRevisit = this.model.get('_isResetOnRevisit');

      // If reset is enabled set defaults
      if (isResetOnRevisit) {
        this.model.reset(isResetOnRevisit);
      }
    }
  }

  SimpleNavView.template = 'simpleNav';

  return Adapt.register('simpleNav', {
    model: ComponentModel.extend({}), // create a new class in the inheritance chain so it can be extended per component type if necessary later
    view: SimpleNavView
  });
});
