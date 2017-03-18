
var articles = require('./articles');
var Cart = require('./cart');
var css_classes = require('./css_classes');


module.exports = function(deps) {
  var $ = deps.jQuery;
  var cart = new Cart(); 

  var add_to_cart_button = $(css_classes.add_to_cart);
  add_to_cart_button.on('click', function() {
    display_cart($); 
  });
};

function display_cart($) {
  $(css_classes.cart_board).show();
}
