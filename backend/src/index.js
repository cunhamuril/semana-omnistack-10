const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')

const app = express()

/**
 * Conexão com o banco de dados
 */
mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-pc8aa.mongodb.net/semana10?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => console.error('Error: ' + err))

app.use(express.json()) // para poder utilizar requisições JSON em express

/**
 * Rotas
 */
app.use(routes)

// Porta em que sera executada o servidor
const PORT = 3333
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`)
})