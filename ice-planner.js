/**
 * Copyright 2025 chloemartin312
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./number-input.js";

/**
 * `ice-planner`
 * 
 * @demo index.html
 * @element ice-planner
 */
export class IcePlanner extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "ice-planner";
  }

  // Default properties
  constructor() {
    super();
    this.teamName = "";
    this.iceCost = 0;
    this.iceHours = 0;
    this.numOfPlayers = 1;
    this.coachCost = 0;
    this.url = "";
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      teamName: { type: String },
      iceCost: { type: Number, attribute: "ice-cost" },
      iceHours: { type: Number, attribute: "ice-hours" },
      numOfPlayers: { type: Number, attribute: "num-of-players" },
      coachCost: { type: Number, attribute: "coach-cost" },
      url: { type: String }
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        background-color: var(--bg-color);
        color: var(--text-color);
        font-family: var(--ddd-font-secondary);
      }

      /* Light Theme */
      :host {
        --bg-color: var(--ddd-theme-default-skyLight);
        --text-color: var(--ddd-theme-default-nittanyNavy);
        --card-bg: var(--ddd-theme-default-skyMaxLight);
        --input-bg: var(--ddd-theme-default-skyLight);
      }

      /* Dark Theme */
      @media(prefers-color-scheme: dark) {
        :host {
          --bg-color: var(--ddd-theme-default-nittanyNavy);
          --text-color: var(--ddd-theme-default-white);
          --card-bg: var(--ddd-theme-default-slateGray);
          --input-bg: var(--ddd-theme-default-nittanyNavy);
        }
      }

      .header {
        text-align: left;
        color: var(--text-color);
        padding: 16px;
        margin: 16px;
      }

      input[type="text"] {
        width: 240px;
        padding: 8px;
        font-size: 16px;
        border: 2px solid var(--text-color);
        border-radius: 8px;
        background-color: var(--input-bg);
        color: var(--text-color);
        transition: all 0.2s ease;
        
      }

      input[type="text"]::placeholder {
        color: var(--text-color);
        opacity: 0.7;
      }

      input[type="text"]:focus {
        border-color: var(--text-color);
      }

      .inputs, .fixed-values, .team-logo, .reciept {
        background-color: var(--card-bg);
        border: 2px solid var(--text-color);
        border-radius: 20px;
        color: var(--text-color);
        margin: 16px;
        padding: 16px;
      }

      .container {
        display: flex;
        gap: 8px;
        margin: 16px;
        justify-content: center;
      }

      .fixed-values, .team-logo {
        flex: 1 1 45%;
      }

      @media (max-width: 700px) {
        .container {
          flex-direction: column;
          align-items: center;
        }
        .fixed-values, .team-logo {
          flex: 1 1 auto;
          width: 100%;
          padding: 8px;
        }
      }

      .share-btn {
        background-color: var(--text-color);
        color: var(--bg-color);
        border: 2px solid var(--bg-color);
        border-radius: 12px;
        padding: 16px;
        margin: 16px;
        font-size: 16px;
        transition: background-color 0.2s ease;
      }

      .share-btn:hover {
        background-color: var(--bg-color);
        color: var(--text-color);
      }
      
    `];
  }

  // Lit render the HTML
  render() {
    return html`
      <div class="header">
        <h2>Ice Planner</h2>
      </div>

      <div class="inputs">
        <p>
          Team Name:
          <input 
            type="text" 
            .value="${this.teamName}" 
            @input="${e => this.teamName = e.target.value}" 
            placeholder="Enter team name"
          />
        </p>

        <p>
          Ice Cost:
          <number-input
            id="iceCostInput"
            .value="${this.iceCost}"
            @value-changed="${e => this._updateValue('iceCost', e.detail.value)}"
          ></number-input>
        </p>

        <p>
          Ice Hours:
          <number-input
            id="iceHoursInput"
            .value="${this.iceHours}"
            @value-changed="${e => this._updateValue('iceHours', e.detail.value)}"
          ></number-input>
        </p>

        <p>
          Number of Players:
          <number-input
            id="numOfPlayersInput"
            .value="${this.numOfPlayers}"
            @value-changed="${e => this._updateValue('numOfPlayers', e.detail.value)}"
          ></number-input>
        </p>

        <p>
          Coach Cost:
          <number-input
            id="coachCostInput"
            .value="${this.coachCost}"
            @value-changed="${e => this._updateValue('coachCost', e.detail.value)}"
          ></number-input>
        </p>
      </div>


      <div class="container">
        <div class="fixed-values">
          <h3>Fixed Values</h3>
          <p>Transaction Fee: 2%</p>
        </div>

        <div class="team-logo">
          <h3>Go ${this.teamName}!</h3>
          <img src="/hockey.jpg" alt="Logo">
        </div>  
       </div>

      <div class="reciept">
        <h3>${this.teamName} Reciept: </h3>
        <p>Total Ice Cost: $${this.iceCost * this.iceHours}</p>
        <p>Total Coach Cost: $${this.coachCost}</p>
        <p>Transaction Fee: $${((this.iceCost * this.iceHours) + this.coachCost) * 0.02}</p>
        <h3>Total Cost: $${((this.iceCost * this.iceHours) + this.coachCost) * 1.02}</h3>
        <h3>Cost Per Player: $${(((this.iceCost * this.iceHours) + this.coachCost) * 1.02) / this.numOfPlayers}</h3>
        <div>
          <button class="share-btn" @click="${this.copyShareLink}">Copy Share Link</button>
        </div>
      </div>
    `;
  }

  _updateValue(field, value) {
    this[field] = value;
    this.buildURL();
  }

  copyShareLink() {
    navigator.clipboard.writeText(this.url);
    alert("Link copied to clipboard!");
  }

  buildURL() {
    const baseUrl = globalThis.location.origin;
    const paramData = {}; 

    if (this.teamName) {
      paramData.teamName = this.teamName;
    }
    if (this.iceCost) {
      paramData.iceCost = this.iceCost;
    }
    if (this.iceHours) {
      paramData.iceHours = this.iceHours;
    }
    if (this.numOfPlayers) {
      paramData.numOfPlayers = this.numOfPlayers;
    }
    if (this.coachCost) {
      paramData.coachCost = this.coachCost;
    }
    
    const params = new URLSearchParams(paramData).toString();
    this.url = `${baseUrl}?${params}`;
  }

  connectedCallback() {
    super.connectedCallback();
    const params = new URLSearchParams(globalThis.location.search);

    if (params.has("teamName")) this.teamName = params.get("teamName");
    if (params.has("iceCost")) this.iceCost = Number(params.get("iceCost"));
    if (params.has("iceHours")) this.iceHours = Number(params.get("iceHours"));
    if (params.has("numOfPlayers")) this.numOfPlayers = Number(params.get("numOfPlayers"));
    if (params.has("coachCost")) this.coachCost = Number(params.get("coachCost"));

    this.buildURL();
  }


  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(IcePlanner.tag, IcePlanner);