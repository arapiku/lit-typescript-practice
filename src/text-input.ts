import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('text-input')
export class TextInput extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }
    input {
      border: 1px solid #ccc;
      padding: 8px;
      border-radius: 4px;
    }
  `;

  @property()
  value = '';

  @property()
  placeholder = '';

  @property({type: Boolean})
  disabled = false;

  @property({type: Boolean})
  required = false;

  @property()
  type = 'text';

  @property()
  name = '';

  @property()
  autocomplete = '';

  override render() {
    return html`
      <input
        .type=${this.type}
        .placeholder=${this.placeholder}
        .name=${this.name}
        .value=${this.value}
        .autocomplete=${this.autocomplete}
        ?disabled=${this.disabled}
        ?required=${this.required}
        @input=${this._onInput}
        @change=${this._onChange}
        @blur=${this._onBlur}
      />
    `;
  }

  private _onInput(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
    this.dispatchEvent(new CustomEvent('input', {detail: this.value}));
  }

  private _onChange(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
    this.dispatchEvent(new CustomEvent('change', {detail: this.value}));
  }

  private _onBlur() {
    this.dispatchEvent(new CustomEvent('blur'));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'text-input': TextInput;
  }
}