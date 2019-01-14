function yieldPromise(gen) {
  let g = gen()
  recursiveCroe(g)
}
function recursiveCroe(g, value) {
  let obj = g.next(value)
  let promise = obj.value
  if (obj.done) return
  Promise.resolve(promise).then(function(value) {
    recursiveCroe(g, value)
  })
}

yieldPromise(function *() {
  let v1 = yield new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve('hello')
    }, 2000)
  })

  console.log(v1)

  let v2 = yield new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve('world')
    }, 2000)
  })

  console.log(v2)
})