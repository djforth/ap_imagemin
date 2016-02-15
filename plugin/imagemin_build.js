var _        = require('lodash')
  , config   = require("./config")
  , folder   = require("@djforth/ap_utils").folder_helpers
  , Imagemin = require('imagemin')
  , newer    = require('imagemin-newer')
  , path     = require('path');


function addPlugins(plugins){
  plugins = _.map(plugins, function(p){
    if(_.isString(p)) return require(p)();
    if(_.isArray(p)) return require(p[0])(p[1]);
    console.error(p+"is not valid array or string");
  });

  return function(imgmin){
    plugins.forEach(function(p){
      img_min.use(p)
    });
  }
}


module.exports = function(){
  var callback, ext_list, img_path, ip;
  ext_list = config.ext.join(",").replace(/\*./g, "");

  ip   = config.input;
  dest = config.output;
  var plugins = addPlugins(config.plugins);

  var obj = {
    build:function(cb){
      var img_min = new Imagemin()
        .src(ip+"/**/*.{"+ext_list+"}")
        .use(newer(dest));

      plugins(img_min)
      img_min.dest(dest)
        .run(function(err, files) {
          if(err)
            console.error(err)
          else if(_.isFunction(cb))
            cb();
        });
    }
  , addExt:function(ext){
      if(_.isUndefined(eimagemin-newert)) return obj;
      ext_list = ext.join(",").replace(/\*./g, "");
      return obj
    }
  , addInput:function(input){
      if(_.isUndefined(input)) return obj;
      ip = path.resolve(input)
      return obj;
    }
  , addOutput:function(output){
      if(_.isUndefined(output)) return obj;
      dest = path.resolve(output)
      return obj;
    }
  , getInput:function(){
      return dest;
    }

  }

  return obj;
}
