const { scrapeNames } = require('./character-names');
const { scrapeCharacterInformation } = require('./character-page');

async function scrapeAllChars() {
  const charNames = await scrapeNames('https://buffy.fandom.com/wiki/Category:Sunnydale_residents');

  async function allCharData(charNames) {
    await charNames.map(char => {
      return scrapeCharacterInformation(char)
        .then(res => console.log(res));
    });
  }

  return allCharData(charNames);
}

scrapeAllChars()
  .then(res => console.log(res));

