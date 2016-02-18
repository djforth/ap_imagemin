#! /usr/bin/env node

var config     = require("../plugin/config")
 , remove      = require("@djforth/ap_utils").delete
 , Imagemin    = require('../plugin/imagemin_build')
 , program     = require('commander')
 , watchFolder = require("@djforth/ap_utils").watcher;


 program
  .version('0.0.1')
  .option('-e, --ext <list>', 'exts to process')
  .option('-i, --input <folder>', 'input folder')
  .option('-o, --output <folder>', 'output folder')
  .option('-w, --watch', 'Watch scripts')
  .parse(process.argv);

var options = ["ext", "input", "output"]

options.forEach(function(op){
  if(!_.isEmpty(program[op]) || program[op]){
    config.set(op, program[op])
  }
});

var imgmin = Imagemin();

var clear = remove(config.get("output"), config.get("ext"))
clear(function(){
  imgmin.build();
})

if(program.watch){
  watchFolder(config.get("input")).onAdd(imgmin.build);
}