const express = require('express');
const massive = require('massive');
const users = require('./controllers/users');
const cors = require("cors");

massive({
  host: 'localhost',
  port: 5432,
  database: 'address_book',
  user: 'postgres',
  password: 'addressbook',
}).then(db => {
  const app = express();

  app.set('db', db);

  app.use(express.json());
  app.use(cors());

  app.post('/api/users/register', users.register);
  app.post('/api/users/login', users.login);

  const PORT = 3001;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});