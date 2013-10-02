var http = require('http')
  , express = require('express')


var srv = express(), call = 0

srv.use(express.bodyParser())
srv.use(express.static(__dirname + '/app'))
srv.set('port', process.env.PORT || 8080)

srv.get('/api/data.json', function(req, res){
  res.json({
    id: call++,
    user: 'Alejandro Morales'
  })
})

srv.post('/api/reset', function(req, res){
  call = 0
  res.json({
    status: 'El contador ha sido reinciado'
  })
})


http.createServer(srv).listen(srv.get('port'), function(){
  console.log('Ajax Server listo en %d', this.address().port)
})