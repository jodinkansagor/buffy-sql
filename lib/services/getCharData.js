const { scrapeNames } = require ('./character-names');
const { scrapeCharacterInformation } = require('./character-page');
const loadChar = require('./loadChar');

const getCharData = async(url) => {
  const names = await scrapeNames(url);
  return Promise.all(names.map(name => scrapeCharacterInformation(name)));
  // const data = Promise.all(names.map(name => scrapeCharacterInformation(name)));
  // console.log(data);
};

const loadAllCharData = async() => {
  const allCharData = await getCharData('https://buffy.fandom.com/wiki/Category:Sunnydale_residents');

  console.log(allCharData);

  // return allCharData.map(char => loadChar(char));
};

loadAllCharData();

module.exports = getCharData;
