
var dictionary = require('./dictionary');

function extractEntity(query, entitySet) {
    var chosenOption = "";
    entitySet.forEach(function(elem) {
          if (query.indexOf(elem) !== -1)    
             chosenOption = elem;
    });
    return chosenOption;
}

module.exports = function() { 
    this.state = dictionary.ASK_COLOR;
    this.chat = function(query, config) {
        query = query.toLowerCase();
        if (this.state === dictionary.ASK_COLOR)
        {
            var chosenColor = extractEntity(query, dictionary.COLORS);
            if (chosenColor === "")
                return dictionary.DIDNT_UNDERSTAND;
            else
            {
                this.state = dictionary.ASK_SIZE; 
                var reply = dictionary.UNDERSTOOD + chosenColor+ ".";
                reply += " "+dictionary.CORPULENCE_QUESTION;
                return reply;
            }
        }
        else if (this.state == dictionary.ASK_SIZE)
        {
            var chosenCorpulence = extractEntity(query, dictionary.CORPULENCES);
            if (chosenCorpulence === "")
                return dictionary.DIDNT_UNDERSTAND;
            else
            {
                this.state = dictionary.FINISHED; 
                var reply = dictionary.UNDERSTOOD + chosenCorpulence+ ".";
                reply += " "+dictionary.FINISH;
                return reply;
            }
        }
    }
}