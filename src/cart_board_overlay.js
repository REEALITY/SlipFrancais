
var css_classes = require('./css_classes');

module.exports = CartBoardOverlay;

function CartBoardOverlay($) {
  this._overlay = $(css_classes.cart_board);
  this._overlay_close_button = $(css_classes.cart_board_close_button);
}

CartBoardOverlay.prototype.show = function() {
  this._overlay.css('width', "100%");
};

CartBoardOverlay.prototype.hide = function() {
  this._overlay.css('width', "0%");
};

CartBoardOverlay.prototype.on_close_clicked = function(fn) {
  this._overlay_close_button.on('click', fn);
};
