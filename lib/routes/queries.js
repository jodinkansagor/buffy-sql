const { client } = require('../utils/connect');
const Router = require('express');

module.exports = Router()

//gets all characters with paging

  .get('/', (req, res) => {
    const { page = 1, perPage = 50 } = req.query;

    const limit = +perPage;
    const offset = +perPage * (+page - 1);

    client.query(`
      SELECT 
        name,
        actor,
        image,
        status,
        affiliation,
        classification,
        born
      FROM character
      ORDER by name
      LIMIT $1 OFFSET $2
      ;
    `, [limit, offset], (err, results) => {
      if (err) throw err;
      res.status(200).json(
        {
          quantity: results.rows.length,
          results: results.rows
        });
    });
  });



