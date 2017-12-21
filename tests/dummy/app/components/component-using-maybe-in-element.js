import Component from '@ember/component';

export default Component.extend({
  renderInPlace: false,

  init() {
    this._super(...arguments);
    this.destinationElement = document.querySelector('#in-element-destination');
  },
  actions: {
    toggleRenderInPlace() {
      this.set('renderInPlace', !this.get('renderInPlace'));
    }
  }
});
