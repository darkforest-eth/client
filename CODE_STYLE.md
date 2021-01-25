# Code Style

- Consistency and simplicity are the most important principles.
- Keep game logic out of React, and in game logic classes.
- Limit the use of functions outside of classes. I.e. Each function should probably belong to some
  even if it's just a static function.
- Be precise in your use of access modifiers. If a function does not need access to an instance,
  make it `static`. If it doesn't need to be `public` (which all fields and functions in typescript
  are by default), then mark it as `private`. Use `const` unless the variable will be modified.
- Annotate all return types of functions.
- Rarely annotate the types of locals.
- Briefly document all public fields and methods and classes with a description of their purpose.
- In method bodies, group similar declarations. Eg group all hook declarations, followed by all
  effect calls when writing functional React components.
- Group methods in classes by their visibility. `public` methods together, `private` methods together.
- When something is optional, use `undefined` rather than `null`, for consistency.
- Avoid excessive creation of arrays and objects in hot sections of code, particularly in the renderer.
- Classes should have a tighly scoped purpose.
- Avoid singletons, and React Context.
- When possible, avoid repeating yourself.
- Try to keep your functions under 10 statements. 20-30 for really complicated functions.
