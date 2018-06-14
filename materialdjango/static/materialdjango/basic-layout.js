import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';


import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/paper-icon-button/paper-icon-button.js';


class BasicLayout extends PolymerElement{

static get template(){
    return html`
    <style>
    :host {
      --app-primary-color: #4285f4;
      --app-secondary-color: black;
      display: block;
      --paper-button-ink-color: var(--app-primary-color);
      --paper-spinner-color: var(--app-primary-color);
    }
    app-header {
      color: #fff;
      background-color: var(--app-primary-color);
    }
    paper-icon-button{
        --paper-icon-button-ink-color: white;
    }
    </style>
    <app-header reveals>
      <app-toolbar>
        <paper-icon-button icon="menu" onclick="drawer.toggle()"></paper-icon-button>
        <div main-title>MaterialDjango Test Page</div>
        <paper-icon-button icon="delete"></paper-icon-button>
        <paper-icon-button icon="search"></paper-icon-button>
        <paper-icon-button icon="close"></paper-icon-button>
        <paper-progress value="10" indeterminate bottom-item></paper-progress>
      </app-toolbar>
    </app-header>
    <app-drawer id="drawer" swipe-open>
    <app-toolbar>Menu</app-toolbar>
    <menu>
        <paper-button>FUCK</paper-button>
    </menu>
    </app-drawer>
    <slot></slot>
    `
}
constructor() {
    super();
}
}
customElements.define('basic-layout', BasicLayout);
