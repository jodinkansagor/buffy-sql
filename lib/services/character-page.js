const request = require('superagent');
const { parse } = require('node-html-parser');

const scrapeCharacterInformation = (name) => {
  return request.get(`https://buffy.fandom.com/wiki/${name}`)
    .then(res => parse(res.text))
    .then(html => {

      const info = html.querySelector('#mw-content-text');
      console.log(info);

      let image = html.querySelectorAll('.pi-image-thumbnail').length ? html.querySelectorAll('.pi-image-thumbnail')[0].rawAttrs.split('"')[1] : null;
      if (!image) {
        image = html.querySelector('.thumbimage') ? html.querySelector('.thumbumage').rawAttrs.split('"')[1] : null;
      }

      const labels = html.querySelectorAll('.pi-data-label') ? html.querySelectorAll('.pi-data-label').map(label => label.structuredText) : null;
      const values = html.querySelectorAll('.pi-data-value') ? html.querySelectorAll('.pi-data-value').map(value => value.structuredText) : null;
    

      const information = {};
      information.name = name;

      if (labels && values) {
        for (let i = 0; i < labels.length; i++) {
          if (labels[i] === 'Portrayed by') {
            information.actor = values[i];
          }
          else {
            information[labels[i].toLowerCase()] = values[i];
          }
        }
      }

      information.image = image;
      return information;
    })
    .catch(() => console.log('scraper error', name));
};

scrapeCharacterInformation('Spike')
  .then(res => console.log(res, 'RES'));

module.exports = {
  scrapeCharacterInformation
};
