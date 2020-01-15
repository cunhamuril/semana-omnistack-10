const {
  Router
} = require('express')

const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')

const routes = Router()

// Métodos HTTP: GET, POST, PUT, DELETE
/**
 * Tipos de parâmetros:
 * 
 * Query Params: req.query (Filtros, ordenação, paginação, ...)
 * Route Params: req.params (Identificar um recurso na alteração ou remoção)
 * Body: req.body (Dados para criação ou alteração de um registro)
 */

// Rotas de devs
routes.get('/devs', DevController.index)
routes.post('/devs', DevController.store)
// Exercícos por fora
routes.put('/devs/:id', DevController.update)
routes.delete('/devs/:id', DevController.destroy)

// Rota de busca
routes.get('/search', SearchController.index)

module.exports = routes;