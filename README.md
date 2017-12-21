# ember-maybe-in-element

This addon exposes the construct `{{#maybe-in-element el renderInPlace}}The block{{/maybe-in-element}}` to the contained block somewhere else in the page.

Despite its syntax, it's not implemented as a component but as an AST transform.

Essentially, it statically transforms:

```hbs
{{#maybe-in-element el renderInPlace}}The block{{/maybe-in-element}}
```

to:

```hbs
{{#if renderInPlace}}The block{{else}}{{#-in-element el}}The block{{/-in-element}}{{/if}}
```

## Motivation

Although nothing prevents you from achieving the same thing by manually typing the expanded
handlebars code yourself, having two identical blocks is an invitation to forget to update one and introduce unwanted differences between both.
Also, less typing!

## Installation

The addon requires `#-in-element` to exist, so the minimum version of Ember supported is 2.10.

* Run `ember install ember-maybe-in-element`

Be aware that if you intend to use this addon from within another addon, you must move it from
`devDependencies` to `dependencies` in your `package.json`.


