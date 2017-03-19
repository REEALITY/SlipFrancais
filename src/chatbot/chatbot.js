
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
                return dictionary.DIDNT_UNDERSTAND;
            else
            {
                if (chosenColor == dictionary.BLACK)
                    config.size = "L";    
                if (chosenColor == dictionary.WHITE)
                    config.size = "M";    
                //config.chosenColor = chosenColor;
                this.state = dictionary.ASK_SIZE; 
                reply = dictionary.UNDERSTOOD + chosenColor+ ".";
                reply += " "+dictionary.CORPULENCE_QUESTION;
            }
        }
        else if (this.state == dictionary.ASK_SIZE)
        {
            var chosenCorpulence = extractEntity(query, dictionary.CORPULENCES);
            if (chosenCorpulence === "")
                return dictionary.DIDNT_UNDERSTAND;
            else  
            {
                if (chosenCorpulence == dictionary.CORPULENT)
                    config.size = "L";    
                if (chosenCorpulence == dictionary.MOYEN)
                    config.size = "M";    
                config.chosenSize = chosenCorpulence;
                this.state = dictionary.FINISHED; 
                reply = dictionary.UNDERSTOOD + chosenCorpulence+ ".";
                reply += " "+dictionary.FINISH;
            }
        }
        displayHandler.onPersonalConfigChanged();
        return reply;
    };
};
