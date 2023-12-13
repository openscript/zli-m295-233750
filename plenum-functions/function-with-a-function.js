function functionWithFunctionParameter(functionParameter) {
  console.log(functionParameter());
}

function anotherFunction() {
  return "Hallo Welt";
}

functionWithFunctionParameter(anotherFunction);

// Variante
// functionWithFunctionParameter(() => "Hallo Welt");
