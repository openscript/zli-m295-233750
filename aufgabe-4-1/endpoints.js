const express = require('express');
const app = express();
const port = 3000;

const names = ["Julia", "Franz", "Jenny", "Yixuan", "Freddy"];

app.use(express.urlencoded({ extended: true }))

app.post('/names', (request, response) => {
  console.log(request.body.name);
  names.push(request.body.name);
  console.log(names);
  response.send(JSON.stringify(names));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
