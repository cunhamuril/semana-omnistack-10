const mongoose = require('mongoose')

/**
 * Schema do ponto de localização em maps
 */
const PointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  }
})

module.exports = PointSchema