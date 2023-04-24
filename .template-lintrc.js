'use strict';

module.exports = {
  extends: 'recommended',
  rules: {
    'no-curly-component-invocation': { allow: ['dec', 'inc'] },
    'no-action-modifiers': true,
    'no-element-event-actions': true,
  },
};
