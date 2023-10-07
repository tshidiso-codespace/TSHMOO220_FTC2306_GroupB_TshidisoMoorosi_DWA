const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");
const body = document.getElementById("screen");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const entries = new FormData(event.target);
  const { dividend, divider } = Object.fromEntries(entries);
  if (dividend === "" || divider === "") {
    result.innerText =
      "Division not performed. Both values are required in inputs. Try again";
  } else if (typeof dividend !== Number || typeof divider !== Number) {
    body.innerHTML = "Something critical went wrong. Please reload the page";
    throw new Error("Invalid entry");
  } else if (
    dividend - Math.floor(dividend) !== 0 ||
    divider - Math.floor(divider) !== 0 ||
    dividend < 0 ||
    divider < 0
  ) {
    result.innerText =
      "Division not performed. Invalid number provided. Try again";
    throw new Error("Division not performed. Invalid number provided.");
  } else {
    result.innerText = Math.floor(dividend / divider);
  }
});
