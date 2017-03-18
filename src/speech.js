
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
      'volume': 0.5,
      'rate': 1,
      'pitch':1 
    });
  });
};


SpeechSystem.prototype.talk = function(message) {
  this.Speech.default.speak({
    text: message,
    onError: function(e) {
      console.log('sorry an error occured.', e);
    },
    onEnd: function() {
      console.log('your text has successfully been spoken.');
    }
  });
};

function listen(result_callback) {
}

function pause_listening() {
  annyang.pause();
}

function resume_listening() {
  annyang.resume();
}

SpeechSystem.prototype.listen = function(result_callback) {
  annyang.setLanguage('fr-FR');
  annyang.addCallback('result', function(phrases) {
    result_callback(phrases);
  });
  annyang.start();
};
