function jsonp(url, callback, success) {
  var script = document.createElement('script')
  script.src = `${url}?callback=${callback.name}`
  script.onload = function() {
    success && success()
  }
  document.head.appendChild(script)
}

function hello(data) {
  console.log(`hello ${data.content}`)
}

jsonp('http://localhost:8080', hello)