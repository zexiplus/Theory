var http = require('http')
var port = 8888
http.createServer(function(req, res) {
  if (req.url === '/sse') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*'
    });
    setInterval(function() {
      res.write(`data: ${new Date} \n\n`)
    }, 1000)
  }
}).listen(port, function() {
  console.log(`server is listening on ${port}`)
})