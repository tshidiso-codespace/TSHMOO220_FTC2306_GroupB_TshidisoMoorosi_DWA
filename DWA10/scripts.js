const MAX_NUMBER = 15;
const MIN_NUMBER = -15;

const elements = {
  number: document.querySelector('[data-key="number"]'),
  subtract: document.querySelector('[data-key="subtract"]'),
  add: document.querySelector('[data-key="add"]'),
  reset: document.querySelector('[data-key="reset"]'),
};

const updateColor = () => {
  const value = parseInt(elements.number.value);
  const colorSteps = 250 / (MAX_NUMBER - MIN_NUMBER);
  const red = colorSteps * (MAX_NUMBER - value);
  const green = colorSteps * (value - MIN_NUMBER);

  elements.number.style.color = `rgb(${red}, ${green}, 0)`;

  // const isEdge = value >= MAX_NUMBER || value <= MIN_NUMBER

  // if (isEdge) {
  //     elements.number.style.color = 'red'
  // } else {
  //     elements.number.style.color = ''
  // } 2`
};

const subtractHandler = () => {
  const newValue = parseInt(elements.number.value) - 1;
  elements.number.value = newValue;

  if (elements.add.disabled) {
    elements.add.disabled = false;
  }

  if (newValue <= MIN_NUMBER) {
    elements.subtract.disabled = true;
  }
  updateColor();
};

const addHandler = () => {
  const newValue = parseInt(elements.number.value) + 1;
  elements.number.value = newValue;

  if (elements.subtract.disabled) {
    elements.subtract.disabled = false;
  }
  if (newValue >= MAX_NUMBER) {
    elements.add.disabled = true;
  }
  updateColor();
};

elements.reset.addEventListener("click", () => {
  elements.number.value = 0;
});

elements.subtract.addEventListener("click", subtractHandler);
elements.add.addEventListener("click", addHandler);

updateColor();
