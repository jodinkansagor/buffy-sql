const { client } = require('../utils/connect');

client.connect()
  .then(() => {
    return client.query(`
    CREATE TABLE character (
      id SERIAL PRIMARY KEY NOT NULL,
      name TEXT UNIQUE NOT NULL,
      actor TEXT,
      image TEXT,
      status TEXT,
      affiliation TEXT[],
      classification TEXT[],
      born TEXT
    );`
    )
      .then(
        () => console.log('create tables complete'),
        err => console.log(err)
      )
      .then(() => {
        client.end();
      });
  });
