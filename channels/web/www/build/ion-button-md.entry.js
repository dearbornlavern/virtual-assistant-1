import { r as registerInstance, f as createEvent, c as getIonMode, h, H as Host, e as getElement } from './core-950489bb.js';
import { h as hasShadowDom } from './helpers-ad941782.js';
import { o as openURL, c as createColorClasses } from './theme-215399f6.js';

const Button = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.inToolbar = false;
        this.inItem = false;
        /**
         * The type of button.
         */
        this.buttonType = 'button';
        /**
         * If `true`, the user cannot interact with the button.
         */
        this.disabled = false;
        /**
         * When using a router, it specifies the transition direction when navigating to
         * another page using `href`.
         */
        this.routerDirection = 'forward';
        /**
         * If `true`, activates a button with a heavier font weight.
         */
        this.strong = false;
        /**
         * The type of the button.
         */
        this.type = 'button';
        this.handleClick = (ev) => {
            if (this.type === 'button') {
                openURL(this.href, ev, this.routerDirection);
            }
            else if (hasShadowDom(this.el)) {
                // this button wants to specifically submit a form
                // climb up the dom to see if we're in a <form>
                // and if so, then use JS to submit it
                const form = this.el.closest('form');
                if (form) {
                    ev.preventDefault();
                    const fakeButton = document.createElement('button');
                    fakeButton.type = this.type;
                    fakeButton.style.display = 'none';
                    form.appendChild(fakeButton);
                    fakeButton.click();
                    fakeButton.remove();
                }
            }
        };
        this.onFocus = () => {
            this.ionFocus.emit();
        };
        this.onBlur = () => {
            this.ionBlur.emit();
        };
        this.ionFocus = createEvent(this, "ionFocus", 7);
        this.ionBlur = createEvent(this, "ionBlur", 7);
    }
    componentWillLoad() {
        this.inToolbar = !!this.el.closest('ion-buttons');
        this.inItem = !!this.el.closest('ion-item') || !!this.el.closest('ion-item-divider');
    }
    get hasIconOnly() {
        return !!this.el.querySelector('ion-icon[slot="icon-only"]');
    }
    get rippleType() {
        const hasClearFill = this.fill === undefined || this.fill === 'clear';
        // If the button is in a toolbar, has a clear fill (which is the default)
        // and only has an icon we use the unbounded "circular" ripple effect
        if (hasClearFill && this.hasIconOnly && this.inToolbar) {
            return 'unbounded';
        }
        return 'bounded';
    }
    render() {
        const mode = getIonMode(this);
        const { buttonType, type, disabled, rel, target, size, href, color, expand, hasIconOnly, shape, strong } = this;
        const finalSize = size === undefined && this.inItem ? 'small' : size;
        const TagType = href === undefined ? 'button' : 'a';
        const attrs = (TagType === 'button')
            ? { type }
            : {
                download: this.download,
                href,
                rel,
                target
            };
        let fill = this.fill;
        if (fill === undefined) {
            fill = this.inToolbar ? 'clear' : 'solid';
        }
        return (h(Host, { onClick: this.handleClick, "aria-disabled": disabled ? 'true' : null, class: Object.assign(Object.assign({}, createColorClasses(color)), { [mode]: true, [buttonType]: true, [`${buttonType}-${expand}`]: expand !== undefined, [`${buttonType}-${finalSize}`]: finalSize !== undefined, [`${buttonType}-${shape}`]: shape !== undefined, [`${buttonType}-${fill}`]: true, [`${buttonType}-strong`]: strong, 'button-has-icon-only': hasIconOnly, 'button-disabled': disabled, 'ion-activatable': true, 'ion-focusable': true }) }, h(TagType, Object.assign({}, attrs, { class: "button-native", disabled: disabled, onFocus: this.onFocus, onBlur: this.onBlur }), h("span", { class: "button-inner" }, h("slot", { name: "icon-only" }), h("slot", { name: "start" }), h("slot", null), h("slot", { name: "end" })), mode === 'md' && h("ion-ripple-effect", { type: this.rippleType }))));
    }
    get el() { return getElement(this); }
    static get style() { return ":host {\n  /**\n   * \@prop --background: Background of the button\n   * \@prop --background-activated: Background of the button when pressed\n   * \@prop --background-focused: Background of the button when focused with the tab key\n   * \@prop --background-hover: Background of the button on hover\n   *\n   * \@prop --color: Text color of the button\n   * \@prop --color-activated: Text color of the button when pressed\n   * \@prop --color-focused: Text color of the button when focused with the tab key\n   * \@prop --color-hover: Text color of the button when hover\n   *\n   * \@prop --transition: Transition of the button\n   *\n   * \@prop --border-radius: Border radius of the button\n   * \@prop --border-width: Border width of the button\n   * \@prop --border-style: Border style of the button\n   * \@prop --border-color: Border color of the button\n   *\n   * \@prop --ripple-color: Color of the button ripple effect\n   *\n   * \@prop --box-shadow: Box shadow of the button\n   * \@prop --opacity: Opacity of the button\n   *\n   * \@prop --padding-top: Top padding of the button\n   * \@prop --padding-end: Right padding if direction is left-to-right, and left padding if direction is right-to-left of the button\n   * \@prop --padding-bottom: Bottom padding of the button\n   * \@prop --padding-start: Left padding if direction is left-to-right, and right padding if direction is right-to-left of the button\n   */\n  --overflow: hidden;\n  --ripple-color: currentColor;\n  --border-width: initial;\n  --border-color: initial;\n  --border-style: initial;\n  --color-hover: initial;\n  --box-shadow: none;\n  display: inline-block;\n  width: auto;\n  color: var(--color);\n  font-family: var(--ion-font-family, inherit);\n  text-align: center;\n  text-decoration: none;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  vertical-align: top;\n  vertical-align: -webkit-baseline-middle;\n  pointer-events: auto;\n  -webkit-font-kerning: none;\n  font-kerning: none;\n}\n\n:host(.button-disabled) {\n  --opacity: .5;\n  pointer-events: none;\n}\n\n:host(.button-disabled) .button-native {\n  cursor: default;\n  pointer-events: none;\n}\n\n:host(.button-solid) {\n  --background: var(--ion-color-primary, #3880ff);\n  --background-focused: var(--ion-color-primary-shade, #3171e0);\n  --background-hover: var(--ion-color-primary-tint, #4c8dff);\n  --color: var(--ion-color-primary-contrast, #fff);\n  --color-activated: var(--ion-color-primary-contrast, #fff);\n  --color-focused: var(--ion-color-primary-contrast, #fff);\n}\n\n:host(.button-solid.ion-color) .button-native {\n  background: var(--ion-color-base);\n  color: var(--ion-color-contrast);\n}\n\n:host(.button-solid.ion-color.ion-focused) .button-native {\n  background: var(--ion-color-shade);\n}\n\n:host(.button-outline) {\n  --border-color: var(--ion-color-primary, #3880ff);\n  --background: transparent;\n  --color: var(--ion-color-primary, #3880ff);\n  --color-focused: var(--ion-color-primary, #3880ff);\n}\n\n:host(.button-outline.ion-color) .button-native {\n  border-color: var(--ion-color-base);\n  background: transparent;\n  color: var(--ion-color-base);\n}\n\n:host(.button-outline.ion-focused.ion-color) .button-native {\n  background: rgba(var(--ion-color-base-rgb), 0.1);\n  color: var(--ion-color-base);\n}\n\n:host(.button-clear) {\n  --border-width: 0;\n  --background: transparent;\n  --color: var(--ion-color-primary, #3880ff);\n}\n\n:host(.button-clear.ion-color) .button-native {\n  background: transparent;\n  color: var(--ion-color-base);\n}\n\n:host(.button-clear.ion-focused.ion-color) .button-native {\n  background: rgba(var(--ion-color-base-rgb), 0.1);\n  color: var(--ion-color-base);\n}\n\n:host(.button-clear.activated.ion-color) .button-native {\n  background: transparent;\n}\n\n:host(.button-block) {\n  display: block;\n}\n\n:host(.button-block) .button-native {\n  margin-left: 0;\n  margin-right: 0;\n  display: block;\n  width: 100%;\n  clear: both;\n  contain: content;\n}\n\n:host(.button-block) .button-native::after {\n  clear: both;\n}\n\n:host(.button-full) {\n  display: block;\n}\n\n:host(.button-full) .button-native {\n  margin-left: 0;\n  margin-right: 0;\n  display: block;\n  width: 100%;\n  contain: content;\n}\n\n:host(.button-full:not(.button-round)) .button-native {\n  border-radius: 0;\n  border-right-width: 0;\n  border-left-width: 0;\n}\n\n.button-native {\n  border-radius: var(--border-radius);\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 0;\n  margin-bottom: 0;\n  padding-left: var(--padding-start);\n  padding-right: var(--padding-end);\n  padding-top: var(--padding-top);\n  padding-bottom: var(--padding-bottom);\n  font-family: inherit;\n  font-size: inherit;\n  font-style: inherit;\n  font-weight: inherit;\n  letter-spacing: inherit;\n  text-decoration: inherit;\n  text-overflow: inherit;\n  text-transform: inherit;\n  text-align: inherit;\n  white-space: inherit;\n  color: inherit;\n  display: block;\n  position: relative;\n  width: 100%;\n  height: 100%;\n  -webkit-transition: var(--transition);\n  transition: var(--transition);\n  border-width: var(--border-width);\n  border-style: var(--border-style);\n  border-color: var(--border-color);\n  outline: none;\n  background: var(--background);\n  line-height: 1;\n  -webkit-box-shadow: var(--box-shadow);\n  box-shadow: var(--box-shadow);\n  contain: layout style;\n  cursor: pointer;\n  opacity: var(--opacity);\n  overflow: var(--overflow);\n  z-index: 0;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  .button-native {\n    padding-left: unset;\n    padding-right: unset;\n    -webkit-padding-start: var(--padding-start);\n    padding-inline-start: var(--padding-start);\n    -webkit-padding-end: var(--padding-end);\n    padding-inline-end: var(--padding-end);\n  }\n}\n\n.button-native::-moz-focus-inner {\n  border: 0;\n}\n\n.button-inner {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-flow: row nowrap;\n  flex-flow: row nowrap;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n}\n\n::slotted(ion-icon) {\n  font-size: 1.4em;\n  pointer-events: none;\n}\n\n::slotted(ion-icon[slot=start]) {\n  margin-left: -0.3em;\n  margin-right: 0.3em;\n  margin-top: 0;\n  margin-bottom: 0;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  ::slotted(ion-icon[slot=start]) {\n    margin-left: unset;\n    margin-right: unset;\n    -webkit-margin-start: -0.3em;\n    margin-inline-start: -0.3em;\n    -webkit-margin-end: 0.3em;\n    margin-inline-end: 0.3em;\n  }\n}\n\n::slotted(ion-icon[slot=end]) {\n  margin-left: 0.3em;\n  margin-right: -0.2em;\n  margin-top: 0;\n  margin-bottom: 0;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  ::slotted(ion-icon[slot=end]) {\n    margin-left: unset;\n    margin-right: unset;\n    -webkit-margin-start: 0.3em;\n    margin-inline-start: 0.3em;\n    -webkit-margin-end: -0.2em;\n    margin-inline-end: -0.2em;\n  }\n}\n\n::slotted(ion-icon[slot=icon-only]) {\n  font-size: 1.8em;\n}\n\nion-ripple-effect {\n  color: var(--ripple-color);\n}\n\n:host(.ion-focused) .button-native {\n  background: var(--background-focused);\n  color: var(--color-focused);\n}\n\n:host(.activated) .button-native {\n  background: var(--background-activated);\n  color: var(--color-activated);\n}\n\n\@media (any-hover: hover) {\n  :host(:hover) .button-native {\n    background: var(--background-hover);\n    color: var(--color-hover);\n  }\n}\n:host {\n  --border-radius: 4px;\n  --padding-top: 0;\n  --padding-bottom: 0;\n  --padding-start: 1.1em;\n  --padding-end: 1.1em;\n  --transition: box-shadow 280ms cubic-bezier(.4, 0, .2, 1),\n                background-color 15ms linear,\n                color 15ms linear;\n  margin-left: 2px;\n  margin-right: 2px;\n  margin-top: 4px;\n  margin-bottom: 4px;\n  height: 36px;\n  font-size: 14px;\n  font-weight: 500;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  :host {\n    margin-left: unset;\n    margin-right: unset;\n    -webkit-margin-start: 2px;\n    margin-inline-start: 2px;\n    -webkit-margin-end: 2px;\n    margin-inline-end: 2px;\n  }\n}\n\n:host(.button-solid) {\n  --background-activated: var(--background);\n  --box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n}\n\n:host(.button-solid.activated) {\n  --box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);\n}\n\n:host(.button-outline) {\n  --border-width: 2px;\n  --border-style: solid;\n  --box-shadow: none;\n  --background-activated: transparent;\n  --background-focused: rgba(var(--ion-color-primary-rgb, 56, 128, 255), 0.1);\n  --background-hover: rgba(var(--ion-color-primary-rgb, 56, 128, 255), 0.04);\n  --color-activated: var(--ion-color-primary, #3880ff);\n}\n\n:host(.button-outline.activated.ion-color) .button-native {\n  background: transparent;\n}\n\n:host(.button-clear) {\n  --background-activated: transparent;\n  --background-focused: rgba(var(--ion-color-primary-rgb, 56, 128, 255), 0.1);\n  --background-hover: rgba(var(--ion-color-primary-rgb, 56, 128, 255), 0.04);\n  --color-activated: var(--ion-color-primary, #3880ff);\n  --color-focused: var(--ion-color-primary, #3880ff);\n}\n\n:host(.button-round) {\n  --border-radius: 64px;\n  --padding-top: 0;\n  --padding-start: 26px;\n  --padding-end: 26px;\n  --padding-bottom: 0;\n}\n\n:host(.button-large) {\n  --padding-top: 0;\n  --padding-start: 1em;\n  --padding-end: 1em;\n  --padding-bottom: 0;\n  height: 2.8em;\n  font-size: 20px;\n}\n\n:host(.button-small) {\n  --padding-top: 0;\n  --padding-start: 0.9em;\n  --padding-end: 0.9em;\n  --padding-bottom: 0;\n  height: 2.1em;\n  font-size: 13px;\n}\n\n:host(.button-strong) {\n  font-weight: bold;\n}\n\n::slotted(ion-icon[slot=icon-only]) {\n  padding-left: 0;\n  padding-right: 0;\n  padding-top: 0;\n  padding-bottom: 0;\n}\n\n\@media (any-hover: hover) {\n  :host(.button-solid.ion-color:hover) .button-native {\n    background: var(--ion-color-tint);\n  }\n\n  :host(.button-clear.ion-color:hover) .button-native,\n:host(.button-outline.ion-color:hover) .button-native {\n    background: rgba(var(--ion-color-base-rgb), 0.04);\n  }\n}"; }
};

export { Button as ion_button };
