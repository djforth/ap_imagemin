var _        = require('lodash');
var config   = require('./config');
var Imagemin = require('imagemin');
var remove   = require('@djforth/ap_utils').delete.file;
var getPlugins = require('./get_plugins');

function get_dest(input, output){
  return function(path){
    return path.replace(input, output);
  };
}

module.exports = function(file, path){
  var plugins, dest;
  let output = config.get('output').replace(file, '');
  dest = get_dest(config.get('input'), output)(path);

  try {
    remove(dest); // Remove old file
  } catch (err){
    console.log('No file', err);
  }

  plugins = getPlugins(config.get('plugins'));

  return function(cb){
    Imagemin(
      [path]
      , dest.replace(file, '')
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
