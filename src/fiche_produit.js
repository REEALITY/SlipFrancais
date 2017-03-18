var selection = require("./selection_in_view");
var css_classes = require("./css_classes");
var BKG_SUFFIX = "_bkg";

function select_size_option($, options, size_item) {
  var id = size_item.attr('id');
  options.size = id;
  selection.displaySelected($, css_classes.size_item_bkg, id, 
    selection.strategyVisible, BKG_SUFFIX);
}

module.exports.selectSize = select_size_option;

module.exports.attachClickListener = function($, selected_options) {
  var size_items = $(css_classes.size_item);
  size_items.on('click', function(e) {
    select_size_option($, selected_options, $(this));
  });
};

