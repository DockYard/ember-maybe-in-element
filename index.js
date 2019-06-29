'use strict';

const EmberMaybeInElementAstTransform = require('./lib/ast-transform')

module.exports = {
  name: require('./package').name,

  setupPreprocessorRegistry(type, registry) {
    let plugins = registry.load('htmlbars-ast-plugin');
    let inElementPlugin = plugins.find((plugin) => plugin.name === 'ember-in-element-polyfill');
    let maybePlugin = {
      name: 'ember-maybe-in-element-transform',
      plugin: EmberMaybeInElementAstTransform,
      baseDir() {
        return __dirname;
      }
    };

    // Yes, this a bit ugly, but it seems for some reason AST plugins are applied in a different order (reversed?) than
    // the order they are added to the registry.
    // With this dirty hack we make sure there is always a "polyfill" transform running after the "maybe" transform, to make
    // sure the AST returned from "maybe" containing `{{in-element}}` gets further transformed by the polyfill!
    if (inElementPlugin) {
      registry.remove('htmlbars-ast-plugin', inElementPlugin);
      registry.add('htmlbars-ast-plugin', inElementPlugin);
      registry.add('htmlbars-ast-plugin', maybePlugin);
      registry.add('htmlbars-ast-plugin', inElementPlugin);
    } else {
      registry.add('htmlbars-ast-plugin', maybePlugin);
    }
  },
};
