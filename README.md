# ember-maybe-in-element

This addon exposes the construct `{{#maybe-in-element el renderInPlace insertBefore=null}}The block{{/maybe-in-element}}` to the contained block somewhere else in the page.

Despite its syntax, it's not implemented as a component but as an AST transform.

Essentially, it statically transforms:

```hbs
{{#maybe-in-element el renderInPlace insertBefore=null}}The block{{/maybe-in-element}}
```

to:

```hbs
{{#if renderInPlace}}The block{{else}}{{#in-element el insertBefore=null}}The block{{/-in-element}}{{/if}}
```

## Motivation

Although nothing prevents you from achieving the same thing by manually typing the expanded
handlebars code yourself, having two identical blocks is an invitation to forget to update one and introduce unwanted differences between both.
Also, less typing!

## Installation

The addon uses `ember-in-element-polyfill`, so its support matrix is the same (2.10+ at the time of this writing)

* Run `ember install ember-maybe-in-element`

Be aware that if you intend to use this addon from within another addon, you must move it from
`devDependencies` to `dependencies` in your `package.json`.


## Legal

[DockYard](http://dockyard.com/ember-consulting), Inc &copy; 2017

[@dockyard](http://twitter.com/dockyard)

[Licensed under the MIT license](http://www.opensource.org/licenses/mit-license.php)
