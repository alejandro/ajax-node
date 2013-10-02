var http = require('http')
  , fs = require('fs')
  , srv = http.createServer(handler)
  , call = 0

function handler(req, res){
  if (req.url === '/') return fs.createReadStream('./app/index.html').pipe(res)
  if (req.url === '/api/data.json') return sendJSON(req, res)
  if (req.url === '/api/reset') return resetCounter(req, res)
  if (req.url === '/app.js') {
    res.setHeader('Content-Type', 'text/javascript')
    return fs.createReadStream('./app/app.js').pipe(res)
  }
  res.end()
}

function sendJSON(req, res){
  var json = {
    id: call++,
    user: 'Alejandro Morales'
  }
  write(json, res)
}

function resetCounter(req, res){
  var json = {
    status: 'El contador ha sido reiniciado'
  }
  call = 0
  write(json, res)
}

function write(json, res){
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(json))
}

srv.listen(process.env.PORT || 8080, function(){
  console.log('Ajax Server listo en %d', this.address().port)
})