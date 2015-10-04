// Creat object
var focus = {
  brand: "ford",
  model: "focus",
  reg: 2015,
  inStock: true,
  extras: ["AC", "Cruise Control", "Keyless Entry"]
}

// Convert object to JSON
var focusJSON = JSON.stringify(focus);
console.log(focusJSON);

// Convert JSOB back to an object
var focusObj = JSON.parse(focusJSON);
console.log(focusObj);