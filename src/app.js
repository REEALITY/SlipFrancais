
var articles = require('./articles');
var Cart = require('./cart');
var slip_manager = require('./slip_manager');
var fiche_produit = require('./fiche_produit');
var css_classes = require('./css_classes');
var CartBoard = require('./cart_board_overlay');


var selected_slip = {slip : ""};
var selected_options = {size : ""};

module.exports = function(deps) {
  var $ = deps.jQuery;
  var cart = new Cart(); 
  var cart_board = new CartBoard($);

  $(css_classes.add_to_cart).on('click', function() {
    var reference = $(this).data('ref');
    var article = articles[reference];
    cart_board.addToCart(reference, article);
  });

  cart_board.onCheckoutClick(function() {
    console.log(deps.window);
    redirect_to_login_page(deps.window);
  });

  slip_manager.attachClickListener($, selected_slip);
  fiche_produit.attachClickListener($, selected_options);
};

function redirect_to_login_page(window) {
    window.location = "https://www.leslipfrancais.fr/authentification?multi-shipping=0&display_guest_checkout=0&back=https%3A%2F%2Fwww.leslipfrancais.fr%2Fcommande%3Fstep%3D1%26multi-shipping%3D0";
}

