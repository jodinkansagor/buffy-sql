const client = require('./client');
const dataScraper = require('./character-page');

module.exports = async() => {
  dataScraper();

  run();

  async function run() {
    try {
      await client.connect();

      await client.query(`
        INSERT INTO character (name)
        VALUES ($1);
        `,
      [dataScraper.name]);

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
