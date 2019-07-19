# Choices.js ![Build Status](https://travis-ci.org/jshjohnson/Choices.svg?branch=master) [![](https://data.jsdelivr.com/v1/package/npm/choices.js/badge?style=rounded)](https://www.jsdelivr.com/package/npm/choices.js) [![npm](https://img.shields.io/npm/v/choices.js.svg)](https://www.npmjs.com/package/choices.js) [![codebeat badge](https://codebeat.co/badges/55120150-5866-42d8-8010-6aaaff5d3fa1)](https://codebeat.co/projects/github-com-jshjohnson-choices-master)
A vanilla, lightweight (~22kb gzipped 🎉), configurable select box/text input plugin. Similar to Select2 and Selectize but without the jQuery dependency.

[Demo](https://joshuajohnson.co.uk/Choices/)

## TL;DR
* Lightweight
* No jQuery dependency
* Configurable sorting
* Flexible styling
* Fast search/filtering
* Clean API
* Right-to-left support
* Custom templates

----
### Interested in writing your own ES6 JavaScript plugins? Check out [ES6.io](https://ES6.io/friend/JOHNSON) for great tutorials! 💪🏼
----

## Installation
With [NPM](https://www.npmjs.com/package/choices.js):
```zsh
npm install choices.js
```

With [Yarn](https://yarnpkg.com/):
```zsh
yarn add choices.js
```

From a [CDN](https://www.jsdelivr.com/package/npm/choices.js):

**Note:** There is sometimes a delay before the latest version of Choices in reflected on the CDN.

```html
<!-- Include base CSS (optional) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/choices.js/public/assets/styles/base.min.css">
<!-- Include Choices CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/choices.js/public/assets/styles/choices.min.css">
<!-- Include Choices JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/choices.js/public/assets/scripts/choices.min.js"></script>
```

Or include Choices directly:

```html
<!-- Include base CSS (optional) -->
<link rel="stylesheet" href="public/assets/styles/base.min.css">
<!-- Include Choices CSS -->
<link rel="stylesheet" href="public/assets/styles/choices.min.css">
<!-- Include Choices JavaScript -->
<script src="/public/assets/scripts/choices.min.js"></script>
```
## Setup

If you pass a selector which targets multiple elements, an array of Choices instances
will be returned. If you target one element, that instance will be returned.

```js
  // Pass multiple elements:
  const [firstInstance, secondInstance] = new Choices(elements);

  // Pass single element:
  const choices = new Choices(element);

  // Pass reference
  const choices = new Choices('[data-trigger]');
  const choices = new Choices('.js-choice');

  // Pass jQuery element
  const choices = new Choices($('.js-choice')[0]);

   // Passing options (with default options)
  const choices = new Choices(elements, {
    silent: false,
    items: [],
    choices: [],
    renderChoiceLimit: -1,
    maxItemCount: -1,
    addItems: true,
    addItemFilterFn: null,
    removeItems: true,
    removeItemButton: false,
    editItems: false,
    duplicateItemsAllowed: true,
    delimiter: ',',
    paste: true,
    searchEnabled: true,
    searchChoices: true,
    searchFloor: 1,
    searchResultLimit: 4,
    searchFields: ['label', 'value'],
    position: 'auto',
    resetScrollPosition: true,
    shouldSort: true,
    shouldSortItems: false,
    sortFn: () => {...},
    placeholder: true,
    placeholderValue: null,
    searchPlaceholderValue: null,
    prependValue: null,
    appendValue: null,
    renderSelectedChoices: 'auto',
    loadingText: 'Loading...',
    noResultsText: 'No results found',
    noChoicesText: 'No choices to choose from',
    itemSelectText: 'Press to select',
    addItemText: (value) => {
      return `Press Enter to add <b>"${value}"</b>`;
    },
    maxItemText: (maxItemCount) => {
      return `Only ${maxItemCount} values can be added`;
    },
    itemComparer: (choice, item) => {
      return choice === item;
    },
    classNames: {
      containerOuter: 'choices',
      containerInner: 'choices__inner',
      input: 'choices__input',
      inputCloned: 'choices__input--cloned',
      list: 'choices__list',
      listItems: 'choices__list--multiple',
      listSingle: 'choices__list--single',
      listDropdown: 'choices__list--dropdown',
      item: 'choices__item',
      itemSelectable: 'choices__item--selectable',
      itemDisabled: 'choices__item--disabled',
      itemChoice: 'choices__item--choice',
      placeholder: 'choices__placeholder',
      group: 'choices__group',
      groupHeading: 'choices__heading',
      button: 'choices__button',
      activeState: 'is-active',
      focusState: 'is-focused',
      openState: 'is-open',
      disabledState: 'is-disabled',
      highlightedState: 'is-highlighted',
      hiddenState: 'is-hidden',
      flippedState: 'is-flipped',
      loadingState: 'is-loading',
      noResults: 'has-no-results',
      noChoices: 'has-no-choices'
    },
    // Choices uses the great Fuse library for searching. You
    // can find more options here: https://github.com/krisk/Fuse#options
    fuseOptions: {
      include: 'score'
    },
    callbackOnInit: null,
    callbackOnCreateTemplates: null
  });
```

## Terminology
| Word   | Definition |
| ------ | ---------- |
| Choice | A choice is a value a user can select. A choice would be equivelant to the `<option></option>` element within a select input.  |
| Group  | A group is a collection of choices. A group should be seen as equivalent to a `<optgroup></optgroup>` element within a select input.|
| Item   | An item is an inputted value (text input) or a selected choice (select element). In the context of a select element, an item is equivelent to a selected option element: `<option value="Hello" selected></option>` whereas in the context of a text input an item is equivelant to `<input type="text" value="Hello">`|


## Configuration options
### silent
**Type:** `Boolean`  **Default:**  `false`

**Input types affected:** `text`, `select-single`, `select-multiple`

**Usage:** Optionally suppress console errors and warnings.


### items
**Type:** `Array`  **Default:**  `[]`

**Input types affected:** `text`

**Usage:** Add pre-selected items (see terminology) to text input.

Pass an array of strings:

`['value 1', 'value 2', 'value 3']`

Pass an array of objects:

```
[{
  value: 'Value 1',
  label: 'Label 1',
  id: 1
},
{
  value: 'Value 2',
  label: 'Label 2',
  id: 2,
  customProperties: {
    random: 'I am a custom property'
  }
}]
```

### choices
**Type:** `Array`  **Default:**  `[]`

**Input types affected:** `select-one`, `select-multiple`

**Usage:** Add choices (see terminology) to select input.

Pass an array of objects:

```
[{
  value: 'Option 1',
  label: 'Option 1',
  selected: true,
  disabled: false,
},
{
  value: 'Option 2',
  label: 'Option 2',
  selected: false,
  disabled: true,
  customProperties: {
    description: 'Custom description about Option 2',
    random: 'Another random custom property'
  },
}]
```

### renderChoiceLimit
**Type:** `Number` **Default:** `-1`

**Input types affected:** `select-one`, `select-multiple`

**Usage:** The amount of choices to be rendered within the dropdown list ("-1" indicates no limit). This is useful if you have a lot of choices where it is easier for a user to use the search area to find a choice.

### maxItemCount
**Type:** `Number` **Default:** `-1`

**Input types affected:** `text`, `select-multiple`

**Usage:** The amount of items a user can input/select ("-1" indicates no limit).

### addItems
**Type:** `Boolean` **Default:** `true`

**Input types affected:** `text`

**Usage:** Whether a user can add items.

### removeItems
**Type:** `Boolean` **Default:** `true`

**Input types affected:** `text`, `select-multiple`

**Usage:** Whether a user can remove items.

### removeItemButton
**Type:** `Boolean` **Default:** `false`

**Input types affected:** `text`, `select-one`, `select-multiple`

**Usage:** Whether each item should have a remove button.

### editItems
**Type:** `Boolean` **Default:** `false`

**Input types affected:** `text`

**Usage:** Whether a user can edit items. An item's value can be edited by pressing the backspace.

### duplicateItemsAllowed
**Type:** `Boolean` **Default:** `true`

**Input types affected:** `text`, `select-multiple`

**Usage:** Whether duplicate inputted/chosen items are allowed

### delimiter
**Type:** `String` **Default:** `,`

**Input types affected:** `text`

**Usage:** What divides each value. The default delimiter seperates each value with a comma: `"Value 1, Value 2, Value 3"`.

### paste
**Type:** `Boolean` **Default:** `true`

**Input types affected:** `text`, `select-multiple`

**Usage:** Whether a user can paste into the input.

### searchEnabled
**Type:** `Boolean` **Default:** `true`

**Input types affected:** `select-one`

**Usage:** Whether a search area should be shown. **Note:** Multiple select boxes will *always* show search areas.

### searchChoices
**Type:** `Boolean` **Default:** `true`

**Input types affected:** `select-one`

**Usage:** Whether choices should be filtered by input or not. If `false`, the search event will still emit, but choices will not be filtered.


### searchFields
**Type:** `Array/String` **Default:** `['label', 'value']`

**Input types affected:**`select-one`, `select-multiple`

**Usage:** Specify which fields should be used when a user is searching. If you have added custom properties to your choices, you can add these values thus: `['label', 'value', 'customProperties.example']`.

### searchFloor
**Type:** `Number` **Default:** `1`

**Input types affected:** `select-one`, `select-multiple`

**Usage:** The minimum length a search value should be before choices are searched.

### searchResultLimit: 4,
**Type:** `Number` **Default:** `4`

**Input types affected:** `select-one`, `select-multiple`

**Usage:** The maximum amount of search results to show.

### position
**Type:** `String` **Default:** `auto`

**Input types affected:** `select-one`, `select-multiple`

**Usage:** Whether the dropdown should appear above (`top`) or below (`bottom`) the input. By default, if there is not enough space within the window the dropdown will appear above the input, otherwise below it.

### resetScrollPosition
**Type:** `Boolean` **Default:** `true`

**Input types affected:** `select-multiple`

**Usage:** Whether the scroll position should reset after adding an item.

### addItemFilterFn
**Type:** `Function` **Default:** `null`

**Input types affected:** `text`

**Usage:** A filter function that will need to return `true` for a user to successfully add an item.

**Example:**

```js
// Only adds items matching the text test
new Choices(element, {
  addItemFilterFn: (value) => {
    return (value !== 'test');
  };
});
```

### shouldSort
**Type:** `Boolean` **Default:** `true`

**Input types affected:** `select-one`, `select-multiple`

**Usage:** Whether choices and groups should be sorted. If false, choices/groups will appear in the order they were given.

### shouldSortItems
**Type:** `Boolean` **Default:** `false`

**Input types affected:** `text`, `select-multiple`

**Usage:** Whether items should be sorted. If false, items will appear in the order they were selected.

### sortFn
**Type:** `Function` **Default:** sortByAlpha

**Input types affected:** `select-one`, `select-multiple`

**Usage:** The function that will sort choices and items before they are displayed (unless a user is searching). By default choices and items are sorted by alphabetical order.

**Example:**

```js
// Sorting via length of label from largest to smallest
const example = new Choices(element, {
  sortFn: function(a, b) {
    return b.label.length - a.label.length;
  },
};
```

### placeholder
**Type:** `Boolean` **Default:** `true`

**Input types affected:** `text`, `select-multiple`

**Usage:** Whether the input should show a placeholder. Used in conjunction with `placeholderValue`. If `placeholder` is set to true and no value is passed to `placeholderValue`, the passed input's placeholder attribute will be used as the  placeholder value.

**Note:** For single select boxes, the recommended way of adding a placeholder is as follows:

```html
<select>
  <option placeholder>This is a placeholder</option>
  <option>...</option>
  <option>...</option>
  <option>...</option>
</select>
```

### placeholderValue
**Type:** `String` **Default:** `null`

**Input types affected:** `text`, `select-multiple`

**Usage:** The value of the inputs placeholder.

### searchPlaceholderValue
**Type:** `String` **Default:** `null`

**Input types affected:** `select-one`

**Usage:** The value of the search inputs placeholder.

### prependValue
**Type:** `String` **Default:** `null`

**Input types affected:** `text`, `select-one`, `select-multiple`

**Usage:** Prepend a value to each item added/selected.

### appendValue
**Type:** `String` **Default:** `null`

**Input types affected:** `text`, `select-one`, `select-multiple`

**Usage:** Append a value to each item added/selected.

### renderSelectedChoices
**Type:** `String` **Default:** `auto`

**Input types affected:** `select-multiple`

**Usage:** Whether selected choices should be removed from the list. By default choices are removed when they are selected in multiple select box. To always render choices pass `always`.

### loadingText
**Type:** `String` **Default:** `Loading...`

**Input types affected:** `select-one`, `select-multiple`

**Usage:** The text that is shown whilst choices are being populated via AJAX.

### noResultsText
**Type:** `String/Function` **Default:** `No results found`

**Input types affected:** `select-one`, `select-multiple`

**Usage:** The text that is shown when a user's search has returned no results. Optionally pass a function returning a string.

### noChoicesText
**Type:** `String/Function` **Default:** `No choices to choose from`

**Input types affected:** `select-multiple`

**Usage:** The text that is shown when a user has selected all possible choices. Optionally pass a function returning a string.

### itemSelectText
**Type:** `String` **Default:** `Press to select`

**Input types affected:** `select-multiple`, `select-one`

**Usage:** The text that is shown when a user hovers over a selectable choice.

### addItemText
**Type:** `String/Function` **Default:** `Press Enter to add "${value}"`

**Input types affected:** `text`

**Usage:** The text that is shown when a user has inputted a new item but has not pressed the enter key. To access the current input value, pass a function with a `value` argument (see the [default config](https://github.com/jshjohnson/Choices#setup) for an example), otherwise pass a string.

### maxItemText
**Type:** `String/Function` **Default:** `Only ${maxItemCount} values can be added`

**Input types affected:** `text`

**Usage:** The text that is shown when a user has focus on the input but has already reached the [max item count](https://github.com/jshjohnson/Choices#maxitemcount). To access the max item count, pass a function with a `maxItemCount` argument (see the [default config](https://github.com/jshjohnson/Choices#setup) for an example), otherwise pass a string.

### itemComparer
**Type:** `Function` **Default:** `strict equality`

**Input types affected:** `select-one`, `select-multiple`

**Usage:** Compare choice and value in appropriate way (e.g. deep equality for objects). To compare choice and value, pass a function with a `itemComparer` argument (see the [default config](https://github.com/jshjohnson/Choices#setup) for an example).

### classNames
**Type:** `Object` **Default:**

```
classNames: {
  containerOuter: 'choices',
  containerInner: 'choices__inner',
  input: 'choices__input',
  inputCloned: 'choices__input--cloned',
  list: 'choices__list',
  listItems: 'choices__list--multiple',
  listSingle: 'choices__list--single',
  listDropdown: 'choices__list--dropdown',
  item: 'choices__item',
  itemSelectable: 'choices__item--selectable',
  itemDisabled: 'choices__item--disabled',
  itemOption: 'choices__item--choice',
  group: 'choices__group',
  groupHeading : 'choices__heading',
  button: 'choices__button',
  activeState: 'is-active',
  focusState: 'is-focused',
  openState: 'is-open',
  disabledState: 'is-disabled',
  highlightedState: 'is-highlighted',
  hiddenState: 'is-hidden',
  flippedState: 'is-flipped',
  selectedState: 'is-highlighted',
}
```

**Input types affected:** `text`, `select-one`, `select-multiple`

**Usage:** Classes added to HTML generated by Choices. By default classnames follow the [BEM](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) notation.

## Callbacks
**Note:** For each callback, `this` refers to the current instance of Choices. This can be useful if you need access to methods (`this.disable()`) or the config object (`this.config`).

### callbackOnInit
**Type:** `Function` **Default:** `null`

**Input types affected:** `text`, `select-one`, `select-multiple`

**Usage:** Function to run once Choices initialises.

### callbackOnCreateTemplates
**Type:** `Function` **Default:** `null` **Arguments:** `template`

**Input types affected:** `text`, `select-one`, `select-multiple`

**Usage:** Function to run on template creation. Through this callback it is possible to provide custom templates for the various components of Choices (see terminology). For Choices to work with custom templates, it is important you maintain the various data attributes defined [here](https://github.com/jshjohnson/Choices/blob/master/src/scripts/templates.js).

**Example:**

```js
const example = new Choices(element, {
  callbackOnCreateTemplates: function (template) {
    return {
      item: (classNames, data) => {
        return template(`
          <div class="${classNames.item} ${data.highlighted ? classNames.highlightedState : classNames.itemSelectable}" data-item data-id="${data.id}" data-value="${data.value}" ${data.active ? 'aria-selected="true"' : ''} ${data.disabled ? 'aria-disabled="true"' : ''}>
            <span>&bigstar;</span> ${data.label}
          </div>
        `);
      },
      choice: (classNames, data) => {
        return template(`
          <div class="${classNames.item} ${classNames.itemChoice} ${data.disabled ? classNames.itemDisabled : classNames.itemSelectable}" data-select-text="${this.config.itemSelectText}" data-choice ${data.disabled ? 'data-choice-disabled aria-disabled="true"' : 'data-choice-selectable'} data-id="${data.id}" data-value="${data.value}" ${data.groupId > 0 ? 'role="treeitem"' : 'role="option"'}>
            <span>&bigstar;</span> ${data.label}
          </div>
        `);
      },
    };
  }
});
```

## Events
**Note:** Events fired by Choices behave the same as standard events. Each event is triggered on the element passed to Choices (accessible via `this.passedElement`. Arguments are accessible within the `event.detail` object.

**Example:**

```js
const element = document.getElementById('example');
const example = new Choices(element);

element.addEventListener('addItem', function(event) {
  // do something creative here...
  console.log(event.detail.id);
  console.log(event.detail.value);
  console.log(event.detail.label);
  console.log(event.detail.customProperties);
  console.log(event.detail.groupValue);
}, false);

// or
const example = new Choices(document.getElementById('example'));

example.passedElement.element.addEventListener('addItem', function(event) {
  // do something creative here...
  console.log(event.detail.id);
  console.log(event.detail.value);
  console.log(event.detail.label);
  console.log(event.detail.customProperties);
  console.log(event.detail.groupValue);
}, false);
```

### addItem
**Arguments:** `id, value, label, groupValue, keyCode`

**Input types affected:** `text`, `select-one`, `select-multiple`

**Usage:** Triggered each time an item is added (programmatically or by the user).

### removeItem
**Arguments:** `id, value, label, groupValue`

**Input types affected:** `text`, `select-one`, `select-multiple`

**Usage:** Triggered each time an item is removed (programmatically or by the user).

### highlightItem
**Arguments:** `id, value, label, groupValue`

**Input types affected:** `text`, `select-multiple`

**Usage:** Triggered each time an item is highlighted.

### unhighlightItem
**Arguments:** `id, value, label, groupValue`

**Input types affected:** `text`, `select-multiple`

**Usage:** Triggered each time an item is unhighlighted.

### choice
**Arguments:** `value, keyCode`

**Input types affected:** `select-one`, `select-multiple`

**Usage:** Triggered each time a choice is selected **by a user**, regardless if it changes the value of the input.

### change
**Arguments:** `value`

**Input types affected:** `text`, `select-one`, `select-multiple`

**Usage:** Triggered each time an item is added/removed **by a user**.

### search
**Arguments:** `value`, `resultCount`

**Input types affected:** `select-one`, `select-multiple`

**Usage:** Triggered when a user types into an input to search choices.

### showDropdown
**Arguments:** -

**Input types affected:** `select-one`, `select-multiple`

**Usage:** Triggered when the dropdown is shown.

### hideDropdown
**Arguments:** -

**Input types affected:** `select-one`, `select-multiple`

**Usage:** Triggered when the dropdown is hidden.

### highlightChoice
**Arguments:** `el`

**Input types affected:** `select-one`, `select-multiple`

**Usage:** Triggered when a choice from the dropdown is highlighted. The `el` argument is the HTML element node object that was affected.

## Methods
Methods can be called either directly or by chaining:

```js
// Calling a method by chaining
const choices = new Choices(element, {
    addItems: false,
    removeItems: false,
  })
  .setValue(['Set value 1', 'Set value 2'])
  .disable();

// Calling a method directly
const choices = new Choices(element, {
  addItems: false,
  removeItems: false,
});

choices.setValue(['Set value 1', 'Set value 2'])
choices.disable();
```

### destroy();
**Input types affected:** `text`, `select-multiple`, `select-one`

**Usage:** Kills the instance of Choices, removes all event listeners and returns passed input to its initial state.

### init();
**Input types affected:** `text`, `select-multiple`, `select-one`

**Usage:** Creates a new instance of Choices, adds event listeners, creates templates and renders a Choices element to the DOM.

**Note:** This is called implicitly when a new instance of Choices is created. This would be used after a Choices instance had already been destroyed (using `destroy()`).

### highlightAll();
**Input types affected:** `text`, `select-multiple`

**Usage:** Highlight each chosen item (selected items can be removed).


### unhighlightAll();
**Input types affected:** `text`, `select-multiple`

**Usage:** Un-highlight each chosen item.


### removeActiveItemsByValue(value);
**Input types affected:** `text`, `select-multiple`

**Usage:** Remove each item by a given value.


### removeActiveItems(excludedId);
**Input types affected:** `text`, `select-multiple`

**Usage:** Remove each selectable item.


### removeHighlightedItems();
**Input types affected:** `text`, `select-multiple`

**Usage:** Remove each item the user has selected.


### showDropdown();
**Input types affected:** `select-one`, `select-multiple`

**Usage:** Show option list dropdown (only affects select inputs).


### hideDropdown();
**Input types affected:** `text`, `select-multiple`

**Usage:** Hide option list dropdown (only affects select inputs).

### setChoices(choices, value, label, replaceChoices);
**Input types affected:** `select-one`, `select-multiple`

**Usage:** Set choices of select input via an array of objects, a value name and a label name. This behaves the same as passing items via the `choices` option but can be called after initialising Choices. This can also be used to add groups of choices (see example 2); Optionally pass a true `replaceChoices` value to remove any existing choices. Optionally pass a `customProperties` object to add additional data to your choices (useful when searching/filtering etc). Passing an empty array as the first parameter, and a true `replaceChoices` is the same as calling `clearChoices` (see below).

**Example 1:**

```js
const example = new Choices(element);

example.setChoices([
  {value: 'One', label: 'Label One', disabled: true},
  {value: 'Two', label: 'Label Two', selected: true},
  {value: 'Three', label: 'Label Three'},
], 'value', 'label', false);
```

**Example 2:**

```js
const example = new Choices(element);

example.setChoices([{
  label: 'Group one',
  id: 1,
  disabled: false,
  choices: [
    {value: 'Child One', label: 'Child One', selected: true},
    {value: 'Child Two', label: 'Child Two',  disabled: true},
    {value: 'Child Three', label: 'Child Three'},
  ]
},
{
  label: 'Group two',
  id: 2,
  disabled: false,
  choices: [
    {value: 'Child Four', label: 'Child Four', disabled: true},
    {value: 'Child Five', label: 'Child Five'},
    {value: 'Child Six', label: 'Child Six', customProperties: {
      description: 'Custom description about child six',
      random: 'Another random custom property'
    }},
  ]
}], 'value', 'label', false);
```

### clearChoices();
**Input types affected:** `select-one`, `select-multiple`

**Usage:** Clear all choices from select

### getValue(valueOnly)
**Input types affected:** `text`, `select-one`, `select-multiple`

**Usage:** Get value(s) of input (i.e. inputted items (text) or selected choices (select)). Optionally pass an argument of `true` to only return values rather than value objects.

**Example:**

```js
const example = new Choices(element);
const values = example.getValue(true); // returns ['value 1', 'value 2'];
const valueArray = example.getValue(); // returns [{ active: true, choiceId: 1, highlighted: false, id: 1, label: 'Label 1', value: 'Value 1'},  { active: true, choiceId: 2, highlighted: false, id: 2, label: 'Label 2', value: 'Value 2'}];
```

### setValue(args);
**Input types affected:** `text`

**Usage:** Set value of input based on an array of objects or strings. This behaves exactly the same as passing items via the `items` option but can be called after initialising Choices.

**Example:**

```js
const example = new Choices(element);

// via an array of objects
example.setValue([
  {value: 'One', label: 'Label One'},
  {value: 'Two', label: 'Label Two'},
  {value: 'Three', label: 'Label Three'},
]);

// or via an array of strings
example.setValue(['Four','Five','Six']);
```

### setChoiceByValue(value);
**Input types affected:** `select-one`, `select-multiple`

**Usage:** Set value of input based on existing Choice. `value` can be either a single string or an array of strings

**Example:**

```js
const example = new Choices(element, {
  choices: [
    {value: 'One', label: 'Label One'},
    {value: 'Two', label: 'Label Two', disabled: true},
    {value: 'Three', label: 'Label Three'},
  ],
});

example.setChoiceByValue('Two'); // Choice with value of 'Two' has now been selected.
```

### clearStore();
**Input types affected:** `text`, `select-one`, `select-multiple`

**Usage:** Removes all items, choices and groups. Use with caution.


### clearInput();
**Input types affected:** `text`

**Usage:** Clear input of any user inputted text.


### disable();
**Input types affected:** `text`, `select-one`, `select-multiple`

**Usage:** Disables input from accepting new value/selecting further choices.

### enable();
**Input types affected:** `text`, `select-one`, `select-multiple`

**Usage:** Enables input to accept new values/select further choices.


### ajax(fn);
**Input types affected:** `select-one`, `select-multiple`

**Usage:** Populate choices/groups via a callback.

**Example:**

```js
var example = new Choices(element);

example.ajax(function(callback) {
  fetch(url)
    .then(function(response) {
      response.json().then(function(data) {
        callback(data, 'value', 'label');
      });
    })
    .catch(function(error) {
      console.log(error);
    });
});
```

**Example 2:**
If your structure differs from `data.value` and `data.key` structure you can write your own `key` and `value` into the `callback` function. This could be useful when you don't want to transform the given response.

```js
const example = new Choices(element)

example.ajax(function(callback) {
  fetch(url)
    .then(function(response) {
      response.json().then(function(data) {
        callback(data, 'data.key', 'data.value');
      });
    })
    .catch(function(error) {
      console.log(error);
    });
});
```

## Browser compatibility
Choices is compiled using [Babel](https://babeljs.io/) to enable support for [ES5 browsers](http://caniuse.com/#feat=es5). If you need to support a browser that does not support one of the features listed below, I suggest including a polyfill from the very good [polyfill.io](https://cdn.polyfill.io/v2/docs/):

**Polyfill example used for the demo:**

```html
<script src="https://cdn.polyfill.io/v2/polyfill.js?features=es5,fetch,Element.prototype.classList,requestAnimationFrame,Node.insertBefore,Node.firstChild,CustomEvent"></script>
```

**Features used in Choices:**

* Array.prototype.forEach
* Array.prototype.map
* Array.prototype.find
* Array.prototype.some
* Array.prototype.includes
* Array.from
* Array.prototype.reduce
* Array.prototype.indexOf
* Object.assign
* Element.prototype.classList
* window.requestAnimationFrame
* CustomEvent

## Development
To setup a local environment: clone this repo, navigate into it's directory in a terminal window and run the following command:

```npm install```

### NPM tasks
| Task                 | Usage                                                        |
| -------------------- | ------------------------------------------------------------ |
| `npm run start`      | Fire up local server for development                         |
| `npm run test:unit`  | Run sequence of tests once                                   |
| `npm run test:unit:watch` | Fire up test server and re-test on file change          |
| `npm run test:e2e`    | Run sequence of e2e tests (with local server)               |
| `npm run test`    | Run both unit and e2e tests                                     |
| `npm run cypress:open`    | Run Cypress e2e tests (GUI)                        |
| `npm run cypress:run`    | Run Cypress e2e tests (CLI)                                  |
| `npm run js:build`   | Compile Choices to an uglified JavaScript file               |
| `npm run css:watch`  | Watch SCSS files for changes. On a change, run build process |
| `npm run css:build`  | Compile, minify and prefix SCSS files to CSS                 |

## License
MIT License

## Web component
Want to use Choices as a web component? You're in luck. Adidas have built one for their design system which can be found [here](https://github.com/adidas/choicesjs-stencil).

## Misc
Thanks to [@mikefrancis](https://github.com/mikefrancis/) for [sending me on a hunt](https://twitter.com/_mikefrancis/status/701797835826667520) for a non-jQuery solution for select boxes that eventually led to this being built!
