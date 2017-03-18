var selection = require("./selection_in_view");
var css_classes = require("./css_classes");

module.exports.attachClickListener = function($, selected_options) {
    var size_items = $(css_classes.size_item);
    size_items.on('click', function(e) {
        var id = $(this).attr('id');
        selected_options.size = id;
        selection.displaySelected($, css_classes.size_item_bkg, id, selection.strategyVisible);
    });
};