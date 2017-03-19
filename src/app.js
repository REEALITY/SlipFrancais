
var articles = require('./articles');
var Cart = require('./cart');
var slip_manager = require('./slip_manager');
var fiche_produit = require('./fiche_produit');
var css_classes = require('./css_classes');
var CartBoard = require('./cart_board_overlay');
var slip_selection_to_reference = require('./slip_selection_to_reference');
var Speech = require('./speech');
var Chatbot = require('./chatbot/chatbot');
var dictionary = require('./chatbot/dictionary');
var DisplayHandler = require('./display_handler');
var dictionary = require('./chatbot/dictionary');
var SalesWoman = require('./saleswoman');

function send_sentences_to_chatbot(chatbot, reply_callback) {
  return function(sentences) {
    for(var i=0; i<sentences.length; ++i) {
      console.log('understood %s', sentences[i]);
      var reply = chatbot.chat(sentences[i]);
      if(reply && reply_callback) {
        console.log('speak "%s"', reply);
        reply_callback(reply);
        return;
      }
      else {
        console.log('not matching');
      }
    }
  };
}

module.exports = function(deps) {
  var $ = deps.jQuery;
  var cart = new Cart(); 
  var cart_board = new CartBoard($);
  var speech = new Speech(deps);
  var saleswoman = new SalesWoman($);
  var personalConfig = {
                        slip: 'slip_bleu',
                        size: 'M',
                        skin : dictionary.WHITE,
                        dabber : "nodab"
                       };

  var displayHandler = new DisplayHandler($, personalConfig);
  var chatbot = new Chatbot(displayHandler, personalConfig);
  
  $(css_classes.add_to_cart).on('click', function() {
    var reference = slip_selection_to_reference(personalConfig.slip, 
      personalConfig.size);
    var article = articles[reference];
    cart_board.addToCart(reference, article);
  });

  cart_board.onCheckoutClick(function() { 
    redirect_to_login_page(deps.window);
  });

  slip_manager.attachClickListener($, displayHandler, personalConfig);
  fiche_produit.attachClickListener($, displayHandler, personalConfig);

  function chatbot_talk(message) {
    speech.talk(message);
  }

  speech.init()
  .then(function() {
    setTimeout(function() {
      speech.talk(dictionary.GREETINGS2);
    }, 2000);
  });
  
  var soundPlayed = false;
  $(css_classes.chanson).on('click', function() {
	  var entity = global.document.querySelector('.chanson[sound]');
	  if(soundPlayed) {
		entity.components.sound.pauseSound();
		soundPlayed = false;
	  }
	  else {
		entity.components.sound.playSound();
		soundPlayed = true;
	  }
  });
  saleswoman.on_clicked(function() {
    speech.talk(dictionary.COLOR_QUESTION);
    speech.listen(send_sentences_to_chatbot(chatbot, chatbot_talk));
  });

  displayHandler.onPersonalConfigChanged();

};

function redirect_to_login_page(window) {
  window.open("https://www.leslipfrancais.fr/authentification?multi-shipping=0&display_guest_checkout=0&back=https%3A%2F%2Fwww.leslipfrancais.fr%2Fcommande%3Fstep%3D1%26multi-shipping%3D0", '_blank');
}

