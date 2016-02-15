#! /usr/bin/env node

var config    = require("../plugin/config")
 , folder     = require("@djforth/ap_utils").folder_helpers
 , imagemin    = require('../plugin/imagemin_build')()
 , program     = require('commander')
 , watchFolder = require("@djforth/ap_utils").watcher;


 program
  .version('0.0.1')
  .option('-e, --ext <list>', 'exts to process', [])
  .option('-i, --input <folder>', 'input folder')
  .option('-o, --output <folder>', 'output folder')
  .option('-w, --watch', 'Watch scripts')
  .parse(process.argv);

imagemin
  .addInput(program.input)
  .addOutput(program.output)
  .addExt(program.ext)

folder.clearFolder(
      config.output
    , config.ext
    , function(){
      imagemin.build();
    })


if(program.watch){
  watchFolder(imagemin.getInput()).onAdd(imagemin.build);
}