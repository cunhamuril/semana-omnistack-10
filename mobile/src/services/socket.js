import socketio from 'socket.io-client'

const socket = socketio('http://192.168.0.103:3333', {
  autoConnect: false,
})

/**
 * Função responsável por receber dados do backend em real time
 */
function subscribeToNewDevs(subscribeFunction) {
  socket.on('new-dev', subscribeFunction)
}

/**
 * Config
 */
function connect(latitude, longitude, techs) {
  socket.io.opts.query = {
    latitude,
    longitude,
    techs
  }

  socket.connect()

  // /**
  //  * Para testar
  //  */
  // // Recebe a mensagem que vem pelo backend em 3s
  // socket.on('message', text => {
  //   console.log(text)
  // })
}

function disconnect() {
  if (socket.connected) {
    socket.disconnect()
  }
}

export {
  connect,
  disconnect,
  subscribeToNewDevs
}