import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | maybe-in-element', function(hooks) {
  setupRenderingTest(hooks);

  test('When the second argument is falsy it renders the content in the destination element', async function(assert) {
    this.renderInPlace = false;
    await render(hbs`
      <div id="test-destination-element"></div>
      {{#if this.ready}}
        {{#maybe-in-element this.destinationElement this.renderInPlace insertBefore=null}}Some text{{/maybe-in-element}}
      {{/if}}
    `);
    this.set('destinationElement', this.element.querySelector('#test-destination-element'));
    this.set('ready', true);
    assert.dom('#test-destination-element').containsText('Some text', 'The content has been rendered in the destination element');
  });

  test('When the second argument is true it renders the content in the destination element', async function(assert) {
    this.renderInPlace = true;
    await render(hbs`
      <div id="test-destination-element"></div>
      {{#if this.ready}}
        <div id="original-placement">{{#maybe-in-element this.destinationElement this.renderInPlace insertBefore=null}}Some text{{/maybe-in-element}}</div>
      {{/if}}
    `);
    this.set('destinationElement', this.element.querySelector('#test-destination-element'));
    this.set('ready', true);
    assert.dom('#test-destination-element').doesNotContainText('Some text', 'The content wasn\'t rendered in the destination element');
    assert.dom('#original-placement').containsText('Some text', 'The content has been rendered in the original location');
  });

  test('The second argument is bound so the content can move from the destination element to the original source at will', async function (assert) {
    this.renderInPlace = true;
    await render(hbs`
      <div id="test-destination-element"></div>
      {{#if this.ready}}
        <div id="original-placement">{{#maybe-in-element this.destinationElement this.renderInPlace insertBefore=null}}Some text{{/maybe-in-element}}</div>
      {{/if}}
    `);
    this.set('destinationElement', this.element.querySelector('#test-destination-element'));
    this.set('ready', true);
    assert.dom('#test-destination-element').doesNotContainText('Some text', 'The content wasn\'t rendered in the destination element');
    assert.dom('#original-placement').containsText('Some text', 'The content has been rendered in the original location');
    this.set('renderInPlace', false);
    assert.dom('#test-destination-element').containsText('Some text', 'The content has been rendered in the destination element');
    assert.dom('#original-placement').doesNotContainText('Some text', 'The content wasn\'t rendered in the original location');
  });

  test('It preserves context for actions', async function(assert) {
    assert.expect(0);
    this.renderInPlace = false;
    this.actions = {
      test() {}
    };
    await render(hbs`
      <div id="test-destination-element"></div>
      {{#if this.ready}}
        {{#maybe-in-element this.destinationElement this.renderInPlace insertBefore=null}}<button onclick={{action "test"}}>Some text</button>{{/maybe-in-element}}
      {{/if}}
    `);
    this.set('destinationElement', this.element.querySelector('#test-destination-element'));
    this.set('ready', true);
  });
});
