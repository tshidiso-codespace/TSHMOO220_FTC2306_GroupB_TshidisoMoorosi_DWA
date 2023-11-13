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

// Use forEach to console log each name with a matching province.
names.forEach((name, index) => console.log(`${name} (${provinces[index]})`));

// Create a new array with map that has the amount of characters in each name.
const nameLengths = names.map((name) => name.length);
console.log(nameLengths);

// TUsing sort to sort all provinces alphabetically.
const sortedProvinces = provinces.slice().sort();
console.log(sortedProvinces);

// Use filter to remove all provinces that have the word "Cape" in them.
const filteredProvinces = provinces.filter(
  (province) => !province.includes("Cape")
);
console.log(filteredProvinces.length);
