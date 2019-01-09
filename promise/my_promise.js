// 异步函数
const asyncFn = (function() {
  if (typeof process === 'object' && process.nextTick && typeof process.nextTick === 'function') {
    return process.nextTick
  } else if (typeof setImmediate === 'function') {
    return setImmediate
  } else {
    return setTimeout
  }
}())

class Promise {
  constructor(callback) {
    this._state = 0
    this._value = null // 值
    this._reason = null // 错误对象
    this._deferreds = []
    try {
      callback((value) => {
        resolve(value, this)
      }, (err) => {
        reject(err, this)
      })
    } catch(e) {
      reject(e, this)
    }
  }
  /**
   * 1. 构造空 promise 对象用于返回
   * 2. 判断当前 promise 状态， 若是 pending 则新建 deferred 并添加至 _deferreds队列 若不是pending 直接调用 handleResolve处理
   */
  then(onResolve, onReject) {
    let nextPromise = new Promise(() => {})

    let deferred = new Deferred(onResolve, onReject, this, nextPromise)
    if (this._state === 0) {
      this._deferreds.push(deferred)
    } else {
      handleResolve(deferred, nextPromise)
    }
    return nextPromise
  }
}

class Deferred {
  constructor(onResolve, onReject, promise, nextPromise) {
    this.onResolve = onResolve
    this.onReject = onReject
    this.promise = promise
    this.nextPromise = nextPromise
  }
}


/*
  1. 此函数被 then 方法调用
  2. 传入 deferred, promise(返回的)
*/
function handleResolve(deferred, nextPromise) {
    if (deferred.promise._state === 1) {
      // 接收 当前promise._value 作为 then回调函数的 的 实参value
      let res = deferred.onResolve(deferred.promise._value)
      // debugger
      nextPromise._state = 1
      nextPromise._value = res
    } 
    if (deferred.promise._state === 2) {
      deferred.onReject(deferred.promise._value)
    }
}

/* resolve function 在 Promise 构造函数中执行
  1. 把 pending 态变为 resolved , 并给当前 promise 赋值
  2. 循环取出 _deferreds 中的延迟触发对象，执行 then 保存的 onResolve 函数
  3. 递归调用自身， 直到不再返回promise对象
*/
function resolve(value, promise) {
  // promise 只能从pending变为 resolved or rejected
  if (!(promise instanceof Promise)) return
  if (promise._state !== 0) return
  promise._state = 1
  promise._value = value
  let deferred
  while (deferred = promise._deferreds.shift()) {
    let res = deferred.onResolve(value)
    resolve(res, deferred.nextPromise)
  }
}

function reject(err, promise) {
  // promise 只能从pending变为 resolved or rejected
  if (promise._state !== 0) return
  promise._state = 2
  promise._reason = err
  let deferred
  while( deferred = promise._deferreds.shift()) {
    deferred.onReject(err)
  }
}
