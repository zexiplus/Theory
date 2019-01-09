(function() {
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
  
    var v2=yield function(k){
        setTimeout(function(){
            k('World 2');
        },1500);
    };
  
    console.warn(v2);
  });
})()
