const axios = require('axios')

const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')

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
    }

    return res.json(dev)
  }
}