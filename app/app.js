!function(ns){
  var log

  window.addEventListener('DOMContentLoaded', function(){
    log = document.querySelector('#logger')
    setInterval(loop, 2000)  
  })
  

  function loop() {
    ajax('get', '/api/data.json', function (error, cb){
      var body
      if (error) return write('ajax error')
      try { // JSON.parse puede fallar algunas veces
        body = JSON.parse(cb)
        write(body.user + ': ' + body.id)
        if (body.id > 10) resetCounter()
      } catch (ex){
        write('error parsing respuesta')
      }
    })
  }

  function resetCounter(){
    ajax('post', '/api/reset', function (error, cb){
      if (error) return write('ajax error')
      try {
        body = JSON.parse(cb)
        write(body.status)
      } catch (exp){
        write('error parsing')
      }
    })
  }

  function ajax(method, url, cb){
    var client = new XMLHttpRequest()
    client.open(method, url)
    client.onreadystatechange = handler
    client.responseType = "json"
    client.setRequestHeader("Accept", "application/json")
    client.send()

    function handler() {
      if (this.readyState === this.DONE) {
        if (this.status === 200) { cb(null, this.response); }
        else { cb(this); }
      }
    }
  }

  function write(stuff){
    log.innerHTML += (stuff + '\n')
  }

}(window)