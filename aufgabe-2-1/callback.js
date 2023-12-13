function verdoppeln(zahl, callback) {
  const neueZahl = zahl * 2;
  callback(neueZahl);
}

verdoppeln(5, (ergebnis) => {
  console.log('Das Ergebnis ist: ', ergebnis);
});
