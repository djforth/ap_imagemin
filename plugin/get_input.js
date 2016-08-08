
exports.getExtList = function(ext){
  return ext.join(',').replace(/\*./g, '');
};

exports.getInput = function(input, ext_list){
  return input + '/**/*.{' + ext_list + '}';
};
