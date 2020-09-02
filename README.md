# [@superjs](https://www.npmjs.com/org/superjs)/lazy
lazy object.

## Thought
If you want to define some lazy variable, you can either:
1. define a function instead, which is ugly
2. use a function to define a variable, such as `let local= lazy({a:()=>new Date()})`, then use it as `local.a`

## Example

```javascript
const lazy = require('@superjs/lazy')
const local = lazy({
  noLazy: new Date(),
  lazy: ()=>{
    console.log('lazy')
    return new Date()
  },
  lazyNeverHappen: ()=>{
    console.log('lazyNeverHappen')
    return new Date()
  },
})

console.log(local.noLazy) //
console.log(local.lazy) // a little later than noLazy

console.log(local.lazy) // never change again

local.lazyNeverHappen = 1 // never invoke function
console.log(local.lazyNeverHappen)
```

## API
### `lazy(definitions)`

* `returns`: `Object`, return new object from `definitions`

convert function fields in `definitions` to lazy props, other fields stay the same


### `lazy.define(obj, definitions)`

 * `returns`: `Object`, return result object, same as `obj`

same as `lazy()` but put props into existing obj.

## Compatibility
You can use @superjs/lazy in both nodejs and browser environment.
