
var css_classes = require('../src/css_classes');
var sinon = require('sinon');
var proxyquire = require('proxyquire');
var CartBoardOverlay = require('../src/cart_board_overlay');

describe('test the app', function() {
  var overlay_mock;
  var app;

  beforeEach(function() {
    overlay_mock = sinon.createStubInstance(CartBoardOverlay);
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

    it('should display the cart board overlay', function(done) {
      var add_to_cart_mock = {};
      overlay_mock.show = sinon.spy(done);
      add_to_cart_mock.on = sinon.stub().yields();

      deps.jQuery.withArgs(css_classes.add_to_cart).returns(add_to_cart_mock);
      app(deps); 
    });

    it('should close the cart board when close button is clicked', function(done) {
      var add_to_cart_mock = {};
      add_to_cart_mock.on = sinon.stub().yields();

      overlay_mock.hide = sinon.spy(done);
      overlay_mock.on_close_clicked = sinon.stub();
      overlay_mock.on_close_clicked.yields();

      deps.jQuery.withArgs(css_classes.cart_board_close_button).returns(overlay_mock);
      deps.jQuery.withArgs(css_classes.add_to_cart).returns(add_to_cart_mock);
      app(deps); 
    });
  });
});
