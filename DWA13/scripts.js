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

//Map province names to uppercase
const uppercasedProvinces = provinces.map((province) => province.toUpperCase());
console.log(uppercasedProvinces);

// Create a new array that has the amount of characters in each name.
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

// Use reduce to create an object indicating the province of an individual
const provinceObject = names.reduce((result, name, index) => {
  result[name] = provinces[index];
  return result;
}, {});

console.log(provinceObject);

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

//Using both filter and map. Convert all prices that are strings to numbers,
// and remove all products from the array that do not have prices.
// After this has been done then use reduce to calculate the combined price of all remaining products.
const combinedPrice = products
  .filter((product) => product.price !== "" && !isNaN(Number(product.price)))
  .map((product) => Number(product.price))
  .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log(combinedPrice);

// Task 11: Use reduce to concatenate all product names to create the following string.
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

//Calculate highest and lowest-priced items
const { highest, lowest } = products.reduce(
  (result, { product, price }) => {
    const numericPrice = parseFloat(price);
    if (!isNaN(numericPrice)) {
      if (result.highest === null || numericPrice > result.highest.price) {
        result.highest = { product, price: numericPrice };
      }
      if (result.lowest === null || numericPrice < result.lowest.price) {
        result.lowest = { product, price: numericPrice };
      }
    }
    return result;
  },
  { highest: null, lowest: null }
);

console.log(`Highest: ${highest.product}. Lowest: ${lowest.product}`);

// Recreate the object with changed keys using Object.entries and reduce
const recreatedObject = products.reduce((result, { product, price }) => {
  const renamedEntry = Object.entries({ name: product, cost: price });
  result.push(Object.fromEntries(renamedEntry));
  return result;
}, []);

console.log(recreatedObject);
