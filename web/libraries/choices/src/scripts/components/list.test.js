import { expect } from 'chai';
import List from './list';

describe('components/list', () => {
  let instance;
  let choicesElement;

  beforeEach(() => {
    choicesElement = document.createElement('div');
    instance = new List({
      element: choicesElement,
    });
  });

  afterEach(() => {
    document.body.innerHTML = '';
    instance = null;
  });

  describe('constructor', () => {
    it('assigns choices element to class', () => {
      expect(instance.element).to.eql(choicesElement);
    });
  });

  describe('clear', () => {
    it("clears element's inner HTML", () => {
      const innerHTML = 'test';
      instance.element.innerHTML = innerHTML;
      expect(instance.element.innerHTML).to.equal(innerHTML);
      instance.clear();
      expect(instance.element.innerHTML).to.equal('');
    });
  });

  describe('append', () => {
    it('appends passed node to element', () => {
      const elementToAppend = document.createElement('span');
      const childClass = 'test-element';
      elementToAppend.classList.add(childClass);
      expect(instance.element.querySelector(`.${childClass}`)).to.equal(null);
      instance.append(elementToAppend);
      expect(instance.element.querySelector(`.${childClass}`)).to.equal(
        elementToAppend,
      );
    });
  });

  describe('getChild', () => {
    let childElement;
    const childClass = 'test-element';

    beforeEach(() => {
      childElement = document.createElement('span');
      childElement.classList.add(childClass);
      instance.element.appendChild(childElement);
    });

    it('returns child element', () => {
      const expectedResponse = childElement;
      const actualResponse = instance.getChild(`.${childClass}`);
      expect(expectedResponse).to.eql(actualResponse);
    });
  });
});
