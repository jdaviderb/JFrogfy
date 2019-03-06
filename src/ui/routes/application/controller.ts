import Controller from '@ember/controller';
import { inject as service } from '@ember-decorators/service';
import { getOwner } from '@ember/application';
import { computed } from '@ember-decorators/object';
import TracksManager from 'client/src/services/data/tracks-manager';
import HeadDataServices from 'client/src/services/head-data';

export default class PlaylistsShowController extends Controller {
  @service('data/tracks-manager') tracksManager: TracksManager;
  @service headData: HeadDataServices;

  @computed
  get headElement() {
    const documentService = getOwner(this).lookup('service:-document');

    return documentService.head;
  }

}
