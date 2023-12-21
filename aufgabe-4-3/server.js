const express = require('express');
const app = express();
const port = 3000;

// Hier lade ich die Express JSON Middleware, damit ich an meine Endpunkte JSON-Daten im Body senden kann und diese direkt als JavaScript Objekt verfügbar werden.
app.use(express.json());

// generated with ChatGPT
let books = [
  { isbn: "978-0143124177", title: "The Goldfinch", year: "2013", author: "Donna Tartt" },
  { isbn: "978-0307277671", title: "The Road", year: "2006", author: "Cormac McCarthy" },
  { isbn: "978-0553386790", title: "The Book Thief", year: "2005", author: "Markus Zusak" },
  { isbn: "978-0812995343", title: "All the Light We Cannot See", year: "2014", author: "Anthony Doerr" },
  { isbn: "978-0375831003", title: "The Curious Incident of the Dog in the Night-Time", year: "2003", author: "Mark Haddon" },
  { isbn: "978-1501132957", title: "The Underground Railroad", year: "2016", author: "Colson Whitehead" },
  { isbn: "978-0679735779", title: "Beloved", year: "1987", author: "Toni Morrison" },
  { isbn: "978-0316769488", title: "The Catcher in the Rye", year: "1951", author: "J.D. Salinger" },
  { isbn: "978-0143039433", title: "Never Let Me Go", year: "2005", author: "Kazuo Ishiguro" },
  { isbn: "978-0345804310", title: "Gone Girl", year: "2012", author: "Gillian Flynn" }
];

let lends = [];

// Books
app.get('/books', (request, response) => {
  response.send(books);
});

app.get('/books/:isbn', (request, response) => {
  response.send(books.find((book) => book.isbn === request.params.isbn ))
});

app.post('/books', (request, response) => {
  // immutable manipulation
  books = [...books, request.body];
  // mutable manipulation
  // books.push(request.body);
  response.status(201).send(books);
});

app.put('/books/:isbn', (request, response) => {
  books = books.map((book) => book.isbn === request.params.isbn ? request.body : book);
  /*
  books = books.map((book) => {
    if(book.isbn === request.params.isbn) {
      return request.body;
    } else {
      return book;
    }
  });
  */
  response.send(books);
});

app.patch('/books/:isbn', (request, response) => {
  const keys = Object.keys(request.body);
  const oldBook = books.find((book) => book.isbn === request.params.isbn );
  keys.forEach((key) => oldBook[key] = request.body[key]);
  books = books.map((book) => book.isbn === request.params.isbn ? oldBook : book);
  response.send(books);
});

app.delete('/books/:isbn', (request, response) => {
  books = books.filter((book) => book.isbn !== request.params.isbn);
  response.send(books);
});

// Lends
app.get('/lends', (request, response) => {
  response.send(lends);
});

app.get('/lends/:id', (request, response) => {
  response.send(lends.find((lend) => lend.id === request.params.id))
});

app.post('/lends', (request, response) => {
  const newLend = request.body;
  newLend['borrowed_at'] = new Date().toISOString();
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
