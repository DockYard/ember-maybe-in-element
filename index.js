'use strict';
const VersionChecker = require('ember-cli-version-checker');
const buildAstTransform = require('./lib/ast-transform')

module.exports = {
  name: require('./package').name,

  setupPreprocessorRegistry(type, registry) {
    if (type !== 'parent') {
			return;
		}
    let checker = new VersionChecker(this.project);
    let dep = checker.for('ember-source');
    let version = dep.gte('3.17.0');
		const plugin = this._buildPlugin({ version });
    plugin.parallelBabel = {
			requireFile: __filename,
			buildUsing: '_buildPlugin',
			params: options,
		};

    registry.add('htmlbars-ast-plugin', plugin);
  },

	_buildPlugin(options) {
    return {
      name: 'ember-maybe-in-element-transform',
      plugin: buildAstTransform(options.version),
      baseDir() {
        return __dirname;
      },
    };
	},
};
