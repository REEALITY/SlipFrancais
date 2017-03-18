
var sinon = require('sinon');
var article = require('../src/articles');
var Cart = require('../src/cart');
var assert = require('assert');

describe('test the cart', function() {
  var cart;
  beforeEach(function() {
    cart = new Cart();
  });

  it('should add an article to the cart', function() {
    var ref = 'AAAA';
    cart.add(ref, 4);
    assert(cart.has('AAAA'));
  });
  
  it('should not have the element', function() {
    assert(!cart.has('BBB'));
  });

  it('should store the quantity', function() {
    var ref = 'ABC';
    cart.add(ref, 3);
    assert.equal(cart.get_quantity('ABC'), 3);
  });

  it('should return 0 when item is not in the cart', function() {
    assert.equal(cart.get_quantity('ABCD'), 0);
  });

  it('should sum the items as they are added to the cart', function() {
    var ref = 'ABC';
    cart.add(ref, 3);
    assert.equal(cart.get_quantity('ABC'), 3);
    cart.add(ref, 3);
    assert.equal(cart.get_quantity('ABC'), 6);
  });
});
