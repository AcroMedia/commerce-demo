import { expect } from 'chai';
import { spy, stub } from 'sinon';

import Choices from './choices';
import { EVENTS, ACTION_TYPES } from './constants';

describe('choices', () => {
  let instance;
  let output;
  let passedElement;

  const returnsInstance = () => {
    it('returns this', () => {
      expect(output).to.eql(instance);
    });
  };

  describe('public methods', () => {
    beforeEach(() => {
      passedElement = document.createElement('input');
      passedElement.type = 'text';
      passedElement.className = 'js-choices';
      document.body.appendChild(passedElement);

      instance = new Choices(passedElement);
    });

    afterEach(() => {
      output = null;
      instance = null;
    });

    describe('init', () => {
      const callbackOnInitSpy = spy();

      beforeEach(() => {
        instance = new Choices(passedElement, {
          callbackOnInit: callbackOnInitSpy,
        });
      });

      describe('when already initialised', () => {
        beforeEach(() => {
          instance.initialised = true;
          instance.init();
        });

        it("doesn't set initialise flag", () => {
          expect(instance.initialised).to.not.equal(false);
        });
      });

      describe('not already initialised', () => {
        let createTemplatesSpy;
        let createInputSpy;
        let storeSubscribeSpy;
        let renderSpy;
        let addEventListenersSpy;

        beforeEach(() => {
          createTemplatesSpy = spy(instance, '_createTemplates');
          createInputSpy = spy(instance, '_createStructure');
          storeSubscribeSpy = spy(instance._store, 'subscribe');
          renderSpy = spy(instance, '_render');
          addEventListenersSpy = spy(instance, '_addEventListeners');

          instance.initialised = false;
          instance.init();
        });

        afterEach(() => {
          createTemplatesSpy.restore();
          createInputSpy.restore();
          storeSubscribeSpy.restore();
          renderSpy.restore();
          addEventListenersSpy.restore();
        });

        it('sets initialise flag', () => {
          expect(instance.initialised).to.equal(true);
        });

        it('creates templates', () => {
          expect(createTemplatesSpy.called).to.equal(true);
        });

        it('creates input', () => {
          expect(createInputSpy.called).to.equal(true);
        });

        it('subscribes to store with render method', () => {
          expect(storeSubscribeSpy.called).to.equal(true);
          expect(storeSubscribeSpy.lastCall.args[0]).to.equal(instance._render);
        });

        it('fires initial render', () => {
          expect(renderSpy.called).to.equal(true);
        });

        it('adds event listeners', () => {
          expect(addEventListenersSpy.called).to.equal(true);
        });

        it('fires callback', () => {
          expect(callbackOnInitSpy.called).to.equal(true);
        });
      });
    });

    describe('destroy', () => {
      beforeEach(() => {
        passedElement = document.createElement('input');
        passedElement.type = 'text';
        passedElement.className = 'js-choices';
        document.body.appendChild(passedElement);

        instance = new Choices(passedElement);
      });

      describe('not already initialised', () => {
        beforeEach(() => {
          instance.initialised = false;
          instance.destroy();
        });

        it("doesn't set initialise flag", () => {
          expect(instance.initialised).to.not.equal(true);
        });
      });

      describe('when already initialised', () => {
        let removeEventListenersSpy;
        let passedElementRevealSpy;
        let containerOuterUnwrapSpy;
        let clearStoreSpy;

        beforeEach(() => {
          removeEventListenersSpy = spy(instance, '_removeEventListeners');
          passedElementRevealSpy = spy(instance.passedElement, 'reveal');
          containerOuterUnwrapSpy = spy(instance.containerOuter, 'unwrap');
          clearStoreSpy = spy(instance, 'clearStore');

          instance.initialised = true;
          instance.destroy();
        });

        afterEach(() => {
          removeEventListenersSpy.restore();
          passedElementRevealSpy.restore();
          containerOuterUnwrapSpy.restore();
          clearStoreSpy.restore();
        });

        it('removes event listeners', () => {
          expect(removeEventListenersSpy.called).to.equal(true);
        });

        it('reveals passed element', () => {
          expect(passedElementRevealSpy.called).to.equal(true);
        });

        it('reverts outer container', () => {
          expect(containerOuterUnwrapSpy.called).to.equal(true);
          expect(containerOuterUnwrapSpy.lastCall.args[0]).to.equal(
            instance.passedElement.element,
          );
        });

        it('clears store', () => {
          expect(clearStoreSpy.called).to.equal(true);
        });

        it('nullifys templates config', () => {
          expect(instance.config.templates).to.equal(null);
        });

        it('resets initialise flag', () => {
          expect(instance.initialised).to.equal(false);
        });
      });
    });

    describe('enable', () => {
      let passedElementEnableSpy;
      let addEventListenersSpy;
      let containerOuterEnableSpy;
      let inputEnableSpy;

      beforeEach(() => {
        addEventListenersSpy = spy(instance, '_addEventListeners');
        passedElementEnableSpy = spy(instance.passedElement, 'enable');
        containerOuterEnableSpy = spy(instance.containerOuter, 'enable');
        inputEnableSpy = spy(instance.input, 'enable');
      });

      afterEach(() => {
        addEventListenersSpy.restore();
        passedElementEnableSpy.restore();
        containerOuterEnableSpy.restore();
        inputEnableSpy.restore();
      });

      describe('when already enabled', () => {
        beforeEach(() => {
          instance.passedElement.isDisabled = false;
          instance.containerOuter.isDisabled = false;
          output = instance.enable();
        });

        returnsInstance(output);

        it('returns early', () => {
          expect(passedElementEnableSpy.called).to.equal(false);
          expect(addEventListenersSpy.called).to.equal(false);
          expect(inputEnableSpy.called).to.equal(false);
          expect(containerOuterEnableSpy.called).to.equal(false);
        });
      });

      describe('when not already enabled', () => {
        beforeEach(() => {
          instance.passedElement.isDisabled = true;
          instance.containerOuter.isDisabled = true;
          instance.enable();
        });

        it('adds event listeners', () => {
          expect(addEventListenersSpy.called).to.equal(true);
        });

        it('enables input', () => {
          expect(inputEnableSpy.called).to.equal(true);
        });

        it('enables containerOuter', () => {
          expect(containerOuterEnableSpy.called).to.equal(true);
        });
      });
    });

    describe('disable', () => {
      let removeEventListenersSpy;
      let passedElementDisableSpy;
      let containerOuterDisableSpy;
      let inputDisableSpy;

      beforeEach(() => {
        removeEventListenersSpy = spy(instance, '_removeEventListeners');
        passedElementDisableSpy = spy(instance.passedElement, 'disable');
        containerOuterDisableSpy = spy(instance.containerOuter, 'disable');
        inputDisableSpy = spy(instance.input, 'disable');
      });

      afterEach(() => {
        removeEventListenersSpy.restore();
        passedElementDisableSpy.restore();
        containerOuterDisableSpy.restore();
        inputDisableSpy.restore();
      });

      describe('when already disabled', () => {
        beforeEach(() => {
          instance.passedElement.isDisabled = true;
          instance.containerOuter.isDisabled = true;
          output = instance.disable();
        });

        returnsInstance(output);

        it('returns early', () => {
          expect(removeEventListenersSpy.called).to.equal(false);
          expect(passedElementDisableSpy.called).to.equal(false);
          expect(containerOuterDisableSpy.called).to.equal(false);
          expect(inputDisableSpy.called).to.equal(false);
        });
      });

      describe('when not already disabled', () => {
        beforeEach(() => {
          instance.passedElement.isDisabled = false;
          instance.containerOuter.isDisabled = false;
          output = instance.disable();
        });

        it('removes event listeners', () => {
          expect(removeEventListenersSpy.called).to.equal(true);
        });

        it('disables input', () => {
          expect(inputDisableSpy.called).to.equal(true);
        });

        it('enables containerOuter', () => {
          expect(containerOuterDisableSpy.called).to.equal(true);
        });
      });
    });

    describe('showDropdown', () => {
      let containerOuterOpenSpy;
      let dropdownShowSpy;
      let inputFocusSpy;
      let passedElementTriggerEventStub;

      beforeEach(() => {
        containerOuterOpenSpy = spy(instance.containerOuter, 'open');
        dropdownShowSpy = spy(instance.dropdown, 'show');
        inputFocusSpy = spy(instance.input, 'focus');
        passedElementTriggerEventStub = stub();

        instance.passedElement.triggerEvent = passedElementTriggerEventStub;
      });

      afterEach(() => {
        containerOuterOpenSpy.restore();
        dropdownShowSpy.restore();
        inputFocusSpy.restore();
        instance.passedElement.triggerEvent.reset();
      });

      describe('dropdown active', () => {
        beforeEach(() => {
          instance.dropdown.isActive = true;
          output = instance.showDropdown();
        });

        it('returns this', () => {
          expect(output).to.eql(instance);
        });

        it('returns early', () => {
          expect(containerOuterOpenSpy.called).to.equal(false);
          expect(dropdownShowSpy.called).to.equal(false);
          expect(inputFocusSpy.called).to.equal(false);
          expect(passedElementTriggerEventStub.called).to.equal(false);
        });
      });

      describe('dropdown inactive', () => {
        beforeEach(() => {
          instance.dropdown.isActive = false;
          output = instance.showDropdown();
        });

        it('returns this', () => {
          expect(output).to.eql(instance);
        });

        it('opens containerOuter', done => {
          requestAnimationFrame(() => {
            expect(containerOuterOpenSpy.called).to.equal(true);
            done();
          });
        });

        it('shows dropdown with blurInput flag', done => {
          requestAnimationFrame(() => {
            expect(dropdownShowSpy.called).to.equal(true);
            done();
          });
        });

        it('triggers event on passedElement', done => {
          requestAnimationFrame(() => {
            expect(passedElementTriggerEventStub.called).to.equal(true);
            expect(passedElementTriggerEventStub.lastCall.args[0]).to.eql(
              EVENTS.showDropdown,
            );
            expect(passedElementTriggerEventStub.lastCall.args[1]).to.eql({});
            done();
          });
        });

        describe('passing true focusInput flag with canSearch set to true', () => {
          beforeEach(() => {
            instance.dropdown.isActive = false;
            instance._canSearch = true;
            output = instance.showDropdown(true);
          });

          it('focuses input', done => {
            requestAnimationFrame(() => {
              expect(inputFocusSpy.called).to.equal(true);
              done();
            });
          });
        });
      });
    });

    describe('hideDropdown', () => {
      let containerOuterCloseSpy;
      let dropdownHideSpy;
      let inputBlurSpy;
      let inputRemoveActiveDescendantSpy;
      let passedElementTriggerEventStub;

      beforeEach(() => {
        containerOuterCloseSpy = spy(instance.containerOuter, 'close');
        dropdownHideSpy = spy(instance.dropdown, 'hide');
        inputBlurSpy = spy(instance.input, 'blur');
        inputRemoveActiveDescendantSpy = spy(
          instance.input,
          'removeActiveDescendant',
        );
        passedElementTriggerEventStub = stub();

        instance.passedElement.triggerEvent = passedElementTriggerEventStub;
      });

      afterEach(() => {
        containerOuterCloseSpy.restore();
        dropdownHideSpy.restore();
        inputBlurSpy.restore();
        inputRemoveActiveDescendantSpy.restore();
        instance.passedElement.triggerEvent.reset();
      });

      describe('dropdown inactive', () => {
        beforeEach(() => {
          instance.dropdown.isActive = false;
          output = instance.hideDropdown();
        });

        returnsInstance(output);

        it('returns early', () => {
          expect(containerOuterCloseSpy.called).to.equal(false);
          expect(dropdownHideSpy.called).to.equal(false);
          expect(inputBlurSpy.called).to.equal(false);
          expect(passedElementTriggerEventStub.called).to.equal(false);
        });
      });

      describe('dropdown active', () => {
        beforeEach(() => {
          instance.dropdown.isActive = true;
          output = instance.hideDropdown();
        });

        it('returns this', () => {
          expect(output).to.eql(instance);
        });

        it('closes containerOuter', done => {
          requestAnimationFrame(() => {
            expect(containerOuterCloseSpy.called).to.equal(true);
            done();
          });
        });

        it('hides dropdown with blurInput flag', done => {
          requestAnimationFrame(() => {
            expect(dropdownHideSpy.called).to.equal(true);
            done();
          });
        });

        it('triggers event on passedElement', done => {
          requestAnimationFrame(() => {
            expect(passedElementTriggerEventStub.called).to.equal(true);
            expect(passedElementTriggerEventStub.lastCall.args[0]).to.eql(
              EVENTS.hideDropdown,
            );
            expect(passedElementTriggerEventStub.lastCall.args[1]).to.eql({});
            done();
          });
        });

        describe('passing true blurInput flag with canSearch set to true', () => {
          beforeEach(() => {
            instance.dropdown.isActive = true;
            instance._canSearch = true;
            output = instance.hideDropdown(true);
          });

          it('removes active descendants', done => {
            requestAnimationFrame(() => {
              expect(inputRemoveActiveDescendantSpy.called).to.equal(true);
              done();
            });
          });

          it('blurs input', done => {
            requestAnimationFrame(() => {
              expect(inputBlurSpy.called).to.equal(true);
              done();
            });
          });
        });
      });
    });

    describe('highlightItem', () => {
      let passedElementTriggerEventStub;
      let storeDispatchSpy;
      let storeGetGroupByIdStub;
      const groupIdValue = 'Test';

      beforeEach(() => {
        passedElementTriggerEventStub = stub();
        storeGetGroupByIdStub = stub().returns({
          value: groupIdValue,
        });
        storeDispatchSpy = spy(instance._store, 'dispatch');

        instance._store.getGroupById = storeGetGroupByIdStub;
        instance.passedElement.triggerEvent = passedElementTriggerEventStub;
      });

      afterEach(() => {
        storeDispatchSpy.restore();
        instance._store.getGroupById.reset();
        instance.passedElement.triggerEvent.reset();
      });

      describe('no item passed', () => {
        beforeEach(() => {
          output = instance.highlightItem();
        });

        returnsInstance(output);

        it('returns early', () => {
          expect(passedElementTriggerEventStub.called).to.equal(false);
          expect(storeDispatchSpy.called).to.equal(false);
          expect(storeGetGroupByIdStub.called).to.equal(false);
        });
      });

      describe('item passed', () => {
        const item = {
          id: 1234,
          value: 'Test',
          label: 'Test',
        };

        describe('passing truthy second paremeter', () => {
          beforeEach(() => {
            output = instance.highlightItem(item, true);
          });

          returnsInstance(output);

          it('dispatches highlightItem action with correct arguments', () => {
            expect(storeDispatchSpy.called).to.equal(true);
            expect(storeDispatchSpy.lastCall.args[0]).to.eql({
              type: ACTION_TYPES.HIGHLIGHT_ITEM,
              id: item.id,
              highlighted: true,
            });
          });

          describe('item with negative groupId', () => {
            beforeEach(() => {
              item.groupId = -1;
              output = instance.highlightItem(item);
            });

            it('triggers event with null groupValue', () => {
              expect(passedElementTriggerEventStub.called).to.equal(true);
              expect(passedElementTriggerEventStub.lastCall.args[0]).to.equal(
                EVENTS.highlightItem,
              );
              expect(passedElementTriggerEventStub.lastCall.args[1]).to.eql({
                id: item.id,
                value: item.value,
                label: item.label,
                groupValue: null,
              });
            });
          });

          describe('item without groupId', () => {
            beforeEach(() => {
              item.groupId = 1;
              output = instance.highlightItem(item);
            });

            it('triggers event with groupValue', () => {
              expect(passedElementTriggerEventStub.called).to.equal(true);
              expect(passedElementTriggerEventStub.lastCall.args[0]).to.equal(
                EVENTS.highlightItem,
              );
              expect(passedElementTriggerEventStub.lastCall.args[1]).to.eql({
                id: item.id,
                value: item.value,
                label: item.label,
                groupValue: groupIdValue,
              });
            });
          });
        });

        describe('passing falsey second paremeter', () => {
          beforeEach(() => {
            output = instance.highlightItem(item, false);
          });

          it("doesn't trigger event", () => {
            expect(passedElementTriggerEventStub.called).to.equal(false);
          });

          returnsInstance(output);
        });
      });
    });

    describe('unhighlightItem', () => {
      let passedElementTriggerEventStub;
      let storeDispatchSpy;
      let storeGetGroupByIdStub;
      const groupIdValue = 'Test';

      beforeEach(() => {
        passedElementTriggerEventStub = stub();
        storeGetGroupByIdStub = stub().returns({
          value: groupIdValue,
        });
        storeDispatchSpy = spy(instance._store, 'dispatch');

        instance._store.getGroupById = storeGetGroupByIdStub;
        instance.passedElement.triggerEvent = passedElementTriggerEventStub;
      });

      afterEach(() => {
        storeDispatchSpy.restore();
        instance._store.getGroupById.reset();
        instance.passedElement.triggerEvent.reset();
      });

      describe('no item passed', () => {
        beforeEach(() => {
          output = instance.unhighlightItem();
        });

        returnsInstance(output);

        it('returns early', () => {
          expect(passedElementTriggerEventStub.called).to.equal(false);
          expect(storeDispatchSpy.called).to.equal(false);
          expect(storeGetGroupByIdStub.called).to.equal(false);
        });
      });

      describe('item passed', () => {
        const item = {
          id: 1234,
          value: 'Test',
          label: 'Test',
        };

        describe('passing truthy second paremeter', () => {
          beforeEach(() => {
            output = instance.unhighlightItem(item, true);
          });

          returnsInstance(output);

          it('dispatches highlightItem action with correct arguments', () => {
            expect(storeDispatchSpy.called).to.equal(true);
            expect(storeDispatchSpy.lastCall.args[0]).to.eql({
              type: ACTION_TYPES.HIGHLIGHT_ITEM,
              id: item.id,
              highlighted: false,
            });
          });

          describe('item with negative groupId', () => {
            beforeEach(() => {
              item.groupId = -1;
              output = instance.unhighlightItem(item);
            });

            it('triggers event with null groupValue', () => {
              expect(passedElementTriggerEventStub.called).to.equal(true);
              expect(passedElementTriggerEventStub.lastCall.args[0]).to.equal(
                EVENTS.highlightItem,
              );
              expect(passedElementTriggerEventStub.lastCall.args[1]).to.eql({
                id: item.id,
                value: item.value,
                label: item.label,
                groupValue: null,
              });
            });
          });

          describe('item without groupId', () => {
            beforeEach(() => {
              item.groupId = 1;
              output = instance.highlightItem(item);
            });

            it('triggers event with groupValue', () => {
              expect(passedElementTriggerEventStub.called).to.equal(true);
              expect(passedElementTriggerEventStub.lastCall.args[0]).to.equal(
                EVENTS.highlightItem,
              );
              expect(passedElementTriggerEventStub.lastCall.args[1]).to.eql({
                id: item.id,
                value: item.value,
                label: item.label,
                groupValue: groupIdValue,
              });
            });
          });
        });

        describe('passing falsey second paremeter', () => {
          beforeEach(() => {
            output = instance.highlightItem(item, false);
          });

          it("doesn't trigger event", () => {
            expect(passedElementTriggerEventStub.called).to.equal(false);
          });

          returnsInstance(output);
        });
      });
    });

    describe('highlightAll', () => {
      let storeGetItemsStub;
      let highlightItemStub;

      const items = [
        {
          id: 1,
          value: 'Test 1',
        },
        {
          id: 2,
          value: 'Test 2',
        },
      ];

      beforeEach(() => {
        storeGetItemsStub = stub(instance._store, 'items').get(() => items);
        highlightItemStub = stub();

        instance.highlightItem = highlightItemStub;

        output = instance.highlightAll();
      });

      afterEach(() => {
        highlightItemStub.reset();
        storeGetItemsStub.reset();
      });

      returnsInstance(output);

      it('highlights each item in store', () => {
        expect(highlightItemStub.callCount).to.equal(items.length);
        expect(highlightItemStub.firstCall.args[0]).to.equal(items[0]);
        expect(highlightItemStub.lastCall.args[0]).to.equal(items[1]);
      });
    });

    describe('unhighlightAll', () => {
      let storeGetItemsStub;
      let unhighlightItemStub;

      const items = [
        {
          id: 1,
          value: 'Test 1',
        },
        {
          id: 2,
          value: 'Test 2',
        },
      ];

      beforeEach(() => {
        storeGetItemsStub = stub(instance._store, 'items').get(() => items);
        unhighlightItemStub = stub();

        instance.unhighlightItem = unhighlightItemStub;

        output = instance.unhighlightAll();
      });

      afterEach(() => {
        instance.unhighlightItem.reset();
        storeGetItemsStub.reset();
      });

      returnsInstance(output);

      it('unhighlights each item in store', () => {
        expect(unhighlightItemStub.callCount).to.equal(items.length);
        expect(unhighlightItemStub.firstCall.args[0]).to.equal(items[0]);
        expect(unhighlightItemStub.lastCall.args[0]).to.equal(items[1]);
      });
    });

    describe('clearStore', () => {
      let storeDispatchStub;

      beforeEach(() => {
        storeDispatchStub = stub();
        instance._store.dispatch = storeDispatchStub;

        output = instance.clearStore();
      });

      afterEach(() => {
        instance._store.dispatch.reset();
      });

      returnsInstance(output);

      it('dispatches clearAll action', () => {
        expect(storeDispatchStub.lastCall.args[0]).to.eql({
          type: ACTION_TYPES.CLEAR_ALL,
        });
      });
    });

    describe('clearInput', () => {
      let inputClearSpy;
      let storeDispatchStub;

      beforeEach(() => {
        inputClearSpy = spy(instance.input, 'clear');
        storeDispatchStub = stub();
        instance._store.dispatch = storeDispatchStub;
        output = instance.clearInput();
      });

      afterEach(() => {
        inputClearSpy.restore();
        instance._store.dispatch.reset();
      });

      returnsInstance(output);

      describe('text element', () => {
        beforeEach(() => {
          instance._isSelectOneElement = false;
          instance._isTextElement = false;

          output = instance.clearInput();
        });

        it('clears input with correct arguments', () => {
          expect(inputClearSpy.called).to.equal(true);
          expect(inputClearSpy.lastCall.args[0]).to.equal(true);
        });
      });

      describe('select element with search enabled', () => {
        beforeEach(() => {
          instance._isSelectOneElement = true;
          instance._isTextElement = false;
          instance.config.searchEnabled = true;

          output = instance.clearInput();
        });

        it('clears input with correct arguments', () => {
          expect(inputClearSpy.called).to.equal(true);
          expect(inputClearSpy.lastCall.args[0]).to.equal(false);
        });

        it('resets search flag', () => {
          expect(instance._isSearching).to.equal(false);
        });

        it('dispatches activateChoices action', () => {
          expect(storeDispatchStub.called).to.equal(true);
          expect(storeDispatchStub.lastCall.args[0]).to.eql({
            type: ACTION_TYPES.ACTIVATE_CHOICES,
            active: true,
          });
        });
      });
    });

    describe('ajax', () => {
      const callbackoutput = 'worked';

      let handleLoadingStateStub;
      let ajaxCallbackStub;

      const returnsEarly = () => {
        it('returns early', () => {
          expect(handleLoadingStateStub.called).to.equal(false);
          expect(ajaxCallbackStub.called).to.equal(false);
        });
      };

      beforeEach(() => {
        handleLoadingStateStub = stub();
        ajaxCallbackStub = stub().returns(callbackoutput);

        instance._ajaxCallback = ajaxCallbackStub;
        instance._handleLoadingState = handleLoadingStateStub;
      });

      afterEach(() => {
        instance._ajaxCallback.reset();
        instance._handleLoadingState.reset();
      });

      describe('not initialised', () => {
        beforeEach(() => {
          instance.initialised = false;
          output = instance.ajax(() => {});
        });

        returnsInstance(output);
        returnsEarly();
      });

      describe('text element', () => {
        beforeEach(() => {
          instance._isSelectElement = false;
          output = instance.ajax(() => {});
        });

        returnsInstance(output);
        returnsEarly();
      });

      describe('passing invalid function', () => {
        beforeEach(() => {
          output = instance.ajax(null);
        });

        returnsInstance(output);
        returnsEarly();
      });

      describe('select element', () => {
        let callback;

        beforeEach(() => {
          instance.initialised = true;
          instance._isSelectElement = true;
          ajaxCallbackStub = stub();
          callback = stub();
          output = instance.ajax(callback);
        });

        returnsInstance(output);

        it('sets loading state', done => {
          requestAnimationFrame(() => {
            expect(handleLoadingStateStub.called).to.equal(true);
            done();
          });
        });

        it('calls passed function with ajax callback', () => {
          expect(callback.called).to.equal(true);
          expect(callback.lastCall.args[0]).to.eql(callbackoutput);
        });
      });
    });

    describe('setValue', () => {
      let setChoiceOrItemStub;
      const values = [
        'Value 1',
        {
          value: 'Value 2',
        },
      ];

      beforeEach(() => {
        setChoiceOrItemStub = stub();
        instance._setChoiceOrItem = setChoiceOrItemStub;
      });

      afterEach(() => {
        instance._setChoiceOrItem.reset();
      });

      describe('not already initialised', () => {
        beforeEach(() => {
          instance.initialised = false;
          output = instance.setValue(values);
        });

        returnsInstance(output);

        it('returns early', () => {
          expect(setChoiceOrItemStub.called).to.equal(false);
        });
      });

      describe('when already initialised', () => {
        beforeEach(() => {
          instance.initialised = true;
          output = instance.setValue(values);
        });

        returnsInstance(output);

        it('sets each value', () => {
          expect(setChoiceOrItemStub.callCount).to.equal(2);
          expect(setChoiceOrItemStub.firstCall.args[0]).to.equal(values[0]);
          expect(setChoiceOrItemStub.secondCall.args[0]).to.equal(values[1]);
        });
      });
    });

    describe('setChoiceByValue', () => {
      let findAndSelectChoiceByValueStub;

      beforeEach(() => {
        findAndSelectChoiceByValueStub = stub();
        instance._findAndSelectChoiceByValue = findAndSelectChoiceByValueStub;
      });

      afterEach(() => {
        instance._findAndSelectChoiceByValue.reset();
      });

      describe('not already initialised', () => {
        beforeEach(() => {
          instance.initialised = false;
          output = instance.setChoiceByValue([]);
        });

        returnsInstance(output);

        it('returns early', () => {
          expect(findAndSelectChoiceByValueStub.called).to.equal(false);
        });
      });

      describe('when already initialised and not text element', () => {
        beforeEach(() => {
          instance.initialised = true;
          instance._isTextElement = false;
        });

        describe('passing a string value', () => {
          const value = 'Test value';

          beforeEach(() => {
            output = instance.setChoiceByValue(value);
          });

          returnsInstance(output);

          it('sets each choice with same value', () => {
            expect(findAndSelectChoiceByValueStub.called).to.equal(true);
            expect(findAndSelectChoiceByValueStub.firstCall.args[0]).to.equal(
              value,
            );
          });
        });

        describe('passing an array of values', () => {
          const values = ['Value 1', 'Value 2'];

          beforeEach(() => {
            output = instance.setChoiceByValue(values);
          });

          returnsInstance(output);

          it('sets each choice with same value', () => {
            expect(findAndSelectChoiceByValueStub.callCount).to.equal(2);
            expect(findAndSelectChoiceByValueStub.firstCall.args[0]).to.equal(
              values[0],
            );
            expect(findAndSelectChoiceByValueStub.secondCall.args[0]).to.equal(
              values[1],
            );
          });
        });
      });
    });

    describe('getValue', () => {
      let activeItemsStub;
      const items = [
        {
          id: '1',
          value: 'Test value 1',
        },
        {
          id: '2',
          value: 'Test value 2',
        },
      ];

      beforeEach(() => {
        activeItemsStub = stub(instance._store, 'activeItems').get(() => items);
      });

      afterEach(() => {
        activeItemsStub.reset();
      });

      describe('passing true valueOnly flag', () => {
        describe('select one input', () => {
          beforeEach(() => {
            instance._isSelectOneElement = true;
            output = instance.getValue(true);
          });

          it('returns a single action value', () => {
            expect(output).to.equal(items[0].value);
          });
        });

        describe('non select one input', () => {
          beforeEach(() => {
            instance._isSelectOneElement = false;
            output = instance.getValue(true);
          });

          it('returns all active item values', () => {
            expect(output).to.eql(items.map(item => item.value));
          });
        });
      });

      describe('passing false valueOnly flag', () => {
        describe('select one input', () => {
          beforeEach(() => {
            instance._isSelectOneElement = true;
            output = instance.getValue(false);
          });

          it('returns a single active item', () => {
            expect(output).to.equal(items[0]);
          });
        });

        describe('non select one input', () => {
          beforeEach(() => {
            instance._isSelectOneElement = false;
            output = instance.getValue(false);
          });

          it('returns all active items', () => {
            expect(output).to.eql(items);
          });
        });
      });
    });

    describe('removeActiveItemsByValue', () => {
      let activeItemsStub;
      let removeItemStub;
      const value = 'Removed';
      const items = [
        {
          id: '1',
          value: 'Not removed',
        },
        {
          id: '2',
          value: 'Removed',
        },
        {
          id: '3',
          value: 'Removed',
        },
      ];

      beforeEach(() => {
        removeItemStub = stub();
        activeItemsStub = stub(instance._store, 'activeItems').get(() => items);
        instance._removeItem = removeItemStub;

        output = instance.removeActiveItemsByValue(value);
      });

      afterEach(() => {
        activeItemsStub.reset();
        instance._removeItem.reset();
      });

      it('removes each active item in store with matching value', () => {
        expect(removeItemStub.callCount).to.equal(2);
        expect(removeItemStub.firstCall.args[0]).to.equal(items[1]);
        expect(removeItemStub.secondCall.args[0]).to.equal(items[2]);
      });
    });

    describe('removeActiveItems', () => {
      let activeItemsStub;
      let removeItemStub;
      const items = [
        {
          id: '1',
          value: 'Not removed',
        },
        {
          id: '2',
          value: 'Removed',
        },
        {
          id: '3',
          value: 'Removed',
        },
      ];

      beforeEach(() => {
        removeItemStub = stub();
        activeItemsStub = stub(instance._store, 'activeItems').get(() => items);
        instance._removeItem = removeItemStub;
      });

      afterEach(() => {
        activeItemsStub.reset();
        instance._removeItem.reset();
      });

      describe('not passing id to exclude', () => {
        beforeEach(() => {
          output = instance.removeActiveItems();
        });

        it('removes all active items in store', () => {
          expect(removeItemStub.callCount).to.equal(items.length);
          expect(removeItemStub.firstCall.args[0]).to.equal(items[0]);
          expect(removeItemStub.secondCall.args[0]).to.equal(items[1]);
          expect(removeItemStub.thirdCall.args[0]).to.equal(items[2]);
        });
      });

      describe('passing id to exclude', () => {
        const idToExclude = '2';

        beforeEach(() => {
          output = instance.removeActiveItems(idToExclude);
        });

        it('removes all active items in store with id that does match excludedId', () => {
          expect(removeItemStub.callCount).to.equal(2);
          expect(removeItemStub.firstCall.args[0]).to.equal(items[0]);
          expect(removeItemStub.secondCall.args[0]).to.equal(items[2]);
        });
      });
    });

    describe('removeHighlightedItems', () => {
      let highlightedActiveItemsStub;
      let removeItemStub;
      let triggerChangeStub;

      const items = [
        {
          id: 1,
          value: 'Test 1',
        },
        {
          id: 2,
          value: 'Test 2',
        },
      ];

      beforeEach(() => {
        highlightedActiveItemsStub = stub(
          instance._store,
          'highlightedActiveItems',
        ).get(() => items);
        removeItemStub = stub();
        triggerChangeStub = stub();

        instance._removeItem = removeItemStub;
        instance._triggerChange = triggerChangeStub;
      });

      afterEach(() => {
        highlightedActiveItemsStub.reset();
        instance._removeItem.reset();
        instance._triggerChange.reset();
      });

      describe('runEvent parameter being passed', () => {
        beforeEach(() => {
          output = instance.removeHighlightedItems();
        });

        returnsInstance(output);

        it('removes each highlighted item in store', () => {
          expect(removeItemStub.callCount).to.equal(2);
        });
      });

      describe('runEvent parameter not being passed', () => {
        beforeEach(() => {
          output = instance.removeHighlightedItems(true);
        });

        returnsInstance(output);

        it('triggers event with item value', () => {
          expect(triggerChangeStub.callCount).to.equal(2);
          expect(triggerChangeStub.firstCall.args[0]).to.equal(items[0].value);
          expect(triggerChangeStub.secondCall.args[0]).to.equal(items[1].value);
        });
      });
    });

    describe('setChoices', () => {
      let clearChoicesStub;
      let addGroupStub;
      let addChoiceStub;
      let containerOuterRemoveLoadingStateStub;
      const value = 'value';
      const label = 'label';
      const choices = [
        {
          id: '1',
          value: '1',
          label: 'Test 1',
        },
        {
          id: '2',
          value: '2',
          label: 'Test 2',
        },
      ];
      const groups = [
        {
          ...choices[0],
          choices,
        },
        ...choices[1],
      ];

      beforeEach(() => {
        clearChoicesStub = stub();
        addGroupStub = stub();
        addChoiceStub = stub();
        containerOuterRemoveLoadingStateStub = stub();

        instance.clearChoices = clearChoicesStub;
        instance._addGroup = addGroupStub;
        instance._addChoice = addChoiceStub;
        instance.containerOuter.removeLoadingState = containerOuterRemoveLoadingStateStub;
      });

      afterEach(() => {
        instance.clearChoices.reset();
        instance._addGroup.reset();
        instance._addChoice.reset();
        instance.containerOuter.removeLoadingState.reset();
      });

      const returnsEarly = () => {
        it('returns early', () => {
          expect(addGroupStub.called).to.equal(false);
          expect(addChoiceStub.called).to.equal(false);
          expect(clearChoicesStub.called).to.equal(false);
        });
      };

      describe('when element is not select element', () => {
        beforeEach(() => {
          instance._isSelectElement = false;
          instance.setChoices(choices, value, label, false);
        });

        returnsEarly();
      });

      describe('passing invalid arguments', () => {
        describe('passing no value', () => {
          beforeEach(() => {
            instance._isSelectElement = true;
            instance.setChoices(choices, undefined, 'label', false);
          });

          returnsEarly();
        });
      });

      describe('passing valid arguments', () => {
        beforeEach(() => {
          instance._isSelectElement = true;
        });

        it('removes loading state', () => {
          instance.setChoices(choices, value, label, false);
          expect(containerOuterRemoveLoadingStateStub.called).to.equal(true);
        });

        describe('passing choices with children choices', () => {
          it('adds groups', () => {
            instance.setChoices(groups, value, label, false);
            expect(addGroupStub.callCount).to.equal(1);
            expect(addGroupStub.firstCall.args[0]).to.eql({
              group: groups[0],
              id: groups[0].id,
              valueKey: value,
              labelKey: label,
            });
          });
        });

        describe('passing choices without children choices', () => {
          it('adds passed choices', () => {
            instance.setChoices(choices, value, label, false);
            expect(addChoiceStub.callCount).to.equal(2);
            addChoiceStub.getCalls().forEach((call, index) => {
              expect(call.args[0]).to.eql({
                value: choices[index][value],
                label: choices[index][label],
                isSelected: choices[index].selected,
                isDisabled: choices[index].disabled,
                customProperties: choices[index].customProperties,
                placeholder: choices[index].placeholder,
              });
            });
          });
        });

        describe('passing an empty array with a true replaceChoices flag', () => {
          it('choices are cleared', () => {
            instance._isSelectElement = true;
            instance.setChoices([], value, label, true);
            expect(clearChoicesStub.called).to.equal(true);
          });
        });

        describe('passing an empty array with a false replaceChoices flag', () => {
          it('choices stay the same', () => {
            instance._isSelectElement = true;
            instance.setChoices([], value, label, false);
            expect(clearChoicesStub.called).to.equal(false);
          });
        });

        describe('passing true replaceChoices flag', () => {
          it('choices are cleared', () => {
            instance.setChoices(choices, value, label, true);
            expect(clearChoicesStub.called).to.equal(true);
          });
        });

        describe('passing false replaceChoices flag', () => {
          it('choices are not cleared', () => {
            instance.setChoices(choices, value, label, false);
            expect(clearChoicesStub.called).to.equal(false);
          });
        });
      });
    });

    describe('_createGroupsFragment', () => {
      let _createChoicesFragmentStub;
      const choices = [
        {
          id: 1,
          selected: true,
          groupId: 1,
          value: 'Choice 1',
          label: 'Choice 1',
        },
        {
          id: 2,
          selected: false,
          groupId: 2,
          value: 'Choice 2',
          label: 'Choice 2',
        },
        {
          id: 3,
          selected: false,
          groupId: 1,
          value: 'Choice 3',
          label: 'Choice 3',
        },
      ];

      const groups = [
        {
          id: 2,
          value: 'Group 2',
          active: true,
          disabled: false,
        },
        {
          id: 1,
          value: 'Group 1',
          active: true,
          disabled: false,
        },
      ];

      beforeEach(() => {
        _createChoicesFragmentStub = stub();
        instance._createChoicesFragment = _createChoicesFragmentStub;
      });

      afterEach(() => {
        instance._createChoicesFragment.reset();
      });

      describe('returning a fragment of groups', () => {
        describe('passing fragment argument', () => {
          it('updates fragment with groups', () => {
            const fragment = document.createDocumentFragment();
            const childElement = document.createElement('div');
            fragment.appendChild(childElement);

            output = instance._createGroupsFragment(groups, choices, fragment);
            const elementToWrapFragment = document.createElement('div');
            elementToWrapFragment.appendChild(output);

            expect(output).to.be.instanceOf(DocumentFragment);
            expect(elementToWrapFragment.children[0]).to.eql(childElement);
            expect(
              elementToWrapFragment.querySelectorAll('[data-group]').length,
            ).to.equal(2);
          });
        });

        describe('not passing fragment argument', () => {
          it('returns new groups fragment', () => {
            output = instance._createGroupsFragment(groups, choices);
            const elementToWrapFragment = document.createElement('div');
            elementToWrapFragment.appendChild(output);

            expect(output).to.be.instanceOf(DocumentFragment);
            expect(
              elementToWrapFragment.querySelectorAll('[data-group]').length,
            ).to.equal(2);
          });
        });

        describe('sorting groups', () => {
          let sortFnStub;

          beforeEach(() => {
            sortFnStub = stub();
            instance.config.sortFn = sortFnStub;
            instance.config.shouldSort = true;
          });

          afterEach(() => {
            instance.config.sortFn.reset();
          });

          it('sorts groups by config.sortFn', () => {
            expect(sortFnStub.called).to.equal(false);
            instance._createGroupsFragment(groups, choices);
            expect(sortFnStub.called).to.equal(true);
          });
        });

        describe('not sorting groups', () => {
          let sortFnStub;

          beforeEach(() => {
            sortFnStub = stub();
            instance.config.sortFn = sortFnStub;
            instance.config.shouldSort = false;
          });

          afterEach(() => {
            instance.config.sortFn.reset();
          });

          it('does not sort groups', () => {
            instance._createGroupsFragment(groups, choices);
            expect(sortFnStub.called).to.equal(false);
          });
        });

        describe('select-one element', () => {
          beforeEach(() => {
            instance._isSelectOneElement = true;
          });

          it('calls _createChoicesFragment with choices that belong to each group', () => {
            expect(_createChoicesFragmentStub.called).to.equal(false);
            instance._createGroupsFragment(groups, choices);
            expect(_createChoicesFragmentStub.called).to.equal(true);
            expect(_createChoicesFragmentStub.firstCall.args[0]).to.eql([
              {
                id: 1,
                selected: true,
                groupId: 1,
                value: 'Choice 1',
                label: 'Choice 1',
              },
              {
                id: 3,
                selected: false,
                groupId: 1,
                value: 'Choice 3',
                label: 'Choice 3',
              },
            ]);
            expect(_createChoicesFragmentStub.secondCall.args[0]).to.eql([
              {
                id: 2,
                selected: false,
                groupId: 2,
                value: 'Choice 2',
                label: 'Choice 2',
              },
            ]);
          });
        });

        describe('text/select-multiple element', () => {
          describe('renderSelectedChoices set to "always"', () => {
            beforeEach(() => {
              instance._isSelectOneElement = false;
              instance.config.renderSelectedChoices = 'always';
            });

            it('calls _createChoicesFragment with choices that belong to each group', () => {
              expect(_createChoicesFragmentStub.called).to.equal(false);
              instance._createGroupsFragment(groups, choices);
              expect(_createChoicesFragmentStub.called).to.equal(true);
              expect(_createChoicesFragmentStub.firstCall.args[0]).to.eql([
                {
                  id: 1,
                  selected: true,
                  groupId: 1,
                  value: 'Choice 1',
                  label: 'Choice 1',
                },
                {
                  id: 3,
                  selected: false,
                  groupId: 1,
                  value: 'Choice 3',
                  label: 'Choice 3',
                },
              ]);
              expect(_createChoicesFragmentStub.secondCall.args[0]).to.eql([
                {
                  id: 2,
                  selected: false,
                  groupId: 2,
                  value: 'Choice 2',
                  label: 'Choice 2',
                },
              ]);
            });
          });

          describe('renderSelectedChoices not set to "always"', () => {
            beforeEach(() => {
              instance._isSelectOneElement = false;
              instance.config.renderSelectedChoices = false;
            });

            it('calls _createChoicesFragment with choices that belong to each group that are not already selected', () => {
              expect(_createChoicesFragmentStub.called).to.equal(false);
              instance._createGroupsFragment(groups, choices);
              expect(_createChoicesFragmentStub.called).to.equal(true);
              expect(_createChoicesFragmentStub.firstCall.args[0]).to.eql([
                {
                  id: 3,
                  selected: false,
                  groupId: 1,
                  value: 'Choice 3',
                  label: 'Choice 3',
                },
              ]);
              expect(_createChoicesFragmentStub.secondCall.args[0]).to.eql([
                {
                  id: 2,
                  selected: false,
                  groupId: 2,
                  value: 'Choice 2',
                  label: 'Choice 2',
                },
              ]);
            });
          });
        });
      });
    });
  });
});
