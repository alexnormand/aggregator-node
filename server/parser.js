var jsdom   = require('jsdom'),
    request = require('request');
 
module.exports.parseQuoteSiteFeed = function(quotesite, callback) {  
               
    request(quotesite.feedurl, function (error, response, body) {
        jsdom.env({
            html: body,            
            features: {
                QuerySelector: true
            },
            done: function (err, window) {                 
                var entries = window.document.querySelectorAll(quotesite.entrytag),
                    quotes  = [].map.call(entries, function(entry) {
            
                        return {                       
                            "date": entry.querySelector(quotesite.datetag).textContent,
                            "url": entry.querySelector(quotesite.urltag).textContent,  
                            "content": entry.querySelector(quotesite.contenttag)
                                            .textContent                  
                                            .replace(/<a.+>.*<\/a>|<img.+>/ig, '')
                        };
                    }); 

                quotes = quotesite.offset ? quotes.slice(quotesite.offset)
                                          : quotes;
                callback(quotes);
            }
        });
    });      
};       
                 
                 
