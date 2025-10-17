/**
 * Copyright 2025 chloemartin312
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `number-input`
 * 
 * @demo index.html
 * @element number-input
 */
export class NumberInput extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "number-input";
  }

  constructor() {
    super();
    this.label = "";
    this.value = 0;
    this.min = 0;
    this.max = Infinity;
    this.step = 1;
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      label: { type: String },
      value: { type: Number },
      min: { type: Number },
      max: { type: Number },
      step: { type: Number }
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        font-family: var(--ddd-font-secondary);
      }

      /* Light Theme */
      :host {
        --text-color: var(--ddd-theme-default-nittanyNavy);
        --input-bg: var(--ddd-theme-default-white);
        --button-bg: var(--ddd-theme-default-pughBlue);
        --button-accent: var(--ddd-theme-default-white);
        --hover-bg: var(--ddd-theme-default-nittanyNavy);
      }

      /* Dark Theme */
      @media(prefers-color-scheme: dark) {
        :host {
          --text-color: var(--ddd-theme-default-white);
          --input-bg: var(--ddd-theme-default-nittanyNavy);
          --button-bg: var(--ddd-theme-default-pughBlue);
          --button-accent: var(--ddd-theme-default-nittanyNavy);
          --hover-bg: var(--ddd-theme-default-skyLight);
        }
      }

      .input-container {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        width: fit-content;
      }

      label {
        font-size: 0.9rem;
        font-weight: 600;
        color: var(--text-color);
      }

      .input-wrapper {
        display: flex;
        align-items: center;
        border: 2px solid var(--text-color);
        border-radius: 8px;
        overflow: hidden;
        background-color: var(--input-bg);
      }

      button {
        background-color: var(--button-bg);
        color: var(--button-accent);
        border: none;
        width: 2rem;
        height: 2rem;
        font-size: 1.2rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.2s ease;
      }

      button:hover {
        background-color: var(--hover-bg);
      }

      button:active {
        transform: scale(0.95);
      }

      input[type="number"] {
        text-align: center;
        width: 4rem;
        font-size: 16px;
        background: var(--input-bg);
        color: var(--text-color);
        border: none;
        outline: none;
        appearance: textfield;
      }
    `];
  }

  firstUpdated() {
    this.shadowRoot.querySelector("#increment").addEventListener("click", () => this._increment());
    this.shadowRoot.querySelector("#decrement").addEventListener("click", () => this._decrement());
  }

  _increment() {
    let newValue = this.value + this.step;
    if (newValue > this.max) newValue = this.max;
    this._updateValue(newValue);
  }

  _decrement() {
    let newValue = this.value - this.step;
    if (newValue < this.min) newValue = this.min;
    this._updateValue(newValue);
  }

  _onInput(e) {
    const newValue = parseFloat(e.target.value);
    this._updateValue(newValue);
  }

  _updateValue(newValue) {
    if (isNaN(newValue)) newValue = this.min;
    if (newValue < this.min) newValue = this.min;
    if (newValue > this.max) newValue = this.max;

    this.value = newValue;

    const input = this.shadowRoot.querySelector("#input");
    if (input) input.value = String(this.value);

    this.dispatchEvent(new CustomEvent("value-changed", {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
  }

  // Lit render the HTML
  render() {
    return html`
      <div class="input-container">
        <label for="input">${this.label}</label>
          <div class="input-wrapper">
            <button id="decrement">−</button>
            <input 
              id="input"
              type="number" 
              .value="${String(this.value)}" 
              .min="${String(this.min)}"
              .max="${String(this.max)}"
              .step="${String(this.step)}"
              @input="${this._onInput}"
            />
            <button id="increment">+</button>
          </div>
      </div>
    `;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(NumberInput.tag, NumberInput);