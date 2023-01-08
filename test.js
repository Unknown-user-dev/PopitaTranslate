const translate = require('popitatranslate')

translate('fr', 'en', 'Bonjour, comment vas-tu ?', (error, translatedText) => {
    if (error) {
      console.error(error);
    } else {
      console.log(translatedText);
    }
  });