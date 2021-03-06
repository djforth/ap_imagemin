var _        = require('lodash');
var config   = require('./config');
var Imagemin = require('imagemin');
  // , newer    = require('imagemin-newer');

var getPlugins = require('./get_plugins');
var getExtList = require('./get_input').getExtList;
var getInput = require('./get_input').getInput;

module.exports = function(){
  var ext_list, input, dest, plugins;
  ext_list = getExtList(config.get('ext'));

  input   = getInput(config.get('input'), ext_list);
  dest    = config.get('output');
  plugins = getPlugins(config.get('plugins'));
  // plugins = [newer(dest)].concat(plugins); // Removing for now
  return function(cb){
    Imagemin(
      [input]
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
