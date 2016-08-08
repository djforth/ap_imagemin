#! /usr/bin/env node

var _ = require('lodash')
  , program = require('commander');
var remove = require('@djforth/ap_utils').delete
  , watch = require('@djforth/ap_utils').watcher;
var config = require('../plugin/config')
 , Imagemin = require('../plugin/imagemin_build')
 , ImageminInd = require('../plugin/imagemin_indv');

program
  .version('0.0.1')
  .option('-e, --ext <list>', 'exts to process')
  .option('-i, --input <folder>', 'input folder')
  .option('-o, --output <folder>', 'output folder')
  .option('-w, --watch', 'Watch scripts')
  .parse(process.argv);

var options = ['ext', 'input', 'output'];

options.forEach(function(op){
  if (!_.isEmpty(program[op]) || program[op]){
    config.set(op, program[op]);
  }
});

var imgmin = Imagemin();

var clear = remove.folder(config.get('output'), config.get('ext'));
clear(function(){
  imgmin();
});

if (program.watch){
  watch(config.get('input')).onAdd(ImageminInd).onChange(ImageminInd);
}
