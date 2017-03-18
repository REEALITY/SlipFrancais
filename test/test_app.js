
var css_classes = require('../src/css_classes');
var sinon = require('sinon');
var proxyquire = require('proxyquire');
var CartBoardOverlay = require('../src/cart_board_overlay');
var assert = require('assert');

describe('test the app', function() {
  var overlay_mock;
  var app;

  beforeEach(function() {
    overlay_mock = sinon.createStubInstance(CartBoardOverlay);
    overlay_mock.addToCart = sinon.spy();
    app = proxyquire('../src/app', {
      './cart_board_overlay': sinon.spy(function() {
        return overlay_mock;
      })
    });
  });

  describe('when clicking on the add to cart button', function() {
    var deps;
    beforeEach(function() {
      deps = {
        jQuery: sinon.stub()
      };
    });

    it('should add the product to the cart', function() {
      var add_to_cart_mock = {};
      add_to_cart_mock.on = sinon.stub().yields();

      deps.jQuery.withArgs(css_classes.add_to_cart).returns(add_to_cart_mock);
      deps.jQuery.returns({ data: function() { return 'AAA' } });
      app(deps); 

      assert(overlay_mock.addToCart.calledWith('AAA'));
      assert.equal(overlay_mock.addToCart.getCall(0).args[1].price, 10.0);
    });
  });
});
