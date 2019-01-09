# async/await

async/await 原理与实现



## 参考链接

- [ES next中async/await proposal实现原理是什么](https://www.zhihu.com/question/39571954)

* [ES6 generator](http://es6.ruanyifeng.com/#docs/generator)

## 文件说明

* `index.html` 入口文件
* `async1.js`  yield generator + promise 实现 async/await
* `async2.js`  yield generator 实现 async/await
* `async_origin.js` 原生async/await



## 函数解读

> async1.js

* **yieldPromise**
  * 接收一个生成器函数 `gengerator`
  * 执行`gengerator()` 返回一个迭代对象 `iterator`
  * 调用迭代函数`recursiveCore`绑定this为`iterator`

* **recursiveCore**
  * 函数内部this指向迭代对象`iterator`
  * 执行`iterator.next(feedback)`作为返回结果`result`({done: false, value: '123'})
  * 产出yield 为 `promise`对象，执行`then`，递归调用`recursiveCore`并把value传入, 当`iterator`的`result.done`为true时停止调用
  * 默认情况下`yield` 不返回值， 但 `next(param)`传入参数时， `yield` 返回传入的参数

```js
function yieldPromise(generator){
    var iterator = generator();
    recursiveCore.call(iterator);
}
  
function recursiveCore(feedback){
    var iterator = this,
        result = iterator.next(feedback);

    if(result.done){
        return;
    }

    var promise = result.value;
    Promise.resolve(promise).then(function(v){
        recursiveCore.call(iterator,v);
    });
}

// 运行yieldPromise
yieldPromise(function*(){
    var v1 = yield new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve('Hello 1');
        },1500);
    });
  
    console.warn(v1);
  
    var v2 = yield new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve('World 1');
        },1500);
    });
  
    console.warn(v2);
  });
```



> async2.js

```js
function yieldContinuation(generator){
    var iterator=generator();
    recursiveCore.call(iterator);
}
  
function recursiveCore(feedback){
    var iterator=this,
        result=iterator.next(feedback);

    if(result.done){
        return;
    }

    var yieldFunc=result.value;
    yieldFunc(function(v){
        recursiveCore.call(iterator,v);
    });
}

// test code
yieldContinuation(function*(){
    var v1=yield function(k){
        setTimeout(function(){
            k('Hello 2');
        },1500);
    };

    console.warn(v1);

    var v2 = yield function(k){
        setTimeout(function(){
            k('World 2');
        },1500);
    };

    console.warn(v2);
});
```





