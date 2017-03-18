
module.exports = Cart;

function Cart() {
  this._items = {};
}

Cart.prototype.add = function(reference, qty) {
  if(!(reference in this._items))
    this._items[reference] = qty;
  else
    this._items[reference] += qty;
};

Cart.prototype.has = function(reference) {
  return reference in this._items;
};

Cart.prototype.get_quantity = function(reference) {
  if(!(reference in this._items)) return 0;

  return this._items[reference];
};
