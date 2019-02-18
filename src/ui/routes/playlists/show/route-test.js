import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | playlists/show', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:playlists/show');
    assert.ok(route);
  });
});
