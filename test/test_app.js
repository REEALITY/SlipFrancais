
var css_classes = require('../src/css_classes');
var sinon = require('sinon');
var proxyquire = require('proxyquire');
var CartBoardOverlay = require('../src/cart_board_overlay');
var assert = require('assert');

describe('test the app', function() {
  var overlay_mock;
  var fiche_produit_mock;
  var chatbot_mock;
  var speech_mock;
  var app, deps;
  var add_to_cart_mock;
  var slip_items_mock;
  var size_items_mock;
  var cart_checkout_button_mock;

  beforeEach(function() {
    deps = {
      jQuery: sinon.stub(),
      window: {}
    };

    overlay_mock = sinon.createStubInstance(CartBoardOverlay);
    overlay_mock.addToCart = sinon.spy();
    overlay_mock.onCheckoutClick = sinon.spy();

    fiche_produit_mock = {};
    fiche_produit_mock.selectSize = sinon.spy();

    slip_manager_mock = {};
    slip_manager_mock.selectSize = sinon.spy();
  
    chatbot_mock = {};
    chatbot_mock.query = sinon.spy();

    speech_mock = {};
    speech_mock.init = sinon.spy();
    speech_mock.listen = sinon.spy();
    speech_mock.talk = sinon.spy();

    cart_checkout_button_mock = {};
    add_to_cart_mock = {};
    slip_items_mock = {};
    size_item_mock = {};
    default_size_item_mock = {};
    
    cart_checkout_button_mock.on = sinon.stub();
    add_to_cart_mock.on = sinon.stub();
    slip_items_mock.on = sinon.stub();
    size_item_mock.on = sinon.stub();
    default_size_item_mock.attr = sinon.stub();

    deps.jQuery.withArgs(css_classes.cart_checkout_button)
      .returns(cart_checkout_button_mock);
    deps.jQuery.withArgs(css_classes.add_to_cart).returns(add_to_cart_mock);
    deps.jQuery.withArgs(css_classes.slip_item).returns(slip_items_mock);
    deps.jQuery.withArgs(css_classes.size_item).returns(size_item_mock);
    deps.jQuery.withArgs('#size_item_m').returns(default_size_item_mock);

    app = proxyquire('../src/app', {
      './cart_board_overlay': sinon.spy(function() {
        return overlay_mock;
      }),
      './fiche_produit': fiche_produit_mock,
      './slip_manager': slip_manager_mock,
      './chatbot/chatbot': sinon.spy(function() {
        return chatbot_mock;
      }),
      './speech': sinon.spy(function() {
        return speech_mock;
      })
    });
  });

  describe('when clicking on the add to cart button', function() {
    it('should add the product to the cart', function() {
      speech_mock.init = sinon.stub().returns({ then: function() {} });
      add_to_cart_mock.on = sinon.stub().yields();
      app(deps); 

      assert(overlay_mock.addToCart.calledOnce);
    });

    it('should add a selected product (color and size) in the cart', function() {
      speech_mock.init = sinon.stub().returns({ then: function() {} });
      slip_manager_mock.attachClickListener = sinon.spy(function($, selected_slip) {
        selected_slip.slip = 'slip_bleu';
      });

      fiche_produit_mock.attachClickListener = sinon.spy(function($, selected_options) {
        selected_options.size = 'size_item_s';
      });

      add_to_cart_mock.on = sinon.stub();
      app(deps); 
      add_to_cart_mock.on.getCall(0).args[1]();

      assert.equal(overlay_mock.addToCart.getCall(0).args[0], 'blue_s');
      assert.equal(overlay_mock.addToCart.getCall(0).args[1].price, '35.0');
    });

    it('should redirect to login page when clicking on checkout', function() {
      speech_mock.init = sinon.stub().returns({ then: function() {} });
      overlay_mock.onCheckoutClick = sinon.stub().yields();
      app(deps); 

      assert(deps.window.location.startsWith("https://www.leslipfrancais.fr/authentification"));
    });
  });
});
