
var rework = require('rework');
var mixins = require('..');
var fs = require('fs');
var path = require('path');
var read = fs.readFileSync;
var readdir = fs.readdirSync;

readdir('test/cases').forEach(function(file){
  if (~file.indexOf('.out')) return;
  var base = path.basename(file, '.css');
  var input = read('test/cases/' + file, 'utf8');
  var output = read('test/cases/' + base + '.out.css', 'utf8');
  
  describe(base, function(){
    it('should work', function(){
      var css = rework(input)
        .use(rework.mixin(mixins))
        .toString();
      
      css.should.equal(output);
    })
  })
});