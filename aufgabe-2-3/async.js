function simuliereVerzoegerung(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  })
}

async function addiereNachVerzoegerung(a, b, ms) {
  console.log("Start")
  await simuliereVerzoegerung(ms);
  console.log("Ende")
  return a + b;
}

async function rechne() {
  const result = await addiereNachVerzoegerung(5, 10, 2000);
  console.log(result);
}

rechne();
