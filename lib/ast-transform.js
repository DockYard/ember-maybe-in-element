/* eslint-env node */
'use strict';

const { traverse } = require('@glimmer/syntax');

module.exports = class EmberMaybeInElementAstTransform {
  constructor(options) {
    this.options = options;
  }

  transform(ast) {
    traverse(ast, {
      BlockStatement: (node) => {
        // return this._applyTransform(node);
      }
    });

    return ast;
  }
}
