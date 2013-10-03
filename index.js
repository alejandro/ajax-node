var http = require('http')
  , express = require('express')


var srv = express(), call = 0

srv.use(express.cookieParser())
srv.use(express.bodyParser())
srv.use(express.session({secret: 'secret-key', sid: 'otro id'}))
srv.use(express.static(__dirname + '/app'))
srv.set('port', process.env.PORT || 8080)

srv.get('/api/data.json', function(req, res){
  if (!req.session.call) req.session.call = 0
  res.json({
    id: req.session.call++,
    user: 'Alejandro Morales'
  })
})

srv.post('/api/reset', function(req, res){
  if (req.session.call) req.session.call = 0
  res.json({
    status: 'El contador ha sido reinciado'
  })
})


http.createServer(srv).listen(srv.get('port'), function(){
  console.log('Ajax Server listo en %d', this.address().port)
})