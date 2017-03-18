
var css_classes = require('../src/css_classes');
var sinon = require('sinon');
var proxyquire = require('proxyquire');
var CartBoardOverlay = require('../src/cart_board_overlay');
var assert = require('assert');

describe('test the app', function() {
  var overlay_mock;
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

    cart_checkout_button_mock = {};
    add_to_cart_mock = {};
    slip_items_mock = {};
    size_item_mock = {};
    
    cart_checkout_button_mock.on = sinon.stub();
    add_to_cart_mock.on = sinon.stub();
    slip_items_mock.on = sinon.stub();
    size_item_mock.on = sinon.stub();

    deps.jQuery.withArgs(css_classes.cart_checkout_button)
      .returns(cart_checkout_button_mock);
    deps.jQuery.withArgs(css_classes.add_to_cart).returns(add_to_cart_mock);
    deps.jQuery.withArgs(css_classes.slip_item).returns(slip_items_mock);
    deps.jQuery.withArgs(css_classes.size_item).returns(size_item_mock);

    app = proxyquire('../src/app', {
      './cart_board_overlay': sinon.spy(function() {
        return overlay_mock;
      })
    });
  });

  describe('when clicking on the add to cart button', function() {
    it('should add the product to the cart', function() {
      add_to_cart_mock.on = sinon.stub().yields();
      deps.jQuery.returns({ data: function() { return 'AAA'; } });
      app(deps); 

      assert(overlay_mock.addToCart.calledWith('AAA'));
      assert.equal(overlay_mock.addToCart.getCall(0).args[1].price, 10.0);
    });

    it('should redirect to login page when clicking on checkout', function() {
      overlay_mock.onCheckoutClick = sinon.stub().yields();
      app(deps); 

      assert(deps.window.location.startsWith("https://www.leslipfrancais.fr/authentification"));
    });
  });
});
