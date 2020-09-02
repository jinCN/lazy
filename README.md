# [@superjs](https://www.npmjs.com/org/superjs)/lazy
lazy object.

## Thought
If you want to define some lazy variable, you can either:
1. define a function instead, which is ugly
2. use a function to define a variable, such as `let local= lazy({a:()=>new Date()})`, then use it as `local.a`

## Example

```javascript
const lazy = require('@superjs/lazy')
const lazyLocal = lazy({
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

console.log(lazyLocal.noLazy) //
console.log(lazyLocal.lazy) // a little later than noLazy

console.log(lazyLocal.lazy) // never change again

lazyLocal.lazyNeverHappen = 1 // never invoke function
console.log(lazyLocal.lazyNeverHappen)
```

### recommend example for refactor
You have some variables that cost a lot, and want to make them lazy without changing any logic.

As an example, `require('typescript')` call may cost a lot, as used here:
```javascript
const ts=require('typescript') // expensive!!!
module.exports=()=>{
  console.log(ts)
  // a lot of ts here
}
```
Use `lazy()` to delay the `require`:
```javascript
const lazy = require('@superjs/lazy')
const lazyLocal = lazy({
  ts:()=>require('typescript') // expensive!!!
})
```

You cannot make a local variable to be lazy, so it's a must: every `ts` be refactor to `something.ts` like `lazyLocal.ts`.

It's recommended to use [Refactor]/[Inline...] in IDE to automate this for you:
```javascript
const lazy = require('@superjs/lazy')
const lazyLocal = lazy({
  ts:()=>require('typescript') // expensive!!!
})
const ts = lazyLocal.ts // [Refactor]/[Inline...] this

module.exports=()=>{
  console.log(ts)
  // a lot of ts here
}
```

You get perfectly what you want:
```javascript
const lazy = require('@superjs/lazy')
const lazyLocal = lazy({
  ts:()=>require('typescript') // expensive!!!
})

module.exports=()=>{
  console.log(lazyLocal.ts)
  // a lot of lazyLocal.ts here
}
```

## API
### `lazy(definitions)`

* `returns`: `Object`, return new object from `definitions`

convert function fields in `definitions` to lazy props, non-function stay the same. `lazy({a:1, b:()=>1})` returns `{a:1, b:lazyProp}` with lazyProp being basically 1


### `lazy.define(obj, definitions)`

 * `returns`: `Object`, return result object, return value is same as `obj`

same as `lazy()` but put props into existing `obj`.

## Compatibility
You can use @superjs/lazy in both nodejs and browser environment.
