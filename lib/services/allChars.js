const { scrapeNames } = require('./character-names');
const { scrapeCharacterInformation } = require('./character-page');

const scrapeAllChars = () => {
  scrapeNames('https://buffy.fandom.com/wiki/Category:Sunnydale_residents')
    .then(names => res.send(names));


  // const allCharData = charNames.map(char => {
  //   scrapeCharacterInformation(char);
  // });

  // console.log(allCharData);
  // return allCharData;
};

scrapeAllChars();
