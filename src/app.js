
var articles = require('./articles');
var Cart = require('./cart');
var slip_manager = require('./slip_manager');
var css_classes = require('./css_classes');
var CartBoard = require('./cart_board_overlay');

var selected_slip = {slip : ""};
module.exports = function(deps) {
  var $ = deps.jQuery;
  var cart = new Cart(); 
  var cart_board = CartBoard($);

  $(css_classes.add_to_cart).on('click', function() {
    console.log('coucou');
    var reference = $(this).data('ref');
    var article = articles[reference];

    cart_board.addToCart(reference, article);
  });
  slip_manager.attachClickListener($, selected_slip);
};

