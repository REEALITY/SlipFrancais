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
}

function checkEasterEgg(displayHandler, value, config) {
    easter_egg_queue.push(value);
    if (easter_egg_queue.length > 3)
        easter_egg_queue.shift();
    console.log(JSON.stringify(easter_egg_queue));
    if (arraysIdentical(easter_egg, easter_egg_queue))
    {
        console.log("easter egg activated");
        config.dabber = "dab";
        setTimeout(function() {
            config.dabber = "nodab";
            displayHandler.onPersonalConfigChanged();
        }, 1000);
    }
}

module.exports.attachClickListener = function($, displayHandler, config) {
    var slip_items = $(css_classes.slip_item);
    slip_items.on('click', function(e) {
        var value = $(this).attr('value');
        console.log(value);
        config.slip = value;
        displayHandler.displaySelection(css_classes.slip_item_selected, value);
        checkEasterEgg(displayHandler, value, config);    
        displayHandler.onPersonalConfigChanged();
    });
};