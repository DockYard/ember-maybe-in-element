import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class extends Component {
  @tracked renderInPlace = false;
  @tracked id = '#in-element-destination';

  get destinationElement() {
    return document.querySelector(this.id);
  }

  @action
  toggleRenderInPlace() {
    this.renderInPlace = !this.renderInPlace;
  }

  @action
  changeDestination() {
    if (this.id === '#in-element-destination') {
      this.id = '#in-element-destination2';
    } else {
      this.id = '#in-element-destination';
    }
  }

  logClick() {
    alert('click event!');
  }
}
