var _    = require("lodash")
  , path = require("path")


function setPaths(key, def){
  return function(path, obj){
    obj[key] =(_.isUndefined(path)) ? def : path;
    return obj;
  }
}

var defaults = {
    ext        : [
      "*.png"
    , "*.gif"
    , "*.jpg"
    , "*.jpeg"
    , "*.svg"
  ]
  , plugins:[
      ['imagemin-gifsicle', {interlaced: true}]
    , ['imagemin-jpegtran', {progressive: true}]
    , ['imagemin-optipng', {optimizationLevel: 3}]
    , "imagemin-svgo"
  ]
}

var pckage    = require(path.resolve("./package.json"));

if(!_.isUndefined(pckage.assets)){

  if(pckage.assets.assets_in){
    defaults = _.defaults({input:path.join(pckage.assets.assets_in, "images")}, defaults)
  }

  if(pckage.assets.assets_out){
    defaults = _.defaults({output:path.join(pckage.assets.assets_out)}, defaults);
  }

  if(pckage.assets.images){
    defaults  = _.defaults(pckage.assets.images, defaults);
  }
}

module.exports = defaults;