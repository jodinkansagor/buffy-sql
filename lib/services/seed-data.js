const client = require('./client');
const { scrapeAllChars } = require('./allChars');

run();

const charData = scrapeAllChars()
  .then(res => console.log(res));

console.log(charData);

async function run() {
  try {
    await client.query(`
        INSERT INTO character (name)
        VALUES ($1);
      `,
    ['test']);

    //     await Promise.all(
    //       charData.map(char => {
    //         return client.query(`
    //             INSERT INTO character (name)
    //             VALUES ($1)
    //           `,
    //         [char.name]);
    //       })
    //     );

    console.log('seed data load complete');
  }

  catch(err) {
    console.log(err);
  }

  finally {
    client.end();
  }
}
