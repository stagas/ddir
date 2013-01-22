
/**
 * Module dependencies.
 */

var fs = require('fs')
var normalize = require('path').normalize
var relative = require('path').relative

/**
 * get dir contents
 *
 * @param {string} path
 * @return {array} files
 */

var dir = exports.dir = function (path) {
  path = path.trim()
  var normal = normalize(relative(process.cwd(), path))
  if (!normal.length) normal = process.cwd()
  var stat
  try { stat = fs.statSync(normal) }
  catch (e) {
    normal = strip(normal, 1)
    try { stat = fs.statSync(normal) }
    catch (e) {
      console.error('not found "'+path+'"')
      process.exit(1)
    }
  }
  if (stat.isDirectory()) {
    return fs.readdirSync(normal)
      .sort()
      .map(function (el) {
        var full = normal+'/'+el
        var stat
        try { stat = fs.statSync(full) }
        catch (e) {
          return false
        }
        return {
          name: el
        , full: full
        , stat: stat
        }
      })
      .filter(Boolean)
  }
  else return [ { name: path, full: normal+'/'+path, stat: stat } ]
}

/**
 * Strip a string from some tail chars.
 *
 * @param {string} s 
 * @param {number} n of chars
 * @return {string} s
 */

function strip (s, n) {
  return s.substr(0, s.length-n-1)
}
