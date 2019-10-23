import { r as registerInstance, c as getIonMode, h, H as Host, e as getElement } from './core-950489bb.js';
import { c as createColorClasses, h as hostContext, o as openURL } from './theme-215399f6.js';

const Item = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.itemStyles = new Map();
        this.multipleInputs = false;
        /**
         * If `true`, a button tag will be rendered and the item will be tappable.
         */
        this.button = false;
        /**
         * The icon to use when `detail` is set to `true`.
         */
        this.detailIcon = 'ios-arrow-forward';
        /**
         * If `true`, the user cannot interact with the item.
         */
        this.disabled = false;
        /**
         * When using a router, it specifies the transition direction when navigating to
         * another page using `href`.
         */
        this.routerDirection = 'forward';
        /**
         * The type of the button. Only used when an `onclick` or `button` property is present.
         */
        this.type = 'button';
    }
    itemStyle(ev) {
        ev.stopPropagation();
        const tagName = ev.target.tagName;
        const updatedStyles = ev.detail;
        const newStyles = {};
        const childStyles = this.itemStyles.get(tagName) || {};
        let hasStyleChange = false;
        Object.keys(updatedStyles).forEach(key => {
            if (updatedStyles[key]) {
                const itemKey = `item-${key}`;
                if (!childStyles[itemKey]) {
                    hasStyleChange = true;
                }
                newStyles[itemKey] = true;
            }
        });
        if (!hasStyleChange && Object.keys(newStyles).length !== Object.keys(childStyles).length) {
            hasStyleChange = true;
        }
        if (hasStyleChange) {
            this.itemStyles.set(tagName, newStyles);
            this.el.forceUpdate();
        }
    }
    componentDidLoad() {
        // The following elements have a clickable cover that is relative to the entire item
        const covers = this.el.querySelectorAll('ion-checkbox, ion-datetime, ion-select, ion-radio');
        // The following elements can accept focus alongside the previous elements
        // therefore if these elements are also a child of item, we don't want the
        // input cover on top of those interfering with their clicks
        const inputs = this.el.querySelectorAll('ion-input, ion-range, ion-searchbar, ion-segment, ion-textarea, ion-toggle');
        // Check for multiple inputs to change the position of the input cover to relative
        // for all of the covered inputs above
        this.multipleInputs = covers.length + inputs.length > 1;
    }
    // If the item contains an input including a checkbox, datetime, select, or radio
    // then the item will have a clickable input cover that covers the item
    // that should get the hover, focused and activated states UNLESS it has multiple
    // inputs, then those need to individually get each click
    hasCover() {
        const inputs = this.el.querySelectorAll('ion-checkbox, ion-datetime, ion-select, ion-radio');
        return inputs.length === 1 && !this.multipleInputs;
    }
    // If the item has an href or button property it will render a native
    // anchor or button that is clickable
    isClickable() {
        return (this.href !== undefined || this.button);
    }
    canActivate() {
        return (this.isClickable() || this.hasCover());
    }
    render() {
        const { detail, detailIcon, download, lines, disabled, href, rel, target, routerDirection } = this;
        const childStyles = {};
        const mode = getIonMode(this);
        const clickable = this.isClickable();
        const canActivate = this.canActivate();
        const TagType = clickable ? (href === undefined ? 'button' : 'a') : 'div';
        const attrs = (TagType === 'button')
            ? { type: this.type }
            : {
                download,
                href,
                rel,
                target
            };
        const showDetail = detail !== undefined ? detail : mode === 'ios' && clickable;
        this.itemStyles.forEach(value => {
            Object.assign(childStyles, value);
        });
        return (h(Host, { "aria-disabled": disabled ? 'true' : null, class: Object.assign(Object.assign(Object.assign({}, childStyles), createColorClasses(this.color)), { 'item': true, [mode]: true, [`item-lines-${lines}`]: lines !== undefined, 'item-disabled': disabled, 'in-list': hostContext('ion-list', this.el), 'item-multiple-inputs': this.multipleInputs, 'ion-activatable': canActivate, 'ion-focusable': true }) }, h(TagType, Object.assign({}, attrs, { class: "item-native", disabled: disabled, onClick: (ev) => openURL(href, ev, routerDirection) }), h("slot", { name: "start" }), h("div", { class: "item-inner" }, h("div", { class: "input-wrapper" }, h("slot", null)), h("slot", { name: "end" }), showDetail && h("ion-icon", { icon: detailIcon, lazy: false, class: "item-detail-icon" }), h("div", { class: "item-inner-highlight" })), canActivate && mode === 'md' && h("ion-ripple-effect", null)), h("div", { class: "item-highlight" })));
    }
    get el() { return getElement(this); }
    static get style() { return ":host {\n  /**\n   * \@prop --background: Background of the item\n   * \@prop --background-activated: Background of the item when pressed\n   * \@prop --background-focused: Background of the item when focused with the tab key\n   * \@prop --background-hover: Background of the item on hover\n   *\n   * \@prop --border-color: Color of the item border\n   * \@prop --border-radius: Radius of the item border\n   * \@prop --border-style: Style of the item border\n   * \@prop --border-width: Width of the item border\n   *\n   * \@prop --box-shadow: Box shadow of the item\n   *\n   * \@prop --color: Color of the item\n   * \@prop --color-activated: Color of the item when pressed\n   * \@prop --color-focused: Color of the item when focused with the tab key\n   * \@prop --color-hover: Color of the item on hover\n   *\n   * \@prop --detail-icon-color: Color of the item detail icon\n   * \@prop --detail-icon-opacity: Opacity of the item detail icon\n   * \@prop --detail-icon-font-size: Font size of the item detail icon\n   * \@prop --inner-border-width: Width of the item inner border\n   *\n   * \@prop --inner-box-shadow: Box shadow of the item inner\n   * \@prop --inner-padding-top: Top padding of the item inner\n   * \@prop --inner-padding-end: Right padding if direction is left-to-right, and left padding if direction is right-to-left of the item inner\n   * \@prop --inner-padding-bottom: Bottom padding of the item inner\n   * \@prop --inner-padding-start: Left padding if direction is left-to-right, and right padding if direction is right-to-left of the item inner\n   *\n   * \@prop --min-height: Minimum height of the item\n   *\n   * \@prop --padding-bottom: Bottom padding of the item\n   * \@prop --padding-end: Right padding if direction is left-to-right, and left padding if direction is right-to-left of the item\n   * \@prop --padding-start: Left padding if direction is left-to-right, and right padding if direction is right-to-left of the item\n   * \@prop --padding-top: Top padding of the item\n   *\n   * \@prop --transition: Transition of the item\n   *\n   * \@prop --ripple-color: Color of the item ripple effect\n   *\n   * \@prop --highlight-height: The height of the highlight on the item\n   * \@prop --highlight-color-focused: The color of the highlight on the item when focused\n   * \@prop --highlight-color-valid: The color of the highlight on the item when valid\n   * \@prop --highlight-color-invalid: The color of the highlight on the item when invalid\n   */\n  --border-radius: 0px;\n  --border-width: 0px;\n  --border-style: solid;\n  --padding-top: 0px;\n  --padding-bottom: 0px;\n  --padding-end: 0px;\n  --padding-start: 0px;\n  --box-shadow: none;\n  --inner-border-width: 0px;\n  --inner-padding-top: 0px;\n  --inner-padding-bottom: 0px;\n  --inner-padding-start: 0px;\n  --inner-padding-end: 0px;\n  --inner-box-shadow: none;\n  --show-full-highlight: 0;\n  --show-inset-highlight: 0;\n  --detail-icon-color: initial;\n  --detail-icon-font-size: 20px;\n  --detail-icon-opacity: 0.25;\n  --color-activated: var(--color);\n  --color-focused: var(--color);\n  --color-hover: var(--color);\n  --ripple-color: var(--ion-item-background-activated, currentColor);\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  display: block;\n  position: relative;\n  outline: none;\n  color: var(--color);\n  font-family: var(--ion-font-family, inherit);\n  text-align: initial;\n  text-decoration: none;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  overflow: hidden;\n}\n\n:host(.ion-color) .item-native {\n  background: var(--ion-color-base);\n  color: var(--ion-color-contrast);\n}\n\n:host(.ion-color) .item-native,\n:host(.ion-color) .item-inner {\n  border-color: var(--ion-color-shade);\n}\n\n:host(.ion-focused) .item-native {\n  background: var(--background-focused);\n  color: var(--color-focused);\n}\n\n:host(.ion-color.ion-focused) .item-native {\n  background: var(--ion-color-shade);\n  color: var(--ion-color-contrast);\n}\n\n\@media (any-hover: hover) {\n  :host(.ion-activatable:hover) .item-native {\n    background: var(--background-hover);\n    color: var(--color-hover);\n  }\n\n  :host(.ion-color.ion-activatable:hover) .item-native {\n    background: var(--ion-color-tint);\n    color: var(--ion-color-contrast);\n  }\n}\n:host(.activated) .item-native {\n  background: var(--background-activated);\n  color: var(--color-activated);\n}\n\n:host(.item-interactive-disabled:not(.item-multiple-inputs)) {\n  cursor: default;\n  pointer-events: none;\n}\n\n:host(.item-disabled) {\n  cursor: default;\n  opacity: 0.3;\n  pointer-events: none;\n}\n\n.item-native {\n  border-radius: var(--border-radius);\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 0;\n  margin-bottom: 0;\n  padding-left: calc(var(--padding-start) + var(--ion-safe-area-left, 0px));\n  padding-right: var(--padding-end);\n  padding-top: var(--padding-top);\n  padding-bottom: var(--padding-bottom);\n  font-family: inherit;\n  font-size: inherit;\n  font-style: inherit;\n  font-weight: inherit;\n  letter-spacing: inherit;\n  text-decoration: inherit;\n  text-overflow: inherit;\n  text-transform: inherit;\n  text-align: inherit;\n  white-space: inherit;\n  color: inherit;\n  display: -ms-flexbox;\n  display: flex;\n  position: relative;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n  width: 100%;\n  min-height: var(--min-height);\n  -webkit-transition: var(--transition);\n  transition: var(--transition);\n  border-width: var(--border-width);\n  border-style: var(--border-style);\n  border-color: var(--border-color);\n  outline: none;\n  background: var(--background);\n  -webkit-box-shadow: var(--box-shadow);\n  box-shadow: var(--box-shadow);\n  overflow: inherit;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  .item-native {\n    padding-left: unset;\n    padding-right: unset;\n    -webkit-padding-start: calc(var(--padding-start) + var(--ion-safe-area-left, 0px));\n    padding-inline-start: calc(var(--padding-start) + var(--ion-safe-area-left, 0px));\n    -webkit-padding-end: var(--padding-end);\n    padding-inline-end: var(--padding-end);\n  }\n}\n\n.item-native::-moz-focus-inner {\n  border: 0;\n}\n\nbutton, a {\n  cursor: pointer;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  -webkit-user-drag: none;\n}\n\n.item-inner {\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 0;\n  margin-bottom: 0;\n  padding-left: var(--inner-padding-start);\n  padding-right: calc(var(--ion-safe-area-right, 0px) + var(--inner-padding-end));\n  padding-top: var(--inner-padding-top);\n  padding-bottom: var(--inner-padding-bottom);\n  display: -ms-flexbox;\n  display: flex;\n  position: relative;\n  -ms-flex: 1;\n  flex: 1;\n  -ms-flex-direction: inherit;\n  flex-direction: inherit;\n  -ms-flex-align: inherit;\n  align-items: inherit;\n  -ms-flex-item-align: stretch;\n  align-self: stretch;\n  min-height: inherit;\n  border-width: var(--inner-border-width);\n  border-style: var(--border-style);\n  border-color: var(--border-color);\n  -webkit-box-shadow: var(--inner-box-shadow);\n  box-shadow: var(--inner-box-shadow);\n  overflow: inherit;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  .item-inner {\n    padding-left: unset;\n    padding-right: unset;\n    -webkit-padding-start: var(--inner-padding-start);\n    padding-inline-start: var(--inner-padding-start);\n    -webkit-padding-end: calc(var(--ion-safe-area-right, 0px) + var(--inner-padding-end));\n    padding-inline-end: calc(var(--ion-safe-area-right, 0px) + var(--inner-padding-end));\n  }\n}\n\n.item-detail-icon {\n  color: var(--detail-icon-color);\n  font-size: var(--detail-icon-font-size);\n  opacity: var(--detail-icon-opacity);\n}\n\n::slotted(ion-icon) {\n  font-size: 1.6em;\n}\n\n::slotted(ion-button) {\n  --margin-top: 0;\n  --margin-bottom: 0;\n  --margin-start: 0;\n  --margin-end: 0;\n  z-index: 1;\n}\n\n::slotted(ion-label) {\n  -ms-flex: 1;\n  flex: 1;\n}\n\n:host([vertical-align-top]),\n:host(.item-input) {\n  -ms-flex-align: start;\n  align-items: flex-start;\n}\n\n.input-wrapper {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex: 1;\n  flex: 1;\n  -ms-flex-direction: inherit;\n  flex-direction: inherit;\n  -ms-flex-align: inherit;\n  align-items: inherit;\n  -ms-flex-item-align: stretch;\n  align-self: stretch;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\n:host(.item-label-stacked) .item-native,\n:host(.item-label-floating) .item-native {\n  -ms-flex-align: start;\n  align-items: start;\n}\n\n:host(.item-label-stacked) .input-wrapper,\n:host(.item-label-floating) .input-wrapper {\n  -ms-flex: 1;\n  flex: 1;\n  -ms-flex-direction: column;\n  flex-direction: column;\n}\n\n.item-highlight,\n.item-inner-highlight {\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  background: var(--highlight-background);\n}\n\n.item-highlight {\n  height: var(--full-highlight-height);\n}\n\n.item-inner-highlight {\n  height: var(--inset-highlight-height);\n}\n\n:host(.item-interactive.item-has-focus),\n:host(.item-interactive.ion-touched.ion-invalid) {\n  --full-highlight-height: calc(var(--highlight-height) * var(--show-full-highlight));\n  --inset-highlight-height: calc(var(--highlight-height) * var(--show-inset-highlight));\n}\n\n:host(.item-interactive.item-has-focus) {\n  --highlight-background: var(--highlight-color-focused);\n}\n\n:host(.item-interactive.ion-valid) {\n  --highlight-background: var(--highlight-color-valid);\n}\n\n:host(.item-interactive.ion-invalid) {\n  --highlight-background: var(--highlight-color-invalid);\n}\n\n:host(.item-label-stacked) ::slotted(ion-select),\n:host(.item-label-floating) ::slotted(ion-select) {\n  --padding-start: 0;\n  -ms-flex-item-align: stretch;\n  align-self: stretch;\n  width: 100%;\n  max-width: 100%;\n}\n\n:host(.item-label-stacked) ::slotted(ion-datetime),\n:host(.item-label-floating) ::slotted(ion-datetime) {\n  --padding-start: 0;\n  width: 100%;\n}\n\n:host(.item-multiple-inputs) ::slotted(ion-checkbox),\n:host(.item-multiple-inputs) ::slotted(ion-datetime),\n:host(.item-multiple-inputs) ::slotted(ion-radio),\n:host(.item-multiple-inputs) ::slotted(ion-select) {\n  position: relative;\n}\n\n:host(.item-textarea) {\n  -ms-flex-align: stretch;\n  align-items: stretch;\n}\n\n::slotted(ion-reorder[slot]) {\n  margin-top: 0;\n  margin-bottom: 0;\n}\nion-ripple-effect {\n  color: var(--ripple-color);\n}\n\n:host {\n  --min-height: 48px;\n  --background: var(--ion-item-background, var(--ion-background-color, #fff));\n  --background-activated: var(--background);\n  --background-focused: var(--ion-item-background-focused, var(--ion-color-step-100, #e1e1e1));\n  --background-hover: var(--ion-item-background-hover, rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.04));\n  --border-color: var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-150, rgba(0, 0, 0, 0.13))));\n  --color: var(--ion-item-color, var(--ion-text-color, #000));\n  --transition: background-color 300ms cubic-bezier(.4, 0, .2, 1);\n  --padding-start: 16px;\n  --color: var(--ion-item-color, var(--ion-text-color, #000));\n  --border-color: var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-150, rgba(0, 0, 0, 0.13))));\n  --inner-padding-end: 16px;\n  --inner-border-width: 0 0 1px 0;\n  --highlight-height: 2px;\n  --highlight-color-focused: var(--ion-color-primary, #3880ff);\n  --highlight-color-valid: var(--ion-color-success, #10dc60);\n  --highlight-color-invalid: var(--ion-color-danger, #f04141);\n  font-size: 16px;\n  font-weight: normal;\n  text-transform: none;\n}\n\n:host(.ion-focused.activated) .item-native {\n  background: var(--background-focused);\n  color: var(--color-focused);\n}\n\n:host(.ion-color.activated) .item-native {\n  background: var(--ion-color-base);\n  color: var(--ion-color-contrast);\n}\n\n:host(.ion-color.ion-focused.activated) .item-native {\n  background: var(--ion-color-shade);\n  color: var(--ion-color-contrast);\n}\n\n:host(.item-interactive) {\n  --border-width: 0 0 1px 0;\n  --inner-border-width: 0;\n  --show-full-highlight: 1;\n  --show-inset-highlight: 0;\n}\n\n:host(.item-lines-full) {\n  --border-width: 0 0 1px 0;\n  --show-full-highlight: 1;\n  --show-inset-highlight: 0;\n}\n\n:host(.item-lines-inset) {\n  --inner-border-width: 0 0 1px 0;\n  --show-full-highlight: 0;\n  --show-inset-highlight: 1;\n}\n\n:host(.item-lines-inset),\n:host(.item-lines-none) {\n  --border-width: 0;\n  --show-full-highlight: 0;\n}\n\n:host(.item-lines-full),\n:host(.item-lines-none) {\n  --inner-border-width: 0;\n  --show-inset-highlight: 0;\n}\n\n:host(.item-multi-line) ::slotted([slot=start]),\n:host(.item-multi-line) ::slotted([slot=end]) {\n  margin-top: 16px;\n  margin-bottom: 16px;\n  -ms-flex-item-align: start;\n  align-self: flex-start;\n}\n::slotted([slot=start]) {\n  margin-right: 32px;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  ::slotted([slot=start]) {\n    margin-right: unset;\n    -webkit-margin-end: 32px;\n    margin-inline-end: 32px;\n  }\n}\n\n::slotted([slot=end]) {\n  margin-left: 32px;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  ::slotted([slot=end]) {\n    margin-left: unset;\n    -webkit-margin-start: 32px;\n    margin-inline-start: 32px;\n  }\n}\n\n::slotted(ion-icon) {\n  color: rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.54);\n  font-size: 24px;\n}\n\n:host(.ion-color) ::slotted(ion-icon) {\n  color: var(--ion-color-contrast);\n}\n\n::slotted(ion-icon[slot]) {\n  margin-top: 12px;\n  margin-bottom: 12px;\n}\n::slotted(ion-icon[slot=start]) {\n  margin-right: 32px;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  ::slotted(ion-icon[slot=start]) {\n    margin-right: unset;\n    -webkit-margin-end: 32px;\n    margin-inline-end: 32px;\n  }\n}\n\n::slotted(ion-icon[slot=end]) {\n  margin-left: 16px;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  ::slotted(ion-icon[slot=end]) {\n    margin-left: unset;\n    -webkit-margin-start: 16px;\n    margin-inline-start: 16px;\n  }\n}\n\n::slotted(ion-toggle[slot=start]),\n::slotted(ion-toggle[slot=end]) {\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 0;\n  margin-bottom: 0;\n}\n\n::slotted(ion-note) {\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 0;\n  margin-bottom: 0;\n  -ms-flex-item-align: start;\n  align-self: flex-start;\n  font-size: 11px;\n}\n\n::slotted(ion-note[slot]) {\n  padding-left: 0;\n  padding-right: 0;\n  padding-top: 18px;\n  padding-bottom: 10px;\n}\n\n::slotted(ion-note[slot=start]) {\n  padding-right: 16px;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  ::slotted(ion-note[slot=start]) {\n    padding-right: unset;\n    -webkit-padding-end: 16px;\n    padding-inline-end: 16px;\n  }\n}\n\n::slotted(ion-note[slot=end]) {\n  padding-left: 16px;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  ::slotted(ion-note[slot=end]) {\n    padding-left: unset;\n    -webkit-padding-start: 16px;\n    padding-inline-start: 16px;\n  }\n}\n\n::slotted(ion-avatar) {\n  width: 40px;\n  height: 40px;\n}\n\n::slotted(ion-thumbnail) {\n  width: 56px;\n  height: 56px;\n}\n\n::slotted(ion-avatar),\n::slotted(ion-thumbnail) {\n  margin-top: 8px;\n  margin-bottom: 8px;\n}\n::slotted(ion-avatar[slot=start]),\n::slotted(ion-thumbnail[slot=start]) {\n  margin-right: 16px;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  ::slotted(ion-avatar[slot=start]),\n::slotted(ion-thumbnail[slot=start]) {\n    margin-right: unset;\n    -webkit-margin-end: 16px;\n    margin-inline-end: 16px;\n  }\n}\n\n::slotted(ion-avatar[slot=end]),\n::slotted(ion-thumbnail[slot=end]) {\n  margin-left: 16px;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  ::slotted(ion-avatar[slot=end]),\n::slotted(ion-thumbnail[slot=end]) {\n    margin-left: unset;\n    -webkit-margin-start: 16px;\n    margin-inline-start: 16px;\n  }\n}\n\n::slotted(ion-label) {\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 11px;\n  margin-bottom: 10px;\n}\n\n:host(.item-label-stacked) ::slotted([slot=end]),\n:host(.item-label-floating) ::slotted([slot=end]) {\n  margin-top: 7px;\n  margin-bottom: 7px;\n}\n:host(.item-toggle) ::slotted(ion-label),\n:host(.item-radio) ::slotted(ion-label) {\n  margin-left: 0;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  :host(.item-toggle) ::slotted(ion-label),\n:host(.item-radio) ::slotted(ion-label) {\n    margin-left: unset;\n    -webkit-margin-start: 0;\n    margin-inline-start: 0;\n  }\n}\n\n::slotted(.button-small) {\n  --padding-top: 0;\n  --padding-bottom: 0;\n  --padding-start: .6em;\n  --padding-end: .6em;\n  height: 25px;\n  font-size: 12px;\n}\n\n:host(.item-label-floating),\n:host(.item-label-stacked) {\n  --min-height: 55px;\n}\n\n:host(.item-label-stacked) ::slotted(ion-select),\n:host(.item-label-floating) ::slotted(ion-select) {\n  --padding-top: 8px;\n  --padding-bottom: 8px;\n  --padding-start: 0;\n}\n\n:host(.item-has-focus:not(.ion-color)) ::slotted(.label-stacked),\n:host(.item-has-focus:not(.ion-color)) ::slotted(.label-floating) {\n  color: var(--ion-color-primary, #3880ff);\n}"; }
};

export { Item as ion_item };
