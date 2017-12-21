/* eslint-env node */
'use strict';

const traverse = require('@glimmer/syntax').traverse;
const b = require('@glimmer/syntax').builders;

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
    traverse(ast, {
      BlockStatement(node) {
        if (node.path.original === 'maybe-in-element') {
          if (node.params.length < 2) {
            throw new Error('{{#maybe-in-element}} requires two arguments. The first is the destination element and the second is the `renderInPlace` boolean flag');
          }
          return b.block(
            b.path('if'),
            [node.params[1]],
            undefined,
            node.program,
            b.program([
              b.block(
                b.path('-in-element'),
                [node.params[0]],
                undefined,
                node.program
              )
            ])
          );
        }
      }
    });

    return ast;
  }
}
