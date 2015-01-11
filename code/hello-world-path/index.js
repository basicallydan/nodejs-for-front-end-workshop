// Documentation for the 'path' module is here: http://nodejs.org/api/path.html

var path = require('path');

var path1 = path.join('foo', 'bar', '/qux');

console.log(path1);

var path2 = path.join(path1, 'fnar');

console.log(path2);

var path3 = path.normalize('/Users/dan//Development/');

console.log(path3);

var path3 = path.normalize('/Users/dan//Development/../../whatever');

console.log(path3);