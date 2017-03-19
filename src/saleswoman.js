
module.exports = SalesWoman;

var css_classes = require('./css_classes');

function SalesWoman($) {
  this.saleswoman = $(css_classes.saleswoman);
}

SalesWoman.prototype.on_clicked = function(fn) {
  console.log('saleswoman registered', this.saleswoman);
  this.saleswoman.on('click', fn); 
};
