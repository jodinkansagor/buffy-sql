const { client } = require('../utils/connect');

client.connect()
  .then(() => {
    return client.query(`
    CREATE TABLE character (
      id SERIAL PRIMARY KEY NOT NULL,
      name TEXT UNIQUE NOT NULL,
      species TEXT,
      actor TEXT,
      description TEXT,
      image TEXT,
      status TEXT,
      affiliation TEXT[],
      classification TEXT[],
      BORN TEXT
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
