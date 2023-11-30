// import {
//   LitElement,
//   html,
//   css,
// } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

// const tree = html` <div>123<span>123</span></div> `;
// console.log(tree);

export class MyElement extends LitElement {
  static styles = css`
    .header {
      text-align: center;
      background-color: #424250;
    }

    .header__title {
      font-size: 3rem;
      font-weight: 900;
      color: #6a6a76;
    }
  `;
  render() {
    return html` <header class="header">
      <h1 class="header__title">Tally Count</h1>
    </header>`;
  }
}
customElements.define("my-element", MyElement);

export class Counter extends LitElement {
  static get properties() {
    return {
      count: { type: Number },
      maxCount: { type: Number },
      minCount: { type: Number },
    };
  }
  static styles = css`
    .counter {
      background: #33333d;
    }

    .counter__value {
      width: 100%;
      height: 15rem;
      text-align: center;
      font-size: 8rem;
      font-weight: 900;
      background: none;
      color: #ffffff;
      border-width: 0;
      border-bottom: 1px solid #6a6a76;
    }

    .counter__actions {
      display: flex;
    }

    .counter__button {
      background: none;
      width: 50%;
      border-width: 0;
      background-color: #424250;
      color: #ffffff;
      font-size: 3rem;
      height: 10rem;
      border-bottom: 1px solid #6a6a76;
      transition: transform 0.1s;
      transform: translateY(0);
    }

    .counter__button:active {
      background: #424250;
      transform: translateY(2%);
    }

    .counter__button_first {
      border-right: 1px solid #6a6a76;
    }
  `;

  constructor() {
    super();
    this.count = 0;
    this.maxCount = 15; // Set your maximum count
    this.minCount = -15; // Set your minimum count
  }

  render() {
    return html` <main class="counter">
      <input
        class="counter__value"
        data-key="number"
        readonly
        value="${this.count}"
      />
      <div class="counter__actions">
        <button
          data-key="subtract"
          class="counter__button  counter__button_first"
          @click=${this.subtract}
        >
          -
        </button>
        <button data-key="add" class="counter__button" @click=${this.add}>
          +
        </button>
      </div>
    </main>`;
  }
  add() {
    if (this.count < this.maxCount) {
      this.count += 1;
      this.requestUpdate("count");
    }
  }

  subtract() {
    if (this.count > this.minCount) {
      this.count -= 1;
      this.requestUpdate("count");
    }
  }
}
customElements.define("my-counter", Counter);

// const creativeView = (name) => {
//     return html` <div>Hello, your name is ${name}</div>`;
// };

// const tree1 = creativeView("Shalk");
// const tree2 = creativeView("Nwabisa");

//console.log(tree1, tree2);

//LitElement(tree1, document.querySelector("[data-header}"))
