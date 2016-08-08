var _        = require('lodash');
var config   = require('./config');
var Imagemin = require('imagemin');
var remove   = require('@djforth/ap_utils').delete.file;
var getPlugins = require('./get_plugins');

module.exports = function(file, path){
  var plugins, dest;
  dest   =  config.get('output') + file;
  remove(dest); // Remove old file
  plugins = getPlugins(config.get('plugins'));

  return function(cb){
    Imagemin(
      [path]
      , dest
      , {use: plugins}
    ).then(function(files){
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
