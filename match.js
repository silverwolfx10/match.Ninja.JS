/**
 * $match
 * 
 * Recupera os matches quando a correspondência de uma string
 * contra uma Expressão Regular a funcao curry
 * 
 * @module $match
 * @author Cleber de Moraes Goncalves <cleber.programmer>
 * @example
 * 
 *        $match('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', /[A-E]/gi);
 *
 */
Ninja.module('$match', ['$curry'], function ($curry) {
  
  /**
   * Recupera os matches quando a correspondência de uma string
   * contra uma Expressão Regular a funcao curry
   * 
   * @public
   * @method $match
   * @param {String} a Lieteral de Caracteres
   * @param {RegExp} b Expressao regular
   * @return Array com validados da expressao regular
   * @example
   * 
   *        $match('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', /[A-E]/gi);
   * 
   */
  function match(a, b) {
    return a.match(b);
  }
  
  /**
   * Revelacao do servico $match, encapsulando a visibilidade das funcoes
   * privadas
   */
  return $curry(match);
  
});
