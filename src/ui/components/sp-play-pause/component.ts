import Component from '@ember/component';

export default class SpPlayPauseComponent extends Component {
  attributeBindings = ['onClick'];
  classNames = ['sp-play-pause'];
  classNameBindings = ['isLoading:loading', 'hideRadios:hide-radius'];
  playIcon = '/icons/play.svg';
}
