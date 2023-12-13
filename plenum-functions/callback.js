function greifeAufDatenbankZu(query, callback) {
  // Datenbankzugriff simulieren
  setTimeout(() => {
    const ergebnis = 'Datenbankergebnis: ' + query;
    callback(ergebnis);
  }, 1000);
}

greifeAufDatenbankZu('SELECT * FROM users', function(ergebnis) {
  console.log(ergebnis);
});
