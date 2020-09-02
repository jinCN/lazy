module.exports = lazy

function lazy (definitions) {
  return lazy.define({}, definitions)
}

lazy.define = function (obj, definitions) {
  Object.entries(definitions).map(([k, v]) => {
    if (v instanceof Function) {
      Object.defineProperty(obj, k, {
        configurable: true,
        enumerable: true,
        get () {
          try {
            let value = v()
            Object.defineProperty(obj, k, {
              configurable: true,
              enumerable: true,
              writable: true,
              value
            })
            return value
          } catch (e) {
            Object.defineProperty(obj, k, {
              configurable: true,
              enumerable: true,
              get () {
                throw e
              },
              set (value) {
                Object.defineProperty(obj, k, {
                  configurable: true,
                  enumerable: true,
                  writable: true,
                  value
                })
              }
            })
            throw e
          }
        },
        set (value) {
          Object.defineProperty(obj, k, {
            configurable: true,
            enumerable: true,
            writable: true,
            value
          })
        }
      })
    } else {
      obj[k] = v
    }
  })
  return obj
}
