import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import "@polymer/paper-button/paper-button.js"

class PaperButtonSubmit extends PolymerElement{

static get template(){
	return html`
	<paper-button>Testing Button</paper-button>`
}
constructor() {
 	super();
}
}
customElements.define('paper-button-submit', PaperButtonSubmit);
