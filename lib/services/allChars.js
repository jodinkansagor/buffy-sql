const { scrapeNames } = require('./character-names');
const { scrapeCharacterInformation } = require('./character-page');

const scrapeAllChars = async() => {
  const charNames = await scrapeNames('https://buffy.fandom.com/wiki/Category:Sunnydale_residents');

  const allCharData = async(charNames) => {
    await charNames.map(char => {
      const charInfo = scrapeCharacterInformation(char)
        // .then(console.log('ok', char));
        .then(res => console.log(res));

      return charInfo
        .then(console.log('ok', char));
    });
  };

  const charData = await allCharData(charNames);
  return charData;
};

scrapeAllChars();

module.exports = {
  scrapeAllChars
};
