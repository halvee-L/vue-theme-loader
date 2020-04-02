const cacheThemer = {}
const defaultKey = 'cache.timer'

function Themer() {
  this.cache = {}
}
Themer.prototype.add = function(theme, node, source) {
  let cache = this.cache
  let list = cache[theme] || (cache[theme] = [])
  list.push({
    node,
    source
  })
}
Themer.prototype.remove = function(theme) {
  delete this.cache[theme]
}
Themer.prototype.get = function(theme) {
  return this.cache[theme] || []
}
Themer.prototype.each = function(fn) {
  let cache = this.cache
  Object.keys(cache).forEach(function(key) {
    fn(key, cache[key])
  })
}

module.exports = function(key = defaultKey) {
  return cacheThemer[key] || (cacheThemer[key] = new Themer())
}
