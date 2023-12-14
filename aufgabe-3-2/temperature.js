const express = require('express');
const app = express();
const port = 3000;
const apiRequest = require('request');
const url = "https://app-prod-ws.meteoswiss-app.ch/v1/plzDetail?plz=";

app.use(express.static('public'));

function createZipApiPath(zip) {
  return `${url}${zip}00`;
}

app.get('/:zip', (request, response) => {
  apiRequest.get({
    url: createZipApiPath(request.params.zip),
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, res, data) => {
    if (err) {
      console.log('Error:', err);
    } else if (res.statusCode !== 200) {
      console.log('Status:', res.statusCode);
    } else {
      // data is already parsed as JSON:
      response.send(String(data.currentWeather.temperature));
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
