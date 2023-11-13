const provinces = [
  "Western Cape",
  "Gauteng",
  "Northern Cape",
  "Eastern Cape",
  "KwaZulu-Natal",
  "Free State",
];
const names = [
  "Ashwin",
  "Sibongile",
  "Jan-Hendrik",
  "Sifso",
  "Shailen",
  "Frikkie",
];

names.forEach((name) => console.log(name));

// Console log each name with a matching province.
names.forEach((name, index) => console.log(`${name} (${provinces[index]})`));

// Create a new array with map that has the amount of characters in each name.
const nameLengths = names.map((name) => name.length);
console.log(nameLengths);

// Sort all provinces alphabetically.
const sortedProvinces = provinces.slice().sort();
console.log(sortedProvinces);

// Use filter to remove all provinces that have the word "Cape" in them.
const filteredProvinces = provinces.filter(
  (province) => !province.includes("Cape")
);
console.log(filteredProvinces.length);

// Create a boolean array by using map and some to determine whether a name contains an S character.
const containsS = names.map((name) => name.includes("S"));
console.log(containsS);

const products = [
  { product: "banana", price: "2" },
  { product: "mango", price: 6 },
  { product: "potato", price: " " },
  { product: "avocado", price: "8" },
  { product: "coffee", price: 10 },
  { product: "tea", price: "" },
];

//console.log each product name to the console.
products.forEach((product) => console.log(product.product));

// filter out products that have a name longer than 5 characters.
const filteredProducts = products.filter(
  (product) => product.product.length <= 5
);
console.log(filteredProducts);

// Using both filter and map. Convert all prices that are strings to numbers,
// and remove all products from the array that do not have prices.
// After this has been done then use reduce to calculate the combined price of all remaining products.
const combinedPrice = products
  .filter((product) => product.price !== "" && !isNaN(Number(product.price)))
  .map((product) => Number(product.price))
  .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log(combinedPrice);

// Cncatenate all product names to create the following string.
const concatenatedNames = products.reduce(
  (accumulator, currentValue, index, array) => {
    accumulator += currentValue.product;
    if (index < array.length - 2) {
      accumulator += ", ";
    } else if (index === array.length - 2) {
      accumulator += " and ";
    }
    return accumulator;
  },
  ""
);
console.log(concatenatedNames);
