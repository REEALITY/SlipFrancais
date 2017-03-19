
var dictionary = require('./dictionary');

function extractEntity(query, entitySet) {
    var chosenOption = "";
    entitySet.forEach(function(elem) {
          if (query.indexOf(elem) !== -1)    
             chosenOption = elem;
    });
    return chosenOption;
}

var SIZE_S = "S";
var SIZE_M = "M";
var SIZE_L = "L";

module.exports = function(displayHandler, config) {
    this.state = dictionary.ASK_COLOR;
    this.chat = function(query) {
        query = query.toLowerCase();
        var reply = "";
        if (this.state === dictionary.ASK_COLOR)
        {
            var chosenColor = extractEntity(query, dictionary.COLORS);
            config.skin = dictionary.BLACK;
            config.size = SIZE_L;
            this.state = dictionary.ASK_SIZE; 
            reply = dictionary.UNDERSTOOD + chosenColor+ ".";
            reply += " "+dictionary.CORPULENCE_QUESTION;
        }
        else if (this.state == dictionary.ASK_SIZE)
        {
            var chosenCorpulence = extractEntity(query, dictionary.CORPULENCES);
            if (chosenCorpulence === "")
                return "";
            else  
            {
                config.size = SIZE_L;    
                this.state = dictionary.FINISHED; 
                reply = dictionary.UNDERSTOOD + chosenCorpulence+ ".";
                reply += " "+dictionary.FINISH;
            }
        }
        displayHandler.onPersonalConfigChanged();
        return reply;
    };
};
