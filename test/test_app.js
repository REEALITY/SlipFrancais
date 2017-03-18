
var app = require('../src/app');
var css_classes = require('../src/css_classes');
var sinon = require('sinon');

describe('test the app', function() {
  describe('when clicking on the add to cart button', function() {
    var deps;
    beforeEach(function() {
      deps = {
        jQuery: sinon.stub()
      }
    });

    it('should display the cart', function(done) {
      var add_to_cart_mock = {};
      var cart_board_mock = {};

      add_to_cart_mock.on = sinon.stub().yields();
      cart_board_mock.show = sinon.spy(done);

      deps.jQuery.withArgs(css_classes.add_to_cart).returns(add_to_cart_mock)
      deps.jQuery.withArgs(css_classes.cart_board).returns(cart_board_mock)
      app(deps); 
    });
  });
});
