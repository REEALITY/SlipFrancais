
var sinon = require('sinon');
var CartBoardOverlay = require('../src/cart_board_overlay');
var $ = sinon.stub();
var css_classes = require('../src/css_classes');
var assert = require('assert');

describe('test cart board overlay', function() {
  it('should expand to 100% width', function() {
    var mock = { css: sinon.spy() };
    $.withArgs(css_classes.cart_board).returns(mock); 

    var cart_board = new CartBoardOverlay($);
    cart_board.show();

    assert(mock.css.calledWith('width', '100%'));
  });

  it('should reduce to 0% width', function() {
    var mock = { css: sinon.spy() };
    $.withArgs(css_classes.cart_board).returns(mock); 

    var cart_board = new CartBoardOverlay($);
    cart_board.hide();

    assert(mock.css.calledWith('width', '0%'));
  });

  it('should register a listener on close button clicked', function(done) {
    var mock = { on: sinon.stub().withArgs('click').yields() };
    $.withArgs(css_classes.cart_board_close_button).returns(mock); 

    var cart_board = new CartBoardOverlay($);
    cart_board.on_close_clicked(done);
  });
});
