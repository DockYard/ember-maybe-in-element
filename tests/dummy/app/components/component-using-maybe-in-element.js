import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  renderInPlace: false,
  id: '#in-element-destination',

  destinationElement: computed('id', function() {
    return document.querySelector(this.get('id'));
  }),

  actions: {
    toggleRenderInPlace() {
      this.set('renderInPlace', !this.get('renderInPlace'));
    },

    logClick() {
      alert('click event!');
    },

    changeDestination() {
      if (this.get('id') === '#in-element-destination') {
        this.set('id', '#in-element-destination2');
      } else {
        this.set('id', '#in-element-destination');
      }
    }
  }
});
