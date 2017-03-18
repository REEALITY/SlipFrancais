var css_classes = require("./css_classes");

var BKG_SUFFIX = "_bkg";
var SCALE = "1.05";

function displaySelected($, id) {
    var slip_items_bkg = $(css_classes.slip_item_bkg);
    slip_items_bkg.each(function(i) {
        var bkg_id = $(this).attr('id'); 
        console.log(bkg_id, id+BKG_SUFFIX);
        if (bkg_id == id+BKG_SUFFIX) {
            $( this ).attr("scale", SCALE+" "+SCALE+" "+SCALE);
        }
        else {
            $( this ).attr("scale", "1 1 1");
        }
    });
}

module.exports.attachClickListener = function($, selected_slip) {
    var slip_items = $(css_classes.slip_item);
    slip_items.on('click', function(e) {
        var id = $(this).attr('id');
        selected_slip.slip = id;
        displaySelected($, id);
    });
};