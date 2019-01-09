(function() {
  function yieldPromise(generator){
    var iterator = generator();
    recursiveCore.call(iterator);
  }
  
  function recursiveCore(feedback){
    var iterator = this;
    var result = iterator.next(feedback);
    if(result.done){
        return;
    }
  
    var promise = result.value;
    Promise.resolve(promise).then(function(v){
        recursiveCore.call(iterator,v);
    });
  }
  
  // test code 
  yieldPromise(function*(){
    var v1 = yield new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve('Hello 1');
        },1500);
    });
  
    console.warn(v1);
  
    var v2 = yield new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve('World 1');
        },1500);
    });
  
    console.warn(v2);
  });
})()

