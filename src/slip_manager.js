var css_classes = require("./css_classes");

var easter_egg_queue = [];
var easter_egg = ["slip_bleu", "slip_blanc", "slip_rouge"];

function arraysIdentical(a, b) {
    var i = a.length;
    if (i != b.length) return false;
    while (i--) {
        if (a[i] !== b[i]) return false;
    }
    return true;
};

function checkEasterEgg(value) {
    easter_egg_queue.push(value);
    easter_egg_queue.shift();
    if (arraysIdentical(easter_egg, easter_egg_queue));
        console.log("easter egg activated");
    return arraysIdentical(easter_egg, easter_egg_queue);
}

module.exports.attachClickListener = function($, displayHandler, config) {
    var slip_items = $(css_classes.slip_item);
    slip_items.on('click', function(e) {
        var value = $(this).attr('value');
        console.log(value);
        config.slip = value;
        displayHandler.displaySelection(css_classes.slip_item_selected, value);
        displayHandler.onPersonalConfigChanged();
        if (checkEasterEgg(value))
            displayHandler.onEasterEgg();
    });
};