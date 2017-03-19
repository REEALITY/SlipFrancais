
var Promise = require('bluebird');

module.exports = SpeechSystem;

function SpeechSystem(deps) {
  this.Speech = deps.speaktts;
  this.annyang = deps.annyang;
}

SpeechSystem.prototype.init = function() {
  var that = this;
  return new Promise(function(resolve, reject) {
    that.Speech.default.init({
      'onVoicesLoaded': function(data) {
        resolve();
      },
      'lang': 'fr-FR',
      'volume': 0.6,
      'rate': 1.1,
      'pitch':1 
    });
  });
};


SpeechSystem.prototype.talk = function(message) {
  var that = this;
  this.pause_listening();
  this.Speech.default.speak({
    text: message,
    onError: function(e) {
      console.log('sorry an error occured.', e);
    },
    onEnd: function() {
      console.log('end speaking');
      that.resume_listening();
    }
  });
};

SpeechSystem.prototype.pause_listening = function() {
  console.log('Pause listening');
  this.annyang.pause();
};

SpeechSystem.prototype.resume_listening = function() {
  var that = this;
  console.log('Resume listening');
  setTimeout(function() {
    that.annyang.resume();
  }, 1000);
};

SpeechSystem.prototype.listen = function(result_callback) {
  console.log('Start listening');
  this.annyang.setLanguage('fr-FR');
  this.annyang.addCallback('result', function(phrases) {
    result_callback(phrases);
  });
  this.annyang.start();
};
