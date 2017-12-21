/* eslint-env node */
'use strict';

const EmberMaybeInElementAstTransform = require('./lib/ast-transform')

module.exports = {
  name: 'ember-maybe-in-element',

  setupPreprocessorRegistry(type, registry) {
    registry.add('htmlbars-ast-plugin', {
      name: 'ember-maybe-in-element-transform',
      plugin: EmberMaybeInElementAstTransform
    });
  },
};
