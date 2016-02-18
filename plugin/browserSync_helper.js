var config    = require('@djforth/ap_imagemin').config
  , Imagemin    = require('@djforth/ap_imagemin').build
  , watch = require("@djforth/ap_utils").watcher;


var imgmin = Imagemin();

function squishImage(server){
  return function(){
    imgmin(server);
  }
}


module.exports = function(bs){
  var server = squishImage(bs());
  watch(config.get("input")).onAdd(server);
}