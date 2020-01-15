/**
 * Esta função tem como objetivo transformar strings separadas por
 * vírgula em um array 
 */

module.exports = function parseStringAsArray(arrayAsString) {
  /**
   * Split: separar por virgulas
   * Map: percorrer todas techs
   * Trim: remover espaços antes e depois da palavra
   */
  return arrayAsString.split(',').map(tech => tech.trim())
}