var css_classes = require('./css_classes');

function showFicheProduit($)
{
    var fiche_produit = $(css_classes.fiche_produit);
    fiche_produit.each(function() {
        $(this).attr("visible", "true");
    });
}

function makeClass(property)
{
  return "."+property;
}

module.exports = function($, config) 
{
  this.displayConfig = function(classId) {
    var objects = $(classId);
    objects.each(function(i) {
        var visible = true;
        var element = $(this);
        for (var property in config)
        {
          if (config.hasOwnProperty(property))
          { 
            console.log(element.attr('id'), property, config[property], element.hasClass(property), element.hasClass(config[property])); 
            if (element.hasClass(property) && config[property] && config[property] !== "")
            {
               visible = visible && element.hasClass(config[property]);
            }
          }
        }
        console.log(element.attr('id'), visible);
        element.attr("visible", visible);
    });
  };

  this.onPersonalConfigChanged = function() {
    this.displayConfig(".model");
    showFicheProduit($);
  };
  
  this.displaySelection = function(classId, value) {
    $(classId).each(function() {
        $(this).attr("visible", $(this).hasClass(value));
    });
  };
};
