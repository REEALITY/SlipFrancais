var BKG_SUFFIX = "_bkg";
var SCALE = "1.1";

module.exports.strategyVisible = function(element, isSelected)
{
  element.attr("visible", ""+isSelected);
};

module.exports.strategyScale = function(element, isSelected)
{
  var scale = isSelected ? SCALE : 1;
  element.attr("scale", scale + " " + scale + " " + scale);
};

module.exports.displaySelected = function($, classId, id, strategy, suffix) {
  var backgrounds = $(classId);
  backgrounds.each(function(i) {
    var bkg_id = $(this).attr('id'); 
    strategy($(this), bkg_id === id+suffix);
  });
};
