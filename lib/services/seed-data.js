const client = require('./client');
const { scrapeAllChars } = require('./allChars');

run();

const loadChar = async(char) => {
  console.log('@@@@@@@@@@@@', 'loadChar function called', '@@@@@@@@@');

  await client.query(`
                INSERT INTO character (name, actor, image, status, affiliation, classification, born)
                VALUES ($1, $2, $3, $4, $5, $6, $7);
              `,
  [char.name, char.actor, char.image, char.status, char.affiliation, char.classification, char.born])
    .catch(err => console.log('loadChar error', err));

  console.log('@@@@@@@@@@@@', 'loadChar function finished', '@@@@@@@@@');
};

async function run() {
  try {
    const charData = await scrapeAllChars();
    console.log('*******charData********', charData[0], '*******charData********');
    
    await Promise.all(
      charData.map(char => {
        console.log('****', char.name, 'charName', '****');
        if(char !== undefined) loadChar(char);
      })
    );
  }

  catch(err) {
    console.log(err);
  }

  finally {
    client.end();
  }
}
