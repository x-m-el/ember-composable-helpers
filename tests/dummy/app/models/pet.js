import Model from '@ember-data/model';
import { attr, belongsTo } from '@ember-data/model';

export default Model.extend({
  name: attr('string'),
  owner: belongsTo('person'),
});
