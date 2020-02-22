const { client } = require('../utils/connect');

client.connect()
  .then(() => {
    return client.query(`
    DROP TABLE IF EXISTS CHARACTER;
    `);
  })
  .then(
    () => console.log('drop tables complete'),
    err => console.log(err)
  )
  .then(() => {
    client.end();
  });
