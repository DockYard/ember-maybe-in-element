'use strict';

const EmberMaybeInElementAstTransform = require('./lib/ast-transform')

module.exports = {
  name: require('./package').name,

  setupPreprocessorRegistry(type, registry) {
    let maybePlugin = {
      name: 'ember-maybe-in-element-transform',
      plugin: EmberMaybeInElementAstTransform,
      baseDir() {
        return __dirname;
      }
    };

    registry.add('htmlbars-ast-plugin', maybePlugin);
  },
};
