/* eslint-env node */
'use strict';

function deepClone(src) {
  return JSON.parse(JSON.stringify(src));
}

/**
 * From:
 *  ```hbs
 *  {{#maybe-in-element destinationEl renderInPlace}}the block{{/-in-element}}
 *  ```
 *
 * Generates:
 *  ```hbs
 *  {{#if renderInPlace}}
 *    the block
 *  {{else}}
 *    {{#-in-element destinationEl}}the block{{/-in-element}}
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
        node.path = b.path('if');
        node.params = [renderInPlace];
        node.inverse = b.program([
          b.block(
            b.path('in-element'),
            [destinationElement],
            node.hash,
            deepClone(node.program)
          )
        ]);
      }
    });

    return ast;
  }
};
