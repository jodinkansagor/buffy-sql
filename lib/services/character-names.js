const request = require('superagent');
const { parse } = require('node-html-parser');

const findCharacterLink = html => html.querySelectorAll('.category-page__member-link');

const findCharacterNames = characterArray => {
  const names = characterArray.map(character => character.childNodes[0].rawText);
  return names.filter(name => !name.includes('Category:'));
};

const fixApostrophes = name => {
  return name.replace('&#039;', '\'');
};

const scrapeNames = url => {
  return request.get(url)
    .then(res => res.text)
    .then(parse)
    .then(findCharacterLink)
    .then(findCharacterNames)
    .then(names => names.filter(function(str) {
      return !str.includes('File:');
    }))
    .then(names => Promise.resolve(names.map(name => fixApostrophes(name))))
    .catch(err => console.log(err));
};

scrapeNames('https://buffy.fandom.com/wiki/Category:Sunnydale_residents')
  .then(names => console.log(names));

module.exports = {
  scrapeNames
};
