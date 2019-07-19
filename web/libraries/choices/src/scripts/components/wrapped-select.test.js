import { expect } from 'chai';
import { stub } from 'sinon';
import WrappedElement from './wrapped-element';
import WrappedSelect from './wrapped-select';
import { DEFAULT_CLASSNAMES } from '../constants';

describe('components/wrappedSelect', () => {
  let instance;
  let element;

  beforeEach(() => {
    element = document.createElement('select');
    element.id = 'target';
    for (let i = 1; i <= 4; i++) {
      const option = document.createElement('option');

      option.value = `Value ${i}`;
      option.innerHTML = `Label ${i}`;

      if (i === 1) {
        option.setAttribute('placeholder', '');
      }

      element.appendChild(option);
    }
    document.body.appendChild(element);

    instance = new WrappedSelect({
      element: document.getElementById('target'),
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
  });

  describe('inherited methods', () => {
    ['conceal', 'reveal', 'enable', 'disable'].forEach(method => {
      beforeEach(() => {
        stub(WrappedElement.prototype, method);
      });

      afterEach(() => {
        WrappedElement.prototype[method].restore();
      });

      describe(method, () => {
        it(`calls super.${method}`, () => {
          expect(WrappedElement.prototype[method].called).to.equal(false);
          instance[method]();
          expect(WrappedElement.prototype[method].called).to.equal(true);
        });
      });
    });
  });

  describe('placeholderOption getter', () => {
    it('returns option element with placeholder attribute', () => {
      expect(instance.placeholderOption).to.be.instanceOf(HTMLOptionElement);
    });
  });

  describe('options getter', () => {
    it('returns all option elements', () => {
      const { options } = instance;
      expect(options).to.be.an('array');
      options.forEach(option => {
        expect(option).to.be.instanceOf(HTMLOptionElement);
      });
    });
  });

  describe('optionGroups getter', () => {
    it('returns an array of all option groups', () => {
      for (let i = 1; i <= 3; i++) {
        const group = document.createElement('optgroup');
        instance.element.appendChild(group);
      }

      const { optionGroups } = instance;
      expect(optionGroups.length).to.equal(3);
      optionGroups.forEach(option => {
        expect(option).to.be.instanceOf(HTMLOptGroupElement);
      });
    });
  });

  describe('options setter', () => {
    let appendDocFragmentStub;
    const options = [
      {
        value: '1',
        label: 'Test 1',
        selected: false,
        disabled: true,
      },
      {
        value: '2',
        label: 'Test 2',
        selected: true,
        disabled: false,
      },
    ];

    beforeEach(() => {
      appendDocFragmentStub = stub();
      instance.appendDocFragment = appendDocFragmentStub;
    });

    afterEach(() => {
      instance.appendDocFragment.reset();
    });

    it('creates an option element for each passed object, adds it to a fragment and calls appendDocFragment with created fragment', () => {
      expect(appendDocFragmentStub.called).to.equal(false);
      instance.options = options;
      expect(appendDocFragmentStub.called).to.equal(true);

      const fragment = appendDocFragmentStub.firstCall.args[0];
      const selectElement = document.createElement('select');
      selectElement.appendChild(fragment);

      expect(fragment).to.be.instanceOf(DocumentFragment);
      expect(selectElement.options.length).to.equal(2);
      expect(selectElement.options[0].value).to.equal(options[0].value);
      expect(selectElement.options[1].value).to.equal(options[1].value);
    });
  });

  describe('appendDocFragment', () => {
    it('empties contents of element', () => {
      expect(instance.element.getElementsByTagName('option').length).to.equal(
        4,
      );
      instance.appendDocFragment(document.createDocumentFragment());
      expect(instance.element.getElementsByTagName('option').length).to.equal(
        0,
      );
    });

    it('appends passed fragment to element', () => {
      const fragment = document.createDocumentFragment();
      const elementToAppend = document.createElement('div');
      elementToAppend.id = 'fragment-target';
      fragment.appendChild(elementToAppend);
      expect(instance.element.querySelector('#fragment-target')).to.equal(null);
      instance.appendDocFragment(fragment);
      expect(instance.element.querySelector('#fragment-target')).to.eql(
        elementToAppend,
      );
    });
  });
});
