function asyncMock(gen) {
  let g = gen();
  recursiveCore.call(g);
}

function recursiveCore(value) {
  let g = this,
  res = g.next(value);
  if (res.done) return;
  let fn = res.value
  fn(function (value) {
    recursiveCore.call(g, value)
  })
}

asyncMock(function *() {
  let v1 = yield function(k) {
    setTimeout(function() {
      k('hello')
    }, 1000)
  }
  console.log(v1)

  let v2 = yield function(k) {
    setTimeout(function() {
      k('world')
    }, 1000)
  }
  console.log(v2)
})