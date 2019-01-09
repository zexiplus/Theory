var p = new Promise((resolve, reject) => {
  let async = false
  if (async) {
    setTimeout(function() {
      console.log('promise init')
      resolve(666)
    }, 2000)
  } else {
    resolve(666)
  }
})

// 测试代码
p.then((value) => {
  console.log('then1', value)
  return value + 1
}).then((value) => {
  console.log(value)
  return value + 1
}).then((value) => {
  console.log(value)
  return value + 1
}).then((value) => {
  console.log(value)
  return value + 1
}).then((value) => {
  console.log(value)
  return value + 1
})
p.then((value) => {
  console.log('then2', value)
})