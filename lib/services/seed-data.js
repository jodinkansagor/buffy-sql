const client = require('../lib/client');
const nameScraper = require('./character-names');
const dataScraper = require('./character-page');

module.exports = async() => {
  const charNames = await nameScraper();
  const charData = await dataScraper();

  run();

  async function run() {
    try {
      await client.connect();

      await client.query(`
        INSERT INTO character (name, actor, image, status, affiliation, classification, born)
        VALUES ($1, $2, $3, $4, $5, $6, $7);
        `,
      [charNames.name, charData.actor, charData.image, charData.status, charData.affiliation, charData.classification, charData.born]);

      console.log('seed data load complete');
    }

    catch(err) {
      console.log(err);
    }

    finally {
      client.end();
    }
  }
};
