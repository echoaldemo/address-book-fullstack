const express = require('express');
const massive = require('massive');
const users = require('./controllers/users');
const contacts = require('./controllers/contacts')

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

  //USERS ENDPOINTS
  app.post('/api/users/register', users.register);
  app.post('/api/users/login', users.login);

  //CONTACTS ENDPOINTS
  app.post('/api/contacts/add/:id', contacts.create)
  app.get('/api/contacts/all/:id', contacts.getContacts)
  app.post('/api/contacts/sort/:id', contacts.sort)

  app.get('/api/contacts/:id', contacts.viewContact)
  app.patch('/api/contacts/:id', contacts.updateContact)
  app.delete('/api/contacts/:id', contacts.deleteContact)

  const PORT = 3001;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});