 
var app = require('./app');
global.jQuery = require('jquery');

var deps = {
  'jQuery': global.jQuery,
  'window': window
};

jQuery(function(){
  app(deps); 
});
