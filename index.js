'use strict';

const EmberMaybeInElementAstTransform = require('./lib/ast-transform')

module.exports = {
  name: require('./package').name,

  setupPreprocessorRegistry(type, registry) {
    registry.add('htmlbars-ast-plugin', {
      name: 'ember-maybe-in-element-transform',
      plugin: EmberMaybeInElementAstTransform,
      baseDir() {
        return __dirname;
      }
    });
  },
};
