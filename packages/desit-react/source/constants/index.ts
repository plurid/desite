import environment from '../services/utilities/environment';



/**
 * General interaction types to be used with `interact`.
 * Loosely based on https://developer.mozilla.org/en-US/docs/Web/Events
 */
export const INTERACT_TYPES = {
    /** Focus Events */
    focus: 'focus',
    blur: 'blur',

    /** Form Events */
    reset: 'reset',
    submit: 'submit',

    /** View Events */
    fullscreenChange: 'fullscreenChange',
    fullscreenError: 'fullscreenError',
    resize: 'resize',
    scroll: 'scroll',

    /** Clipboard Events */
    cut: 'cut',
    copy: 'copy',
    paste: 'paste',

    /** Keyboard Events */
    keyDown: 'keyDown',
    keyPress: 'keyPress',
    keyUp: 'keyUp',

    /** Mouse Events */
    auxiliaryClick: 'auxiliaryClick',
    click: 'click',
    contextMenu: 'contextMenu',
    doubleClick: 'doubleClick',
    mouseDown: 'mouseDown',
    mouseEnter: 'mouseEnter',
    mouseLeave: 'mouseLeave',
    mouseMove: 'mouseMove',
    mouseOver: 'mouseOver',
    mouseOut: 'mouseOut',
    mouseUp: 'mouseUp',
    select: 'select',
    wheel: 'wheel',

    /** Drag & Drop Events */
    drag: 'drag',
    dragEnd: 'dragEnd',
    dragEnter: 'dragEnter',
    dragStart: 'dragStart',
    dragLeave: 'dragLeave',
    dragOver: 'dragOver',
    drop: 'drop',

    /** Media Events */
    play: 'play',
    pause: 'pause',
};


export const PLURID_API_ENDPOINT = environment.production
    ? 'https://api.plurid.com/graphql'
    : environment.development
        ? 'https://api.plurid.dev/graphql'
        : 'http://localhost:33600/graphql';
