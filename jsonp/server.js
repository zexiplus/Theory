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