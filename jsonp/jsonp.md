# JSONP

jsonp原理与实现



## 参考链接

- [jsonp的原理与实现](https://zhangguixu.github.io/2016/12/02/jsonp/)

## 文件说明

- `index.html` 入口文件
- `jsonp.js` jsonp前端js代码
- `server.js` jsonp服务端代码



## 文件解读



**jsonp.js**

* **jsonp**

  jsonp函数接收3个参数， url ： 访问的地址， callback： 处理数据的回调函数， success(可选)：接收到数据时的回调函数 

  ```js
  function jsonp(url, callback, success) {
    var script = document.createElement('script')
    script.src = `${url}?callback=${callback.name}`
    script.onload = function() {
      success && success()
    }
    document.head.appendChild(script)
  }
  
  // use
  function hello(data) {
    console.log(`hello ${data.content}`)
  }
  
  jsonp('http://localhost:8080', hello)
  ```



**server.js**

解析请求url中的callback参数， 并返回callback(data)

```js
var http = require('http');
var urllib = require('url');
var port = 8080;
var data = {'content':'world'};

http.createServer(function(req, res){
    var params = urllib.parse(req.url,true);
    if(params.query.callback){
        console.log(params.query.callback);
        //jsonp
        var str = params.query.callback + '(' + JSON.stringify(data) + ')';
        res.end(str);
    } else {
        res.end('request with no params');
    }
    
}).listen(port,function(){
    console.log(`jsonp server is running on http://localhost:${port}`);
});
```

