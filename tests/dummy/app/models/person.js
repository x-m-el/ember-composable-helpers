import Model from '@ember-data/model';
import { attr } from '@ember-data/model';
import { hasMany } from '@ember-data/model';

export default class Person extends Model {
  @attr('string') name;
  @hasMany('pet', { async: true, inverse: 'owner' }) pets;
}
