
var app = require('./app');
global.jQuery = require('jquery');

var deps = {
  jQuery: global.jQuery
}

jQuery(function(){
  app(deps); 
});
