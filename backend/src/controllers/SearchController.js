const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
  async index(req, res) {
    const {
      latitude,
      longitude,
      techs
    } = req.query;

    const techsArray = parseStringAsArray(techs)

    // Operadores MongoDB: https://docs.mongodb.com/manual/reference/operator/
    const devs = await Dev.find({
      techs: {
        $in: techsArray, // operador $in: tecnologias que estão dentro de techsArray        
      },
      location: {
        $near: { // operador $near: procurar por localização perto da logintude e latitude passadas
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          $maxDistance: 50000 // 5000 m = 50 km
        }
      }
    })


    return res.json({
      devs
    })
  }
}