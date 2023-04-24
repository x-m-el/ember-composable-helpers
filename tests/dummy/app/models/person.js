import Model from '@ember-data/model';
import { attr } from '@ember-data/model';
import { hasMany } from '@ember-data/model';

export default Model.extend({
  name: attr('string'),
  pets: hasMany('pet'),
});
