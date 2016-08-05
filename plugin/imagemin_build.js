var _        = require('lodash');
var config   = require('./config');
var Imagemin = require('imagemin')
  , newer    = require('imagemin-newer');

function addPlugins(plugins){
  return plugins.map(function(p){
    if (_.isString(p)) return require(p)();
    if (_.isArray(p)) return require(p[0])(p[1]);
    console.error(p + 'is not valid array or string');
    return null;
  });
}

function getExtList(ext){
  return ext.join(',').replace(/\*./g, '');
}

function getInput(input, ext_list){
  return config.get('input') + '/**/*.{' + ext_list + '}';
}

module.exports = function(){
  var ext_list, input, dest, plugins;
  ext_list = getExtList(config.get('ext'));

  input   = getInput(config.get('input'), ext_list);
  dest    = config.get('output');
  plugins = addPlugins(config.get('plugins'));
  plugins = [newer(dest)].concat(plugins);
  return function(cb){
    Imagemin(
      [input]
      , dest
      , {plugins: plugins}
    ).then(function(files){
      console.log(files);
      if (_.isFunction(cb)){
        cb(files);
      }
    }).catch(function(err){
      if (err){
        console.error(err);
      }
    });
  };
};
