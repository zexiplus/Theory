# vue async update queue

vue 异步更新队列原理



## 参考链接

- [批量异步更新策略及 nextTick 原理](https://www.kancloud.cn/hanxuming/vue-iq/839713)



## 文件说明

- `index.html` 浏览器入口文件
- `vue_async_update_queue.js` 参考链接1 《批量异步更新策略及 nextTick 原理》的vue 异步更新队列实现
- `my_vue_async_update_queue.js`  笔者vue 异步更新队列实现



## 函数解读



**my_vue_async_update_queue.js**

- **function nextTick**

  * `pending` 记录状态（是否开始新一轮事件循环队列）
  * `callbacks`用于存放当前任务队列的异步执行函数
  * `queueExecCallbacks` 设置当前`pending`为`false`并从`callbacks`循环取出异步函数执行

  ```js
  let pending = false;
  let callbacks = [];
  
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
  ```

- **class Watcher**

  - `uid`为每个watcher设置独一无二的id
  - `update`  当数据改变时 `watcher` 执行`update`方法, `update`方法内部调用`asyncUpdate`进行合并更新
  - `patch`  `update` 最终调用 `patch`进行Vnode的差异比对
  - `watchers` 存放下次任务队列的 更新的 观察者， 每个watcher都是唯一的。
  - `asyncUpdate`  调用 `nextTick` 在下一轮任务队列中 取出 `watchers` 中的每个 `watcher` 调用` patch`,  因为每个`watcher`都是唯一的 ， 所以不会再同一个 watcher上调用多次`patch`

  ```js
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
  ```

  