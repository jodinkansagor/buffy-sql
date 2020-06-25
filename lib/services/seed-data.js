const client = require('../lib/client');
const nameScraper = require('./character-names');
const dataScraper = require('./character-page');
const { run } = require('jest');

module.exports = async() => {
  const charNames = await nameScraper();
  const charData = await dataScraper();

  run();

  async function run() {
    try {
      await client.query(`
        INSERT INTO character (name, actor, image, status, affiliation, classification, born)
        VALUES ($1, $2, $3, $4, $5, $6, $7);
      `,
      [charNames.name, charData.actor, charData.image, charData.status, charData.affiliation, charData.classification, charData.born]);
    }
  }

};



//   try {
//     // await client.connect();

//     await client.query(`
//             INSERT INTO users (email, display_name, hash)
//             VALUES ($1, $2, $3);
//             `,
//     ['person@mydomain.com', 'User Name', 'fewgw89']);

//     await Promise.all(
//       dmcData.map(color => {
//         return client.query(`
//                     INSERT INTO dmc_colors (id, description, red, green, blue, hex)
//                     VALUES ($1, $2, $3, $4, $5, $6);
//                 `,
//         [color.id, color.description, color.red, color.green, color.blue, color.hex]);
//       })
//     );

//     console.log('seed data load complete');
//   }
//   catch(err) {
//     console.log(err);
//   }
//   finally {
//     client.end();
//   }
    
// }
