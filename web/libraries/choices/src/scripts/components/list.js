import { SCROLLING_SPEED } from '../constants';

export default class List {
  constructor({ element }) {
    Object.assign(this, { element });

    this.scrollPos = this.element.scrollTop;
    this.height = this.element.offsetHeight;
    this.hasChildren = !!this.element.children;
  }

  clear() {
    this.element.innerHTML = '';
  }

  append(node) {
    this.element.appendChild(node);
  }

  getChild(selector) {
    return this.element.querySelector(selector);
  }

  scrollToTop() {
    this.element.scrollTop = 0;
  }

  scrollToChoice(choice, direction) {
    if (!choice) {
      return;
    }

    const dropdownHeight = this.element.offsetHeight;
    const choiceHeight = choice.offsetHeight;
    // Distance from bottom of element to top of parent
    const choicePos = choice.offsetTop + choiceHeight;
    // Scroll position of dropdown
    const containerScrollPos = this.element.scrollTop + dropdownHeight;
    // Difference between the choice and scroll position
    const endpoint =
      direction > 0
        ? this.element.scrollTop + choicePos - containerScrollPos
        : choice.offsetTop;

    requestAnimationFrame(time => {
      this._animateScroll(time, endpoint, direction);
    });
  }

  _scrollDown(scrollPos, strength, endpoint) {
    const easing = (endpoint - scrollPos) / strength;
    const distance = easing > 1 ? easing : 1;

    this.element.scrollTop = scrollPos + distance;
  }

  _scrollUp(scrollPos, strength, endpoint) {
    const easing = (scrollPos - endpoint) / strength;
    const distance = easing > 1 ? easing : 1;

    this.element.scrollTop = scrollPos - distance;
  }

  _animateScroll(time, endpoint, direction) {
    const strength = SCROLLING_SPEED;
    const choiceListScrollTop = this.element.scrollTop;
    let continueAnimation = false;

    if (direction > 0) {
      this._scrollDown(choiceListScrollTop, strength, endpoint);

      if (choiceListScrollTop < endpoint) {
        continueAnimation = true;
      }
    } else {
      this._scrollUp(choiceListScrollTop, strength, endpoint);

      if (choiceListScrollTop > endpoint) {
        continueAnimation = true;
      }
    }

    if (continueAnimation) {
      requestAnimationFrame(() => {
        this._animateScroll(time, endpoint, direction);
      });
    }
  }
}
