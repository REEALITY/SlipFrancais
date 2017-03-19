
var dictionary = require('./dictionary');

function extractEntity(query, entitySet) {
    var chosenOption = "";
    entitySet.forEach(function(elem) {
          if (query.indexOf(elem) !== -1)    
             chosenOption = elem;
    });
    return chosenOption;
}

module.exports = function(displayHandler, config) {
    this.state = dictionary.ASK_COLOR;
    this.chat = function(query) {
        query = query.toLowerCase();
        var reply = "";
        if (this.state === dictionary.ASK_COLOR)
        {
            var chosenColor = extractEntity(query, dictionary.COLORS);
            if (chosenColor === "")
                return "";//dictionary.DIDNT_UNDERSTAND;
            else
            {
                config.skin = chosenColor;
                this.state = dictionary.ASK_SIZE; 
                reply = dictionary.UNDERSTOOD + chosenColor+ ".";
                reply += " "+dictionary.CORPULENCE_QUESTION;
            }
        }
        else if (this.state == dictionary.ASK_SIZE)
        {
            var chosenCorpulence = extractEntity(query, dictionary.CORPULENCES);
            if (chosenCorpulence === "")
                return "";
            else  
            {
                if (chosenCorpulence == dictionary.CORPULENT)
                    config.size = "L";    
                if (chosenCorpulence == dictionary.MOYEN)
                    config.size = "M";    
                if (chosenCorpulence == dictionary.SMALL)
                    config.size = "S";    
                this.state = dictionary.FINISHED; 
                reply = dictionary.UNDERSTOOD + chosenCorpulence+ ".";
                reply += " "+dictionary.FINISH;
            }
        }
        displayHandler.onPersonalConfigChanged();
        return reply;
    };
};
