async function say(greeting){
  return new Promise(function(resolve,then){
      setTimeout(function(){
          resolve(greeting);
      },1500);
  });
}

(async function(){
  var v1=await say('Hello');
  console.log(v1);

  var v2=await say('World');
  console.log(v2);
}());


