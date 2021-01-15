const client = require('./client');
const { scrapeAllChars } = require('./allChars');
const getCharData = require('./getCharData');

const loadChar = async(char) => {
  console.log('@@@@@@@@@@@@', 'loadChar function called', '@@@@@@@@@');

  await client.query(`
                INSERT INTO character (name, actor, image, status)
                VALUES ($1, $2, $3, $4);
              `,
  [char.name, char.actor, char.image, char.status])
    .catch(err => console.log('loadChar error', err));

  console.log('@@@@@@@@@@@@', 'loadChar function finished', '@@@@@@@@@');
};

loadChar({
  name: 'Cordelia Chase',
  status: 'Deceased (Ascended)',
  actor: 'Charisma Carpenter',
  image: 'https://static.wikia.nocookie.net/buffy/images/f/fd/AS2_017_Cordelia.jpg/revision/latest/scale-to-width-down/350?cb=20190124021639'
});

async function run(url) {
  try {
    const allCharData = await getCharData(url);

    console.log(allCharData);

    return allCharData.map(char => loadChar(char));
  }

  catch(err) {
    console.log('error in seed-data.js', err);
  }

  finally {
    client.end();
  }
}

run('https://buffy.fandom.com/wiki/Category:Sunnydale_residents');
