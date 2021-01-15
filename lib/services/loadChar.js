const client = require('./client');

const loadChar = async(char) => {
  await client.query(`
                INSERT INTO character (name, actor, image, status, affiliation, classification, born)
                VALUES ($1, $2, $3, $4, $5, $6, $7);
              `,
  [char.name, char.actor, char.image, char.status, char.affiliation, char.classification, char.born])
    .catch(err => console.log('loadChar error', err));
};

module.exports = loadChar();
