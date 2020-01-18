const axios = require('axios')

const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')

const { findConnections, sendMessage } = require('../websocket')

/**
 * Nome de funções padrões de controllers:
 * 
 * Index: listar vários registros
 * Show: listar apenas um registro
 * Store: salvar registro
 * Update: alterar registro
 * Destroy: deletar registro
 */

module.exports = {
  async index(req, res) {
    const devs = await Dev.find()

    return res.json(devs)
  },

  async show(req, res) {
    const dev = await Dev.findOne({ _id: req.params.id })

    return res.json(dev)
  },

  async store(req, res) {
    const {
      github_username,
      techs,
      latitude,
      longitude
    } = req.body

    // Validar se já existe usuário cadastrado
    let dev = await Dev.findOne({
      github_username
    })

    if (!dev) {
      // Chamada a API do GitHub
      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)

      // Nesta desestruturação está o seguinte:
      // SE o name não exister, a variável name vai pegar o valor de login
      // Tipo "name = name ? name : login"
      const {
        name = login, avatar_url, bio
      } = apiResponse.data

      // Transformar a string em array
      const techsArray = parseStringAsArray(techs)

      // Localidade com dados de latitude e longitude
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      }

      // Cadastrar no banco de dados
      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
      })

      // Filtrar as conexões que estão há no máximo 50km de distância
      // e o que o novo dev tenha pelo menos uma das tecnologias filtradas

      // Manda mensagem para a conexão encontrada
      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techsArray
      )

      // Chamada a função de enviar mensagem passando os dados por params
      sendMessage(sendSocketMessageTo, 'new-dev', dev)
    }

    return res.json(dev)
  },


  /**
   * EXERCÍCIOS
   * (não fará parte da aplicação da semana omnistack originalmente)
   */
  async update(req, res) {
    const {
      github_username,
      techs,
      latitude,
      longitude
    } = req.body

    const {
      id
    } = req.params

    // Chamada a API do GitHub
    const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)

    const {
      name = login, avatar_url, bio
    } = apiResponse.data

    // Transformar a string em array
    const techsArray = parseStringAsArray(techs)

    // Localidade com dados de latitude e longitude
    const location = {
      type: 'Point',
      coordinates: [longitude, latitude],
    }

    dev = await Dev.findByIdAndUpdate(id, {
      github_username,
      name,
      avatar_url,
      bio,
      techs: techsArray,
      location,
    })

    if (!dev) return res.status(400).json({
      error: "Dev não encontrado!"
    })

    return res.json(dev)
  },

  async destroy(req, res) {
    const {
      id
    } = req.params

    dev = await Dev.findByIdAndDelete(id)

    if (!dev) return res.status(400).json({
      error: "Dev não encontrado!"
    })

    return res.json(dev)
  }
}