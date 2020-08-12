'use strict';
const VersionChecker = require('ember-cli-version-checker');
const buildAstTransform = require('./lib/ast-transform')

module.exports = {
  name: require('./package').name,

  setupPreprocessorRegistry(type, registry) {
    let checker = new VersionChecker(this.project);
    let dep = checker.for('ember-source');
    let maybePlugin = {
      name: 'ember-maybe-in-element-transform',
      plugin: buildAstTransform(dep.gte('3.17.0')),
      baseDir() {
        return __dirname;
      },
    };
    registry.add('htmlbars-ast-plugin', maybePlugin);
  },
};
