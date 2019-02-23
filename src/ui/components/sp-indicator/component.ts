import Component from '@ember/component';
import { inject as service } from '@ember-decorators/service';
import { alias } from '@ember-decorators/object/computed';

export default class SpIndicatorComponent extends Component {
  @service audio: any;
  @alias('audio.currentTimePercent') value: number;

  classNames = ['sp-indicator'];

  changeDuration(event: any): void {
    this.audio.setDuration(event.target.value);
  }

  didRender(): void {
    (this.element.querySelector('.bar') as HTMLElement).style.width = `${this.value}%`;
  }
}
