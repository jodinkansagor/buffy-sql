const client = require('./client');
const { scrapeAllChars } = require('./allChars');

run();

async function run() {
  try {
    const charData = await scrapeAllChars();
    console.log('*******charData********', charData[0], '*******charData********');

    await Promise.all(
      charData.map(char => {
        console.log('****', char.name, 'charName', '****');
        return client.query(`
                INSERT INTO character (name, actor, image, status, affiliation, classification, born)
                VALUES ($1, $2, $3, $4, $5, $6, $7);
              `,
        [char.name, char.actor, char.image, char.status, char.affiliation, char.classification, char.born]);
      })
    );
    console.log('seed data load complete');
  }
  catch(err) {
    console.log(err);
  }
  finally {
    client.end();
  }
}
