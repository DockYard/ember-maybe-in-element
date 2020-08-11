# 2.0.0

Convert addon from a 100% AST approach to a runtime glimmer component named `<MaybeInElement @destinationElement={{foo}} @renderInPlace={{bar}}>` and a
AST transform that allows us to invoke that component as `{{#maybe-in-element foo bar}}`.