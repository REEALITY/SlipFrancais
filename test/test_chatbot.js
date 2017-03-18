
var sinon = require('sinon');
var dictionary = require('../src/chatbot/dictionary');
var Chatbot = require('../src/chatbot/chatbot');
var assert = require('assert');

describe('test the chatbot', function() {
  var chatbot;
  beforeEach(function() {
    chatbot = new Chatbot();
  });

  it('should answer to color choice', function() {
    var answer = chatbot.chat(dictionary.WHITE);
    assert.equal(answer, 'J\'ai compris que vous étiez '+dictionary.WHITE+'. Etes vous plutôt petit, moyen ou corpulent?');
    assert.equal(chatbot.state, dictionary.ASK_SIZE);
  });

  it('should answer to size choice', function() {
    chatbot.state = dictionary.ASK_SIZE;
    var config = {};
    var answer = chatbot.chat(dictionary.CORPULENT, config);
    assert.equal(answer, 'J\'ai compris que vous étiez '+dictionary.CORPULENT+'. Très bien, nous avons fini de préciser votre physionomie.');
    assert.equal(chatbot.state, dictionary.FINISHED);
    assert.equal(config.colorChoice, dictionary.FINISHED);
  });
});
