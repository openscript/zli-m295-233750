function greifeAufDatenbankZu(query) {
  return new Promise((resolve, reject) => {
    // Datenbankzugriff simulieren
    setTimeout(() => {
      const ergebnis = 'Datenbankergebnis: ' + query;
      resolve(ergebnis);
    }, 1000);
  });
}

const versprechen = greifeAufDatenbankZu('SELECT * FROM users');

versprechen
  .then(ergebnis => {
    console.log(ergebnis);
  })
  .catch(err => {
    console.error('Fehler beim Datenbankzugriff:', err);
  })
  .finally(() => {
    console.log("Finally :)")
  });
