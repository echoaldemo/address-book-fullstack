require('dotenv').config()
const express = require('express');
const massive = require('massive');
const users = require('./controllers/users');
const contacts = require('./controllers/contacts')
const groups = require('./controllers/groups')
const cors = require("cors");
const jwt = require('jsonwebtoken');


massive({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
}).then(db => {
  const app = express();

  app.set('db', db);

  app.use(express.json());
  app.use(cors());

  const auth = (req, res, next) => {
    if(!req.headers.authorization) {
      return res.status(401).end()
    }
    try {
      const token = req.headers.authorization.split(' ')[1];
      jwt.verify(token, process.env.SECRET_KEY)
      next()
    } catch (err) {
      console.error(err)
      res.status(401).end()
    }
  }

  //USERS ENDPOINTS
  app.post('/api/users/register', users.register);
  app.post('/api/users/login', users.login);

  app.use(auth)

  //CONTACTS ENDPOINTS
  app.post('/api/contacts/add/:id', contacts.create)
  app.get('/api/contacts/all/:id', contacts.getContacts)
  app.post('/api/contacts/sort/:id', contacts.sort)

  app.get('/api/contacts/:id', contacts.viewContact)
  app.patch('/api/contacts/:id', contacts.updateContact)
  app.delete('/api/contacts/:id', contacts.deleteContact)

  //GROUPS ENDPOINTS
  app.post('/api/groups/create/:id', groups.create);
  app.get('/api/groups/:id', groups.getGroups);
  app.patch('/api/groups/:id', groups.updateGroup);
  app.get('/api/group/:id', groups.viewGroup)

  app.listen(process.env.APP_PORT, () => {
    console.log(`Server listening on port ${process.env.APP_PORT}`);
  });
});