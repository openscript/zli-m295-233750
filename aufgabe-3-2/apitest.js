const request = require('request');
let url ="https://app-prod-ws.meteoswiss-app.ch/v1/plzDetail?plz=818000";

request.get({
  url: url,
  json: true,
  headers: {'User-Agent': 'request'}
}, (err, res, data) => {
  if (err) {
    console.log('Error:', err);
  } else if (res.statusCode !== 200) {
    console.log('Status:', res.statusCode);
  } else {
    // data is already parsed as JSON:
    console.log(data.currentWeather.temperature);
  }
});
