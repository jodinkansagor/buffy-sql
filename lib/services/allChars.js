const { scrapeNames } = require('./character-names');
const { scrapeCharacterInformation } = require('./character-page');

const scrapeAllChars = async() => {
  const charNames = await scrapeNames('https://buffy.fandom.com/wiki/Category:Sunnydale_residents');

  const allCharData = async(charNames) => {
    return Promise.all(
      charNames.map(char => {
        const charInfo = scrapeCharacterInformation(char);

        return charInfo;
        // .then(console.log('ok'));
      }));
  };
  return await allCharData(charNames);
};

scrapeAllChars()
  .then(console.log('scrapeAllChars output'));

module.exports = {
  scrapeAllChars
};
