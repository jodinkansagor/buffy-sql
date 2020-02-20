require('dotenv').config();
const app = require('./lib/app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
})