const request = require('superagent');
const { parse } = require('node-html-parser');

const findCharacterLink = html => html.querySelectorAll('.category-page__member-link');

const findCharacterNames = characterArray => {
  const names = characterArray.map(character => character.childNodes[0].rawText);
};

const scrapNames = url => {
  return request.get(url)
    .then(res => res.text)
    .then(parse)
    .then(findCharacterLink)
    .then(findCharacterNames)
    .then(names => names.filter(function(str) {
      return !str.includes('File:');
    }))
    .catch(err => console.log(err));
};


module.exports = {

}