const express = require('express');
const app = express();
const port = 3000;

app.post('/', (request, _) => {
  console.log(request);
  // we don't answer!
});

app.listen(port, () => {
  console.log(`Repro app listening on port ${port}`);
});
