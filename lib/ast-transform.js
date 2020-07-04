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
    let b = this.syntax.builders;
    this.syntax.traverse(ast, {
      BlockStatement(node) {
        if (node.path.original === "maybe-in-element") {
          if (node.params.length < 2) {
            throw new Error(
              "{{#maybe-in-element}} requires two arguments. The first is the destination element and the second is the `renderInPlace` boolean flag"
            );
          }
          let destinationElement = node.params[0];
          let renderInPlace = node.params[1];
          return b.block(
            b.path("if"),
            [renderInPlace],
            undefined,
            node.program,
            b.program([
              b.block(
                b.path("in-element"),
                [destinationElement],
                node.hash,
                node.program
              ),
            ])
          );
        }
      }
    });
    return ast;
  }
};
