import Component from '@ember/component';
import { inject as service } from '@ember-decorators/service';
import { alias } from '@ember-decorators/object/computed';

export default class SpIndicatorComponent extends Component {
  @service audio;
  @alias('audio.currentTimePercent') value;

  classNames = ['sp-indicator'];

  changeDuration(event) {
    this.audio.setDuration(event.target.value);
  }

  didRender() {
    this.element.querySelector('.bar').style.width = `${this.value}%`;
    this._super(...arguments);
  }
}
