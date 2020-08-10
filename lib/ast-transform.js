/* eslint-env node */
'use strict';

/**
 * From:
 *  ```hbs
 *  {{#maybe-in-element destinationEl renderInPlace insertBefore=null}}the block{{/maybe-in-element}}
 *  ```
 *
 * Generates:
 *  ```hbs
 *  {{#if renderInPlace}}
 *    the block
 *  {{else}}
 *    {{#in-element destinationEl insertBefore=null}}the block{{/in-element}}
 *  {{/if}}
 *  ```
 *
 * It also thrown an error if called with less than two arguments.
 */
module.exports = class EmberMaybeInElementAstTransform {
  constructor(options) {
    this.options = options;
  }

  transform(ast) {
    let walker = new this.syntax.Walker();

    let b = this.syntax.builders;

    walker.visit(ast, function(node) {
      if (node.type === 'BlockStatement' && node.path.original === 'maybe-in-element') {
        if (node.params.length < 2) {
          throw new Error('{{#maybe-in-element}} requires two arguments. The first is the destination element and the second is the `renderInPlace` boolean flag');
        }
        let destinationElement = node.params[0];
        let renderInPlace = node.params[1];
        node.params = [];
        node.hash = b.hash([
          b.pair("destinationElement", destinationElement),
          b.pair("renderInPlace", renderInPlace),
        ]);
      }
    });

    return ast;
  }
};
