let pending = false;
let callbacks = [];

// Vue.prototype.$nextTick 简单实现
function nextTick(cb) {
  callbacks.push(cb);
  if (!pending) {
    pending = true;
    setTimeout(queueExecCallbacks, 0);
  }
}

function queueExecCallbacks() {
  pending = false
  let copy = callbacks.slice(0);
  callbacks.length = 0;
  copy.forEach(item => {
    item()
  })
}

let uid = 0

class Watcher {
  constructor() {
    this.uid = uid ++
  }
  update(param) {
    console.log(`watcher${this.uid} updated ${param}`)
    this.currentValue = param
    asyncUpdate(this)
  }
  patch() {
    console.log(`watcher${this.uid} patched currentValue ${this.currentValue}`)
  }
}

let watchers = {};

function asyncUpdate(watcher, param) {
  if (!watchers[watcher.uid]) {
    watchers[watcher.uid] = watcher
  }
  nextTick(function() {
    Object.keys(watchers).forEach(item => {
      watchers[item].patch()
    })
    watchers = {}
  })
}

let w1 = new Watcher(),
    w2 = new Watcher()

w1.update(1)
w1.update(2)
w1.update(3)

w2.update(1)
