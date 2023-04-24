import Model from '@ember-data/model';
import { attr, belongsTo } from '@ember-data/model';

export default class Pet extends Model {
  @attr('string') name;
  @belongsTo('person', { async: true, inverse: 'pets' }) owner;
}
