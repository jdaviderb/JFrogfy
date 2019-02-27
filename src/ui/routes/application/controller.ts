import Controller from '@ember/controller';
import { inject as service } from '@ember-decorators/service';
import { getOwner } from '@ember/application';
import { computed } from '@ember-decorators/object';

export default class PlaylistsShowController extends Controller {
  @service headData: any;
  hola = "this a test";

  @computed
  get headElement() {
    const documentService = getOwner(this).lookup('service:-document');
    return documentService.head;
  }

}
