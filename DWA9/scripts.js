// /@ts-check

import { books, authors, genres, BOOKS_PER_PAGE } from "./data.js";

let page = 1;
let matches = books;

const itemsList = document.querySelector("[data-list-items]");
const showList = document.querySelector("[data-list-button]");
const searchOverlay = document.querySelector("[data-search-overlay]");
const settingsOverlay = document.querySelector("[data-settings-overlay]");

/**
 * takes the book creates an html to display book
 * @param {object} book
 * @returns {HTMLElement}
 */
const createBookHtml = (book) => {
  const { author, id, image, title } = book;

  const element = document.createElement("button");
  element.classList = "preview";
  element.setAttribute("data-preview", id);

  element.innerHTML = `
        <img
            class="preview__image"
            src="${image}"
        />
        
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>
    `;
  return element;
};

const starting = document.createDocumentFragment();
for (const { author, id, image, title } of matches.slice(0, BOOKS_PER_PAGE)) {
  let bookElement = createBookHtml({ author, id, image, title });
  starting.appendChild(bookElement);
}
itemsList.appendChild(starting);

/* The code below adds "All Genres" option to the "Genre" dropdown menu */
const genreHtml = document.createDocumentFragment();

function addAllGenresOption() {
  const firstGenreElement = document.createElement("option");
  firstGenreElement.value = "any";
  firstGenreElement.innerText = "All Genres";
  document.querySelector("[data-search-genres]").appendChild(firstGenreElement);
}

for (const [id, name] of Object.entries(genres)) {
  const element = document.createElement("option");
  element.value = id;
  element.innerText = name;
  genreHtml.appendChild(element);
}

document.querySelector("[data-search-genres]").appendChild(genreHtml);

/* The code below adds "All Authors" option to the "Author" dropdown menu */

const authorsHtml = document.createDocumentFragment();

function addAllAuthorsOption() {
  const firstAuthorElement = document.createElement("option");
  firstAuthorElement.value = "any";
  firstAuthorElement.innerText = "All Authors";
  document
    .querySelector("[data-search-authors]")
    .appendChild(firstAuthorElement);
}

for (const [id, name] of Object.entries(authors)) {
  const element = document.createElement("option");
  element.value = id;
  element.innerText = name;
  authorsHtml.appendChild(element);
}

document.querySelector("[data-search-authors]").appendChild(authorsHtml);

addAllGenresOption();
addAllAuthorsOption();

function setTheme(theme) {
  const darkColor = themeColour[theme].dark;
  const lightColor = themeColour[theme].light;
  document.documentElement.style.setProperty("--color-dark", darkColor);
  document.documentElement.style.setProperty("--color-light", lightColor);
  document.querySelector("[data-settings-theme]").value = theme;
}

/**
 * Object representing theme colours
 * @typedef {object} ThemeColour
 * @property {string} dark
 * @property {string} light
 */

/**
 * @type {{night: ThemeColour, day: ThemeColour}}
 */
const themeColour = {
  night: {
    dark: "255, 255, 255",
    light: "10, 10, 20",
  },
  day: {
    dark: "10, 10, 20",
    light: "255, 255, 255",
  },
};

/*the following code sets the preferred theme */
let preferredTheme;

if (window.matchMedia) {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    preferredTheme = "night";
  } else {
    preferredTheme = "day";
  }
  setTheme(preferredTheme);
}

/* The code below sets and updates the text on the button according to the number of books hidden deo as you click on the button*/
showList.innerText = `Show more (${books.length - BOOKS_PER_PAGE})`;
showList.disabled = matches.length - page * BOOKS_PER_PAGE > 0;

showList.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${
      matches.length - page * BOOKS_PER_PAGE > 0
        ? matches.length - page * BOOKS_PER_PAGE
        : 0
    })</span>
`;

/* Opening and closing overlays */
const handleSearchToggle = (event) => {
  if (searchOverlay.open) {
    searchOverlay.open = false;
  } else {
    searchOverlay.open = true;
    document.querySelector("[data-search-title]").focus();
  }
};

const handleSettingsToggle = (event) => {
  if (settingsOverlay.open) {
    settingsOverlay.open = false;
  } else settingsOverlay.open = true;
};

document
  .querySelector("[data-search-cancel]")
  .addEventListener("click", handleSearchToggle);
document
  .querySelector("[data-header-search]")
  .addEventListener("click", handleSearchToggle);
document
  .querySelector("[data-header-settings]")
  .addEventListener("click", handleSettingsToggle);
document
  .querySelector("[data-settings-cancel]")
  .addEventListener("click", handleSettingsToggle);

// document.querySelector("[data-list-close]").addEventListener("click", () => {
//   document.querySelector("[data-list-active]").open = false;
// });

/* Sets theme selected by user in settings */
document
  .querySelector("[data-settings-form]")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { theme } = Object.fromEntries(formData);

    setTheme(theme);

    settingsOverlay.open = false;
  });

/**
 * A handler that generates an array of books that match the filtered
 * search by creating an object
 * @param {Event} event
 */
document
  .querySelector("[data-search-form]")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);
    const result = [];

    for (const book of books) {
      let genreMatch = filters.genre === "any";

      for (const singleGenre of book.genres) {
        if (genreMatch) break;
        if (singleGenre === filters.genre) {
          genreMatch = true;
        }
      }

      if (
        (filters.title.trim() === "" ||
          book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
        (filters.author === "any" || book.author === filters.author) &&
        genreMatch
      ) {
        result.push(book);
      }
    }

    /* The code below displays message indicating no results no matches in filtered search */
    page = 1;
    matches = result;

    if (result.length < 1) {
      document
        .querySelector("[data-list-message]")
        .classList.add("list__message_show");
    } else {
      document
        .querySelector("[data-list-message]")
        .classList.remove("list__message_show");
    }

    /* Displays filtered books */
    itemsList.innerHTML = "";
    const newItems = document.createDocumentFragment();

    for (const { author, id, image, title } of result.slice(
      0,
      BOOKS_PER_PAGE
    )) {
      let bookElement = createBookHtml({ author, id, image, title });
      newItems.appendChild(bookElement);
    }

    /* button to show more books from filtered search*/
    itemsList.appendChild(newItems);
    showList.disabled = matches.length - page * BOOKS_PER_PAGE < 1;

    showList.innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${
          matches.length - page * BOOKS_PER_PAGE > 0
            ? matches.length - page * BOOKS_PER_PAGE
            : 0
        })</span>
    `;

    window.scrollTo({ top: 0, behavior: "smooth" });
    searchOverlay.open = false;
  });

showList.addEventListener("click", () => {
  const fragment = document.createDocumentFragment();

  for (const { author, id, image, title } of matches.slice(
    page * BOOKS_PER_PAGE,
    (page + 1) * BOOKS_PER_PAGE
  )) {
    let bookElement = createBookHtml({ author, id, image, title });
    fragment.appendChild(bookElement);
  }

  itemsList.appendChild(fragment);
  page += 1;
});

/* display preview overlay of selected book */
class BookPreviewOverlay extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Define the template for your overlay
    this.shadowRoot.innerHTML = `
      <dialog class="overlay" data-list-active>
        <div class="overlay__preview">
          <img class="overlay__blur" data-list-blur src=""/>
          <img class="overlay__image" data-list-image src=""/>
        </div>
        <div class="overlay__content">
          <h3 class="overlay__title" data-list-title></h3>
          <div class="overlay__data" data-list-subtitle></div>
          <p class="overlay__data overlay__data_secondary" data-list-description></p>
        </div>
        <div class="overlay__row">
          <button class="overlay__button overlay__button_primary" data-list-close>Close</button>
        </div>
      </dialog>

      <style>
      .overlay {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        border-width: 0;
        box-shadow: 0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12);
        animation-name: enter;
        animation-duration: 0.6s;
        z-index: 10;
        background-color: rgba(var(--color-light), 1);
      }
      
      @media (min-width: 30rem) {
        .overlay {
          max-width: 30rem;
          left: 0%;
          top: 0;
          border-radius: 8px;;
        }
      }
      
      .overlay__form {
        padding-bottom: 0.5rem;
        margin: 0 auto;
      }
      
      .overlay__row {
        display: flex;
        gap: 0.5rem;
        margin: 0 auto;
        justify-content: center;
      }
      
      .overlay__button {
        font-family: Roboto, sans-serif;
        background-color: rgba(var(--color-blue), 0.1);
        transition: background-color 0.1s;
        border-width: 0;
        border-radius: 6px;
        height: 2.75rem;
        cursor: pointer;
        width: 50%;
        color: rgba(var(--color-blue), 1);
        font-size: 1rem;
        border: 1px solid rgba(var(--color-blue), 1);
      }
      
      .overlay__button_primary {
        background-color: rgba(var(--color-blue), 1);
        color: rgba(var(--color-force-light), 1);
      }
      
      .overlay__button:hover {
        background-color: rgba(var((var(--color-blue))), 0.2);
      }
      
      
      .overlay__button_primary:hover {
        background-color: rgba(var(--color-blue), 0.8);
        color: rgba(var(--color-force-light), 1);
      }
      
      .overlay__input {
        width: 100%;
        margin-bottom: 0.5rem;
        background-color: rgba(var(--color-dark), 0.05);
        border-width: 0;
        border-radius: 6px;
        width: 100%;
        height: 4rem;
        color: rgba(var(--color-dark), 1);
        padding: 1rem 0.5rem 0 0.75rem;
        font-size: 1.1rem;
        font-weight: bold;
        font-family: Roboto, sans-serif;
        cursor: pointer;
      }
      
      .overlay__input_select {
        padding-left: 0.5rem;
      }
      
      .overlay__field {
        position: relative;
        display: block;
      }
      
      .overlay__label {
        position: absolute;
        top: 0.75rem;
        left: 0.75rem;
        font-size: 0.85rem;
        color: rgba(var(--color-dark), 0.4);
      }
      
      .overlay__input:hover {
        background-color: rgba(var(--color-dark), 0.1);
      }
      
      .overlay__title {
        padding: 1rem 0 0.25rem;
        font-size: 1.25rem;
        font-weight: bold;
        line-height: 1;
        letter-spacing: -0.1px;
        max-width: 25rem;
        margin: 0 auto;
        color: rgba(var(--color-dark), 0.8)
      }
      
      .overlay__blur {
        width: 100%;
        height: 200px;
        filter: blur(10px);
        opacity: 0.5;
        transform: scale(2);
      }
      
      .overlay__image {
        max-width: 10rem;
        position: absolute;
        top: 1.5m;
        left: calc(50% - 5rem);
        border-radius: 2px;
        box-shadow: 0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12);
      }
      
      .overlay__data {
        font-size: 0.9rem;
        display: -webkit-box;
        -webkit-line-clamp: 6;
        -webkit-box-orient: vertical;  
        overflow: hidden;
        color: rgba(var(--color-dark), 0.8)
      }
      
      .overlay__data_secondary {
        color: rgba(var(--color-dark), 0.6)
      }
      
      .overlay__content {
        padding: 2rem 1.5rem;
        text-align: center;
        padding-top: 3rem;
      }
      
      .overlay__preview {
        overflow: hidden;
        margin: -1rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .overlay__background {
        background: rgba(var(--color-dark), 0.6);
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
      }
      </style>
    `;

    // Add event listeners for your custom component
    this.shadowRoot
      .querySelector("[data-list-close]")
      .addEventListener("click", () => {
        this.closeOverlay();
      });
  }

  // Method to open the overlay and display book information
  openOverlay(book, authors) {
    this.shadowRoot.querySelector("[data-list-title]").innerText = book.title;
    this.shadowRoot.querySelector("[data-list-subtitle]").innerText = `${
      authors[book.author]
    } (${new Date(book.published).getFullYear()})`;
    this.shadowRoot.querySelector("[data-list-description]").innerText =
      book.description;
    this.shadowRoot.querySelector("[data-list-blur]").src = book.image;
    this.shadowRoot.querySelector("[data-list-image]").src = book.image;
    this.shadowRoot.querySelector(".overlay").open = true;
  }

  // Method to close the overlay
  closeOverlay() {
    this.shadowRoot.querySelector(".overlay").open = false;
  }
}
// Define your custom element
customElements.define("book-preview-overlay", BookPreviewOverlay);

document.addEventListener("DOMContentLoaded", () => {
  const bookPreviewOverlay = document.querySelector("book-preview-overlay");
  itemsList.addEventListener("click", () => {
    const target = event.target;

    if (target && target.getAttribute("data-preview")) {
      // Get the book ID from the clicked element's data-preview attribute
      const bookId = target.getAttribute("data-preview");

      // Find the active book with the matching ID
      const activeBook = books.find((book) => book.id === bookId);

      if (activeBook) {
        bookPreviewOverlay.openOverlay(activeBook, authors);
      }
    }
  });
});
