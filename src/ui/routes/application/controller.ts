import Controller from '@ember/controller';
import { inject as service } from '@ember-decorators/service';
import { getOwner } from '@ember/application';
import { computed } from '@ember-decorators/object';
import TracksManager from 'client/src/services/data/tracks-manager';

export default class PlaylistsShowController extends Controller {
  @service('data/tracks-manager') tracksManager: TracksManager;

  @computed
  get headElement() {
    const documentService = getOwner(this).lookup('service:-document');
    return documentService.head;
  }

}
