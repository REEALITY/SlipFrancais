var css_classes = require("./css_classes");

module.exports.attachClickListener = function($, displayHandler, config) {
    var slip_items = $(css_classes.slip_item);
    slip_items.on('click', function(e) {
        var value = $(this).attr('value');
        console.log(value);
        config.slip = value;
        displayHandler.displaySelection(css_classes.slip_item_selected, value);
        displayHandler.onPersonalConfigChanged();
    });
};