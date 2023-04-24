import Model from '@ember-data/model';
import { attr } from '@ember-data/model';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  name: attr('string'),
  owner: belongsTo('person'),
});
