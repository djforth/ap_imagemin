var _  = require('lodash');

module.exports = function addPlugins(plugins){
  return plugins.map(function(p){
    if (_.isString(p)) return require(p)();
    if (_.isArray(p)) return require(p[0])(p[1]);
    console.error(p + 'is not valid array or string');
    return null;
  });
}
