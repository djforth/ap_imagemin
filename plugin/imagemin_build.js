var _        = require('lodash')
  , config   = require("./config")
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
      imgmin.use(p)
    });
  }
}


module.exports = function(){
  var ext_list, input, dest, plugins;
  ext_list = config.get("ext").join(",").replace(/\*./g, "");

  input   = config.get("input")+"/**/*.{"+ext_list+"}";
  dest    = config.get("output");
  plugins = addPlugins(config.get("plugins"));

  return function(cb){
    var img_min = new Imagemin()
      .src(input)
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

}
