
var annyang = require('annyang');
var speaktts = require('speak-tts');
var app = require('./app');
global.jQuery = require('jquery');

var deps = {
  'jQuery': global.jQuery,
  'window': window,
  'speaktts': speaktts,
  'annyang': annyang
};

jQuery(function(){
  app(deps); 
});
