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
module.exports = function(is317OrGreater) {
  return function ({ syntax }) {
    const b = syntax.builders;

    let buildMaybeInElement;
    if (is317OrGreater) {
      buildMaybeInElement = function (destinationElement, renderInPlace, children) {
        return b.element("MaybeInElement", {
          attrs: [
            b.attr("@destinationElement", b.mustache(destinationElement)),
            b.attr("@renderInPlace", b.mustache(renderInPlace)),
          ],
          children
        });
      };
    } else {
      buildMaybeInElement = function (destinationElement, renderInPlace, children) {
        return b.element("MaybeInElement",
          [b.attr("@destinationElement", b.mustache(destinationElement)),b.attr("@renderInPlace", b.mustache(renderInPlace))],
          [],
          children,
        );
      };
    }

    return {
      name: "ember-maybe-in-element-transform",

      visitor: {
        BlockStatement(node) {
          if (node.path.original === "maybe-in-element") {
            if (node.params.length < 2) {
              throw new Error(
                "{{#maybe-in-element}} requires two arguments. The first is the destination element and the second is the `renderInPlace` boolean flag"
              );
            }
            let destinationElement = node.params[0];
            let renderInPlace = node.params[1];
            let newNode = buildMaybeInElement(
              destinationElement,
              renderInPlace,
              node.program.body
            );
            return newNode;
          }
        },
      },
    };
  }
};
