const app = require('../lib/app');
const request = require('supertest');
const { pool } = require('../lib/utils/connect');

beforeAll(() => {
  pool.connect();
});

afterAll(() => {
  pool.end();
});

describe('routes', () => {
  it('can get all characters', () => {
    return request(app)
      .get('/api/v1/characters')
      .then(res => {
        expect(res.body.results).toHaveLength(0);
      });
  });
});
