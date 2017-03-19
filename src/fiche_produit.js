var selection = require("./display_handler");
var css_classes = require("./css_classes");

module.exports.attachClickListener = function($, displayHandler, config) {
  var size_items = $(css_classes.size_item);
  size_items.on('click', function(e) {
    var value = $(this).attr('value');
    config.size = value;
    displayHandler.displaySelection(css_classes.size_item_selected, value);
    displayHandler.onPersonalConfigChanged();
  });
};

