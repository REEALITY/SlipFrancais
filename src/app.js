
var articles = require('./articles');
var Cart = require('./cart');
var slip_manager = require('./slip_manager');
var css_classes = require('./css_classes');
var CartBoardOverlay = require('./cart_board_overlay');

var selected_slip = {slip : ""};
module.exports = function(deps) {
  var $ = deps.jQuery;
  var cart = new Cart(); 
  var cart_board_overlay = new CartBoardOverlay($);

  var add_to_cart_button = $(css_classes.add_to_cart);
  add_to_cart_button.on('click', function() {
    display_cart(cart_board_overlay); 
  });

  cart_board_overlay.on_close_clicked(function() {
    cart_board_overlay.hide();
  });
  slip_manager.attachClickListener($);
};

function display_cart(cart_board_overlay) {
  cart_board_overlay.show();
}
