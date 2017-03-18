var css_classes = require("./css_classes");
var selection = require("./selection_in_view");
var BKG_SUFFIX = "_bkg";
var MODEL_SUFFIX = "_model";
function showFicheProduit($)
{
    var fiche_produit = $(css_classes.fiche_produit);
    fiche_produit.each(function() {
        console.log($(this).attr("id"));
        $(this).attr("visible", "true");
    });
}

module.exports.attachClickListener = function($, selected_slip) {
    var slip_items = $(css_classes.slip_item);
    slip_items.on('click', function(e) {
        var id = $(this).attr('id');
        selected_slip.slip = id;
        selection.displaySelected($, css_classes.slip_item_bkg, id, selection.strategyScale, BKG_SUFFIX);
        selection.displaySelected($, css_classes.slip_model, id, selection.strategyVisible, MODEL_SUFFIX);
        showFicheProduit($);
    });
};