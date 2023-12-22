const { randomUUID } = require('node:crypto');
const express = require('express');
const books = require('./books.js');
const app = express();
const port = 3000;

// Hier lade ich die Express JSON Middleware, damit ich an meine Endpunkte JSON-Daten im Body senden kann und diese direkt als JavaScript Objekt verfügbar werden.
app.use(express.json());

let lends = [];

app.use('/books', books);

// Lends
app.get('/lends', (request, response) => {
  response.send(lends);
});

app.get('/lends/:id', (request, response) => {
  response.send(lends.find((lend) => lend.id === request.params.id))
});

app.post('/lends', (request, response) => {
  const newLend = request.body;
  newLend['id'] = randomUUID();
  newLend['borrowed_at'] = new Date().toISOString();
  newLend['returned_at'] = null;

  if(!newLend['isbn'] || !newLend['customer_id']) {
    return response.status(422).send("isbn and customer_id are required!");
  }

  const lendsByCustomer = lends.filter((lend) => lend['customer_id'] === newLend['customer_id'] && !lend['returned_at']);

  if(lendsByCustomer.length >= 3) {
    return response.status(400).send("Customer has too many active lends.")
  }

  lends = [...lends, request.body];
  response.status(201).send(lends);
});

app.delete('/lends/:id', (request, response) => {
  const returnedLend = lends.find((lend) => lend.id === request.params.id)
  returnedLend['returned_at'] = new Date().toISOString();
  response.send(lends);
});

// Server
app.listen(port, () => {
  console.log(`Bookstore app listening on port ${port}`);
});
