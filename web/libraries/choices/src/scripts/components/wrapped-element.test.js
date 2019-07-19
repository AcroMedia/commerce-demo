import { expect } from 'chai';
import WrappedElement from './wrapped-element';
import { DEFAULT_CLASSNAMES } from '../constants';

describe('components/wrappedElement', () => {
  let instance;
  let element;

  beforeEach(() => {
    element = document.createElement('select');
    instance = new WrappedElement({
      element,
      classNames: DEFAULT_CLASSNAMES,
    });
  });

  afterEach(() => {
    document.body.innerHTML = '';
    instance = null;
  });

  describe('constructor', () => {
    it('assigns choices element to class', () => {
      expect(instance.element).to.eql(element);
    });

    it('assigns classnames to class', () => {
      expect(instance.classNames).to.eql(DEFAULT_CLASSNAMES);
    });

    it('sets isDisabled flag to false', () => {
      expect(instance.isDisabled).to.eql(false);
    });
  });

  describe('value getter', () => {
    it('returns element value', () => {
      expect(instance.value).to.eql(element.value);
    });
  });

  describe('conceal', () => {
    let originalStyling;

    beforeEach(() => {
      originalStyling = 'color:red';
      instance.element.setAttribute('style', originalStyling);
    });

    it('hides element', () => {
      instance.conceal();
      expect(instance.element.tabIndex).to.equal(-1);
      expect(
        instance.element.classList.contains(instance.classNames.input),
      ).to.equal(true);
      expect(
        instance.element.classList.contains(instance.classNames.hiddenState),
      ).to.equal(true);
      expect(instance.element.getAttribute('aria-hidden')).to.equal('true');
      expect(instance.element.getAttribute('data-choice')).to.equal('active');
      expect(instance.element.getAttribute('data-choice-orig-style')).to.equal(
        originalStyling,
      );
    });
  });

  describe('reveal', () => {
    let originalStyling;

    beforeEach(() => {
      originalStyling = 'color:red';
      instance.element.setAttribute('data-choice-orig-style', originalStyling);
    });

    it('shows element', () => {
      instance.reveal();
      expect(instance.element.tabIndex).to.equal(0);
      expect(
        instance.element.classList.contains(instance.classNames.input),
      ).to.equal(false);
      expect(
        instance.element.classList.contains(instance.classNames.hiddenState),
      ).to.equal(false);
      expect(instance.element.getAttribute('style')).to.equal(originalStyling);
      expect(instance.element.getAttribute('aria-hidden')).to.equal(null);
      expect(instance.element.getAttribute('data-choice')).to.equal(null);
      expect(instance.element.getAttribute('data-choice-orig-style')).to.equal(
        null,
      );
    });
  });

  describe('enable', () => {
    beforeEach(() => {
      instance.disable();
    });

    it('removes disabled attribute', () => {
      expect(instance.element.hasAttribute('disabled')).to.equal(true);
      instance.enable();
      expect(instance.element.hasAttribute('disabled')).to.equal(false);
    });

    it('sets elements disabled state to false', () => {
      expect(instance.element.disabled).to.equal(true);
      instance.enable();
      expect(instance.element.disabled).to.equal(false);
    });

    it('sets isDisabled flag to false', () => {
      expect(instance.isDisabled).to.equal(true);
      instance.enable();
      expect(instance.isDisabled).to.equal(false);
    });
  });

  describe('disable', () => {
    beforeEach(() => {
      instance.enable();
    });

    it('sets disabled attribute (to blank string)', () => {
      expect(instance.element.hasAttribute('disabled')).to.equal(false);
      instance.disable();
      expect(instance.element.getAttribute('disabled')).to.equal('');
    });

    it('sets elements disabled state to true', () => {
      expect(instance.element.disabled).to.equal(false);
      instance.disable();
      expect(instance.element.disabled).to.equal(true);
    });

    it('sets isDisabled flag to true', () => {
      expect(instance.isDisabled).to.equal(false);
      instance.disable();
      expect(instance.isDisabled).to.equal(true);
    });
  });

  describe('triggerEvent', () => {
    it('fires event on element using passed eventType and data', done => {
      const data = {
        test: true,
      };

      instance.element.addEventListener('testEvent', ({ detail }) => {
        expect(detail).to.eql(data);
        done();
      });

      instance.triggerEvent('testEvent', data);
    });
  });
});
