const net = require('net')


function getPort (port=3000) {
    return new Promise((resolve, reject) => {
        try{
            const server = net.createServer().listen(port)
            server.on('listening', function () { 
              server.close() 
              resolve(port)
            })
          
            server.on('error', function (err) {
              if (err.code === 'EADDRINUSE') { 
                port++
                getPort(port).then(res => {
                    resolve(res)
                })
              }
            })
        }catch(e){
            reject(e)
        }
        
    })
}

module.exports = getPort