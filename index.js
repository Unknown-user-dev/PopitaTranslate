const request = require('request');


module.exports = function translate(srclanguage, language, text, callback) {
    const url = `https://translate.google.com/translate_a/single?client=gtx&sl=${srclanguage}&tl=${language}&dt=t&q=${encodeURIComponent(text)}`;

    request(url, (error, response, body) => {
        if (error) {
            callback(error);
            return;
        }
        if (response.statusCode === 400) {
            callback(new Error('Bad request'));
            return;
        }
        if (response.statusCode === 429) {
            callback(new Error('Too many requests'));
            return;
        }
        if (response.statusCode === 500) {
            callback(new Error('Internal server error'));
            return;
        }
        try {
            const data = JSON.parse(body);
            const translatedText = data[0][0][0];
            callback(null, translatedText);
        } catch(error) {
            callback(error);
        }
    });
}
