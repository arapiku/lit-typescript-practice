import { TextInput } from '../text-input.js';
import { fixture, assert, oneEvent } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

suite('text-input', () => {
  test('is defined', () => {
    const el = document.createElement('text-input');
    assert.instanceOf(el, TextInput);
  });

  test('dispatches input event', async () => {
    const el = (await fixture(html`<text-input></text-input>`)) as TextInput;
    const input = el.shadowRoot!.querySelector('input')!;
    
    setTimeout(() => {
      input.value = 'test';
      input.dispatchEvent(new Event('input'));
    });

    const { detail } = await oneEvent(el, 'input');
    assert.equal(detail, 'test');
    assert.equal(el.value, 'test');
  });

  test('dispatches change event', async () => {
    const el = (await fixture(html`<text-input></text-input>`)) as TextInput;
    const input = el.shadowRoot!.querySelector('input')!;

    setTimeout(() => {
        input.value = 'committed';
        input.dispatchEvent(new Event('change'));
    });

    const { detail } = await oneEvent(el, 'change');
    assert.equal(detail, 'committed');
    assert.equal(el.value, 'committed');
  });

  test('dispatches blur event', async () => {
    const el = await fixture(html`<text-input></text-input>`);
    const input = el.shadowRoot!.querySelector('input')!;

    setTimeout(() => input.dispatchEvent(new Event('blur')));

    await oneEvent(el, 'blur');
  });

  test('renders with placeholder', async () => {
    const el = await fixture(html`<text-input placeholder="Enter text"></text-input>`);
    const input = el.shadowRoot!.querySelector('input')!;
    assert.equal(input.placeholder, 'Enter text');
  });

  test('renders as disabled', async () => {
    const el = await fixture(html`<text-input disabled></text-input>`);
    const input = el.shadowRoot!.querySelector('input')!;
    assert.isTrue(input.disabled);
  });

  test('renders as required', async () => {
    const el = await fixture(html`<text-input required></text-input>`);
    const input = el.shadowRoot!.querySelector('input')!;
    assert.isTrue(input.required);
  });

  test('renders with specified type', async () => {
    const el = await fixture(html`<text-input type="password"></text-input>`);
    const input = el.shadowRoot!.querySelector('input')!;
    assert.equal(input.type, 'password');
  });

  test('renders with specified name', async () => {
    const el = await fixture(html`<text-input name="username"></text-input>`);
    const input = el.shadowRoot!.querySelector('input')!;
    assert.equal(input.name, 'username');
  });

  test('renders with autocomplete', async () => {
    const el = await fixture(html`<text-input autocomplete="on"></text-input>`);
    const input = el.shadowRoot!.querySelector('input')!;
    assert.equal(input.autocomplete, 'on');
  });
});
