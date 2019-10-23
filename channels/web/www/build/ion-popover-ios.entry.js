import { r as registerInstance, c as getIonMode, f as createEvent, h, H as Host, e as getElement } from './core-950489bb.js';
import './helpers-ad941782.js';
import { c as createAnimation } from './animation-0dc45050.js';
import { g as getClassMap } from './theme-215399f6.js';
import { B as BACKDROP, p as prepareOverlay, a as present, b as dismiss, e as eventMethod } from './overlays-a2b1b53e.js';
import { a as attachComponent, d as detachComponent } from './framework-delegate-edc3d751.js';
import { d as deepReady } from './index-2af6c0c1.js';

/**
 * iOS Popover Enter Animation
 */
const iosEnterAnimation = (baseEl, ev) => {
    let originY = 'top';
    let originX = 'left';
    const contentEl = baseEl.querySelector('.popover-content');
    const contentDimentions = contentEl.getBoundingClientRect();
    const contentWidth = contentDimentions.width;
    const contentHeight = contentDimentions.height;
    const bodyWidth = baseEl.ownerDocument.defaultView.innerWidth;
    const bodyHeight = baseEl.ownerDocument.defaultView.innerHeight;
    // If ev was passed, use that for target element
    const targetDim = ev && ev.target && ev.target.getBoundingClientRect();
    const targetTop = targetDim != null && 'top' in targetDim ? targetDim.top : bodyHeight / 2 - contentHeight / 2;
    const targetLeft = targetDim != null && 'left' in targetDim ? targetDim.left : bodyWidth / 2;
    const targetWidth = (targetDim && targetDim.width) || 0;
    const targetHeight = (targetDim && targetDim.height) || 0;
    const arrowEl = baseEl.querySelector('.popover-arrow');
    const arrowDim = arrowEl.getBoundingClientRect();
    const arrowWidth = arrowDim.width;
    const arrowHeight = arrowDim.height;
    if (targetDim == null) {
        arrowEl.style.display = 'none';
    }
    const arrowCSS = {
        top: targetTop + targetHeight,
        left: targetLeft + targetWidth / 2 - arrowWidth / 2
    };
    const popoverCSS = {
        top: targetTop + targetHeight + (arrowHeight - 1),
        left: targetLeft + targetWidth / 2 - contentWidth / 2
    };
    // If the popover left is less than the padding it is off screen
    // to the left so adjust it, else if the width of the popover
    // exceeds the body width it is off screen to the right so adjust
    //
    let checkSafeAreaLeft = false;
    let checkSafeAreaRight = false;
    // If the popover left is less than the padding it is off screen
    // to the left so adjust it, else if the width of the popover
    // exceeds the body width it is off screen to the right so adjust
    // 25 is a random/arbitrary number. It seems to work fine for ios11
    // and iPhoneX. Is it perfect? No. Does it work? Yes.
    if (popoverCSS.left < POPOVER_IOS_BODY_PADDING + 25) {
        checkSafeAreaLeft = true;
        popoverCSS.left = POPOVER_IOS_BODY_PADDING;
    }
    else if (contentWidth + POPOVER_IOS_BODY_PADDING + popoverCSS.left + 25 > bodyWidth) {
        // Ok, so we're on the right side of the screen,
        // but now we need to make sure we're still a bit further right
        // cus....notchurally... Again, 25 is random. It works tho
        checkSafeAreaRight = true;
        popoverCSS.left = bodyWidth - contentWidth - POPOVER_IOS_BODY_PADDING;
        originX = 'right';
    }
    // make it pop up if there's room above
    if (targetTop + targetHeight + contentHeight > bodyHeight && targetTop - contentHeight > 0) {
        arrowCSS.top = targetTop - (arrowHeight + 1);
        popoverCSS.top = targetTop - contentHeight - (arrowHeight - 1);
        baseEl.className = baseEl.className + ' popover-bottom';
        originY = 'bottom';
        // If there isn't room for it to pop up above the target cut it off
    }
    else if (targetTop + targetHeight + contentHeight > bodyHeight) {
        contentEl.style.bottom = POPOVER_IOS_BODY_PADDING + '%';
    }
    arrowEl.style.top = arrowCSS.top + 'px';
    arrowEl.style.left = arrowCSS.left + 'px';
    contentEl.style.top = popoverCSS.top + 'px';
    contentEl.style.left = popoverCSS.left + 'px';
    if (checkSafeAreaLeft) {
        contentEl.style.left = `calc(${popoverCSS.left}px + var(--ion-safe-area-left, 0px))`;
    }
    if (checkSafeAreaRight) {
        contentEl.style.left = `calc(${popoverCSS.left}px - var(--ion-safe-area-right, 0px))`;
    }
    contentEl.style.transformOrigin = originY + ' ' + originX;
    const baseAnimation = createAnimation();
    const backdropAnimation = createAnimation();
    const wrapperAnimation = createAnimation();
    backdropAnimation
        .addElement(baseEl.querySelector('ion-backdrop'))
        .fromTo('opacity', 0.01, 0.08);
    wrapperAnimation
        .addElement(baseEl.querySelector('.popover-wrapper'))
        .fromTo('opacity', 0.01, 1);
    return baseAnimation
        .addElement(baseEl)
        .easing('ease')
        .duration(100)
        .addAnimation([backdropAnimation, wrapperAnimation]);
};
const POPOVER_IOS_BODY_PADDING = 5;

/**
 * iOS Popover Leave Animation
 */
const iosLeaveAnimation = (baseEl) => {
    const baseAnimation = createAnimation();
    const backdropAnimation = createAnimation();
    const wrapperAnimation = createAnimation();
    backdropAnimation
        .addElement(baseEl.querySelector('ion-backdrop'))
        .fromTo('opacity', 0.08, 0);
    wrapperAnimation
        .addElement(baseEl.querySelector('.popover-wrapper'))
        .fromTo('opacity', 0.99, 0);
    return baseAnimation
        .addElement(baseEl)
        .easing('ease')
        .duration(500)
        .addAnimation([backdropAnimation, wrapperAnimation]);
};

/**
 * Md Popover Enter Animation
 */
const mdEnterAnimation = (baseEl, ev) => {
    const POPOVER_MD_BODY_PADDING = 12;
    const doc = baseEl.ownerDocument;
    const isRTL = doc.dir === 'rtl';
    let originY = 'top';
    let originX = isRTL ? 'right' : 'left';
    const contentEl = baseEl.querySelector('.popover-content');
    const contentDimentions = contentEl.getBoundingClientRect();
    const contentWidth = contentDimentions.width;
    const contentHeight = contentDimentions.height;
    const bodyWidth = doc.defaultView.innerWidth;
    const bodyHeight = doc.defaultView.innerHeight;
    // If ev was passed, use that for target element
    const targetDim = ev && ev.target && ev.target.getBoundingClientRect();
    // As per MD spec, by default position the popover below the target (trigger) element
    const targetTop = targetDim != null && 'bottom' in targetDim
        ? targetDim.bottom
        : bodyHeight / 2 - contentHeight / 2;
    const targetLeft = targetDim != null && 'left' in targetDim
        ? isRTL
            ? targetDim.left - contentWidth + targetDim.width
            : targetDim.left
        : bodyWidth / 2 - contentWidth / 2;
    const targetHeight = (targetDim && targetDim.height) || 0;
    const popoverCSS = {
        top: targetTop,
        left: targetLeft
    };
    // If the popover left is less than the padding it is off screen
    // to the left so adjust it, else if the width of the popover
    // exceeds the body width it is off screen to the right so adjust
    if (popoverCSS.left < POPOVER_MD_BODY_PADDING) {
        popoverCSS.left = POPOVER_MD_BODY_PADDING;
        // Same origin in this case for both LTR & RTL
        // Note: in LTR, originX is already 'left'
        originX = 'left';
    }
    else if (contentWidth + POPOVER_MD_BODY_PADDING + popoverCSS.left >
        bodyWidth) {
        popoverCSS.left = bodyWidth - contentWidth - POPOVER_MD_BODY_PADDING;
        // Same origin in this case for both LTR & RTL
        // Note: in RTL, originX is already 'right'
        originX = 'right';
    }
    // If the popover when popped down stretches past bottom of screen,
    // make it pop up if there's room above
    if (targetTop + targetHeight + contentHeight > bodyHeight &&
        targetTop - contentHeight > 0) {
        popoverCSS.top = targetTop - contentHeight - targetHeight;
        baseEl.className = baseEl.className + ' popover-bottom';
        originY = 'bottom';
        // If there isn't room for it to pop up above the target cut it off
    }
    else if (targetTop + targetHeight + contentHeight > bodyHeight) {
        contentEl.style.bottom = POPOVER_MD_BODY_PADDING + 'px';
    }
    const baseAnimation = createAnimation();
    const backdropAnimation = createAnimation();
    const wrapperAnimation = createAnimation();
    const contentAnimation = createAnimation();
    const viewportAnimation = createAnimation();
    backdropAnimation
        .addElement(baseEl.querySelector('ion-backdrop'))
        .fromTo('opacity', 0.01, 0.32);
    wrapperAnimation
        .addElement(baseEl.querySelector('.popover-wrapper'))
        .fromTo('opacity', 0.01, 1);
    contentAnimation
        .addElement(contentEl)
        .beforeStyles({
        'top': `${popoverCSS.top}px`,
        'left': `${popoverCSS.left}px`,
        'transform-origin': `${originY} ${originX}`
    })
        .fromTo('transform', 'scale(0.001)', 'scale(1)');
    viewportAnimation
        .addElement(baseEl.querySelector('.popover-viewport'))
        .fromTo('opacity', 0.01, 1);
    return baseAnimation
        .addElement(baseEl)
        .easing('cubic-bezier(0.36,0.66,0.04,1)')
        .duration(300)
        .addAnimation([backdropAnimation, wrapperAnimation, contentAnimation, viewportAnimation]);
};

/**
 * Md Popover Leave Animation
 */
const mdLeaveAnimation = (baseEl) => {
    const baseAnimation = createAnimation();
    const backdropAnimation = createAnimation();
    const wrapperAnimation = createAnimation();
    backdropAnimation
        .addElement(baseEl.querySelector('ion-backdrop'))
        .fromTo('opacity', 0.32, 0);
    wrapperAnimation
        .addElement(baseEl.querySelector('.popover-wrapper'))
        .fromTo('opacity', 0.99, 0);
    return baseAnimation
        .addElement(baseEl)
        .easing('ease')
        .duration(500)
        .addAnimation([backdropAnimation, wrapperAnimation]);
};

const Popover = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.presented = false;
        this.mode = getIonMode(this);
        /**
         * If `true`, the keyboard will be automatically dismissed when the overlay is presented.
         */
        this.keyboardClose = true;
        /**
         * If `true`, the popover will be dismissed when the backdrop is clicked.
         */
        this.backdropDismiss = true;
        /**
         * If `true`, a backdrop will be displayed behind the popover.
         */
        this.showBackdrop = true;
        /**
         * If `true`, the popover will be translucent.
         * Only applies when the mode is `"ios"` and the device supports
         * [`backdrop-filter`](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter#Browser_compatibility).
         */
        this.translucent = false;
        /**
         * If `true`, the popover will animate.
         */
        this.animated = true;
        this.onDismiss = (ev) => {
            ev.stopPropagation();
            ev.preventDefault();
            this.dismiss();
        };
        this.onBackdropTap = () => {
            this.dismiss(undefined, BACKDROP);
        };
        this.onLifecycle = (modalEvent) => {
            const el = this.usersElement;
            const name = LIFECYCLE_MAP[modalEvent.type];
            if (el && name) {
                const event = new CustomEvent(name, {
                    bubbles: false,
                    cancelable: false,
                    detail: modalEvent.detail
                });
                el.dispatchEvent(event);
            }
        };
        prepareOverlay(this.el);
        this.didPresent = createEvent(this, "ionPopoverDidPresent", 7);
        this.willPresent = createEvent(this, "ionPopoverWillPresent", 7);
        this.willDismiss = createEvent(this, "ionPopoverWillDismiss", 7);
        this.didDismiss = createEvent(this, "ionPopoverDidDismiss", 7);
    }
    /**
     * Present the popover overlay after it has been created.
     */
    async present() {
        if (this.presented) {
            return;
        }
        const container = this.el.querySelector('.popover-content');
        if (!container) {
            throw new Error('container is undefined');
        }
        const data = Object.assign(Object.assign({}, this.componentProps), { popover: this.el });
        this.usersElement = await attachComponent(this.delegate, container, this.component, ['popover-viewport', this.el['s-sc']], data);
        await deepReady(this.usersElement);
        return present(this, 'popoverEnter', iosEnterAnimation, mdEnterAnimation, this.event);
    }
    /**
     * Dismiss the popover overlay after it has been presented.
     *
     * @param data Any data to emit in the dismiss events.
     * @param role The role of the element that is dismissing the popover. For example, 'cancel' or 'backdrop'.
     */
    async dismiss(data, role) {
        const shouldDismiss = await dismiss(this, data, role, 'popoverLeave', iosLeaveAnimation, mdLeaveAnimation, this.event);
        if (shouldDismiss) {
            await detachComponent(this.delegate, this.usersElement);
        }
        return shouldDismiss;
    }
    /**
     * Returns a promise that resolves when the popover did dismiss.
     */
    onDidDismiss() {
        return eventMethod(this.el, 'ionPopoverDidDismiss');
    }
    /**
     * Returns a promise that resolves when the popover will dismiss.
     */
    onWillDismiss() {
        return eventMethod(this.el, 'ionPopoverWillDismiss');
    }
    render() {
        const mode = getIonMode(this);
        const { onLifecycle } = this;
        return (h(Host, { "aria-modal": "true", "no-router": true, style: {
                zIndex: `${20000 + this.overlayIndex}`,
            }, class: Object.assign(Object.assign({}, getClassMap(this.cssClass)), { [mode]: true, 'popover-translucent': this.translucent }), onIonPopoverDidPresent: onLifecycle, onIonPopoverWillPresent: onLifecycle, onIonPopoverWillDismiss: onLifecycle, onIonPopoverDidDismiss: onLifecycle, onIonDismiss: this.onDismiss, onIonBackdropTap: this.onBackdropTap }, h("ion-backdrop", { tappable: this.backdropDismiss, visible: this.showBackdrop }), h("div", { class: "popover-wrapper" }, h("div", { class: "popover-arrow" }), h("div", { class: "popover-content" }))));
    }
    get el() { return getElement(this); }
    static get style() { return ".sc-ion-popover-ios-h {\n  \n  --background: var(--ion-background-color, #fff);\n  --min-width: 0;\n  --min-height: 0;\n  --max-width: auto;\n  --height: auto;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  display: -ms-flexbox;\n  display: flex;\n  position: fixed;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  color: var(--ion-text-color, #000);\n  z-index: 1001;\n}\n\n.overlay-hidden.sc-ion-popover-ios-h {\n  display: none;\n}\n\n.popover-wrapper.sc-ion-popover-ios {\n  opacity: 0;\n  z-index: 10;\n}\n\n.popover-content.sc-ion-popover-ios {\n  display: -ms-flexbox;\n  display: flex;\n  position: absolute;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  width: var(--width);\n  min-width: var(--min-width);\n  max-width: var(--max-width);\n  height: var(--height);\n  min-height: var(--min-height);\n  max-height: var(--max-height);\n  background: var(--background);\n  -webkit-box-shadow: var(--box-shadow);\n  box-shadow: var(--box-shadow);\n  overflow: auto;\n  z-index: 10;\n}\n\n.popover-viewport.sc-ion-popover-ios {\n  --ion-safe-area-top: 0px;\n  --ion-safe-area-right: 0px;\n  --ion-safe-area-bottom: 0px;\n  --ion-safe-area-left: 0px;\n}\n\n.sc-ion-popover-ios-h {\n  --width: 200px;\n  --max-height: 90%;\n  --box-shadow: none;\n}\n\n.popover-content.sc-ion-popover-ios {\n  border-radius: 10px;\n}\n\n.popover-arrow.sc-ion-popover-ios {\n  display: block;\n  position: absolute;\n  width: 20px;\n  height: 10px;\n  overflow: hidden;\n}\n\n.popover-arrow.sc-ion-popover-ios::after {\n  left: 3px;\n  top: 3px;\n  border-radius: 3px;\n  position: absolute;\n  width: 14px;\n  height: 14px;\n  -webkit-transform: rotate(45deg);\n  transform: rotate(45deg);\n  background: var(--background);\n  content: \"\";\n  z-index: 10;\n}\n[dir=rtl].sc-ion-popover-ios .popover-arrow.sc-ion-popover-ios::after, [dir=rtl].sc-ion-popover-ios-h .popover-arrow.sc-ion-popover-ios::after, [dir=rtl] .sc-ion-popover-ios-h .popover-arrow.sc-ion-popover-ios::after {\n  left: unset;\n  right: unset;\n  right: 3px;\n}\n\n.popover-bottom.sc-ion-popover-ios-h .popover-arrow.sc-ion-popover-ios {\n  top: auto;\n  bottom: -10px;\n}\n\n.popover-bottom.sc-ion-popover-ios-h .popover-arrow.sc-ion-popover-ios::after {\n  top: -6px;\n}\n\n\@supports ((-webkit-backdrop-filter: blur(0)) or (backdrop-filter: blur(0))) {\n  .popover-translucent.sc-ion-popover-ios-h .popover-content.sc-ion-popover-ios, .popover-translucent.sc-ion-popover-ios-h .popover-arrow.sc-ion-popover-ios::after {\n    background: rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.8);\n    -webkit-backdrop-filter: saturate(180%) blur(20px);\n    backdrop-filter: saturate(180%) blur(20px);\n  }\n}"; }
};
const LIFECYCLE_MAP = {
    'ionPopoverDidPresent': 'ionViewDidEnter',
    'ionPopoverWillPresent': 'ionViewWillEnter',
    'ionPopoverWillDismiss': 'ionViewWillLeave',
    'ionPopoverDidDismiss': 'ionViewDidLeave',
};

export { Popover as ion_popover };
