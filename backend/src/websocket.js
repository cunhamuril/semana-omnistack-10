const socketio = require('socket.io')

const parseStringAsArray = require('./utils/parseStringAsArray')
const calculateDistance = require('./utils/calculateDistance')

/**
 * Const para salvar conexões
 */
// O ideal seria salvar em um banco de dados, mas aqui neste app de estudo
// vai ser salvo em memória mesmo
const connections = []

let io

/**
 * Configuração
 */
exports.setupWebsocket = (server) => {
  io = socketio(server)

  io.on('connection', socket => {
    const { latitude, longitude, techs } = socket.handshake.query

    // A cada conexão é armazenada na const connections um objeto
    connections.push({
      id: socket.id,
      coordinates: {
        latitude: Number(latitude),
        longitude: Number(longitude),
      },
      techs: parseStringAsArray(techs),
    })

    // /**
    //  * Para testar
    //  */
    // setTimeout(() => {
    //   // O socket vai enviar esta mensagem para o frontend depois de 3s
    //   socket.emit('message', 'Hello OmniStack')
    // }, 3000)
  })
}

/**
 * Encontrar conexões
 */
exports.findConnections = (coordinates, techs) => {
  // Filtrar as conexões em um raio de 50km e tem as techs buscadas
  return connections.filter(connection => {
    return calculateDistance(coordinates, connection.coordinates) < 10
      // verifica se uma das tecnologias está inclusa no array de techs
      && connection.techs.some(item => techs.includes(item))
  })
}

/**
 * Enviar mensagem
 */
exports.sendMessage = (to, message, data) => {
  to.forEach(connection => {
    io.to(connection.id).emit(message, data)
  })
}