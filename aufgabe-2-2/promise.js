const fs = require("node:fs/promises");

function leseDateiInhalt(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path).then((buffer) => {
      resolve(buffer.toString());
    }).catch((err) => reject(err));
  });
}

leseDateiInhalt('aufgabe-2-2/beispiel.txt')
  .then(inhalt => {
    console.log('Die Länge des Dateiinhalts beträgt:', inhalt.length);
  })
  .catch(err => {
    console.error('Fehler beim Lesen der Datei:', err);
  });
