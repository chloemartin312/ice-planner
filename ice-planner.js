/**
 * Copyright 2025 chloemartin312
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

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
    this.teamName = "deafult team name";
    this.iceCost = 0;
    this.iceHours = 0;
    this.numOfPlayers = 1;
    this.coachCoast = 0;
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      teamName: { type: String },
      iceCost: { type: Number, attribute: "ice-cost" },
      iceHours: { type: Number, attribute: "ice-hours" },
      numOfPlayers: { type: Number, attribute: "num-of-players" },
      coachCoast: { type: Number, attribute: "coach-cost" }
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        background-color: var(--ddd-theme-default-skyLight);
        font-family: var(--ddd-font-secondary);
      }

      .header {
        text-align: left;
        color: var(--ddd-theme-default-nittanyNavy);
        padding: 10px;
        margin: 10px;
      }

      .inputs, .fixed-values, .team-logo, .reciept {
        background-color: var(--ddd-theme-default-skyMaxLight);
        border: 2px solid var(--ddd-theme-default-nittanyNavy);
        border-radius: 20px;
        color: var(--ddd-theme-default-nittanyNavy);
        margin: 10px;
        padding: 10px;
      }

      .container {
        display: flex;
        gap: 10px;
        margin: 10px;
      }
      .fixed-values, .team-logo {
        flex-grow: 1; 
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
        <p>Team Name: </p>
        <p>Ice Cost: </p>
        <p>Ice Hours: </p>
        <p>Number of Players: </p>
        <p>Coach Cost:</p>
      </div>

      <div class="container">
        <div class="fixed-values">
          <h3>Fixed Values</h3>
          <p>Transaction Fee: </p>
        </div>

        <div class="team-logo">
          <h3>Go ${this.teamName}!</h3>
          <img src="" alt="Logo">
        </div>  
       </div>

      <div class="reciept">
        <h3>${this.teamName} Reciept:</h3>
        <p>Total Ice Cost: $${this.iceCost * this.iceHours}</p>
        <p>Total Coach Cost: $${this.coachCoast}</p>
        <p>Transaction Fee: $${((this.iceCost * this.iceHours) + this.coachCoast) * 0.02}</p>
        <h3>Total Cost: $${((this.iceCost * this.iceHours) + this.coachCoast) * 1.02}</h3>
        <h3>Cost Per Player: $${(((this.iceCost * this.iceHours) + this.coachCoast) * 1.02) / this.numOfPlayers}</h3>
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

globalThis.customElements.define(IcePlanner.tag, IcePlanner);