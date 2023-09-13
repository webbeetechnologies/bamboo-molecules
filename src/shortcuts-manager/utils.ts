const MODIFIER_KEYS = ['meta', 'alt', 'shift', 'control'];

export const isModifierKey = (pressedKey: string) => {
    return MODIFIER_KEYS.includes(pressedKey);
};

// This file handles key-name discrepancies between browsers.
// For the list of discrepancies, go to: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values.
const mappings = new Map([
    [' ', 'space'], // custom mapping
    ['spacebar', 'space'],
    ['scroll', 'scrolllock'],
    ['del', 'delete'],
    ['esc', 'escape'],
    ['medianexttrack', 'mediatracknext'],
    ['mediaprevioustrack', 'mediatrackprevious'],
    ['volumeup', 'audiovolumeup'],
    ['volumedown', 'audiovolumedown'],
    ['volumemute', 'audiovolumemute'],
    ['multiply', '*'],
    ['add', '+'],
    ['divide', '/'],
    ['subtract', '-'],
    ['left', 'arrowleft'],
    ['right', 'arrowright'],
    ['up', 'arrowup'],
    ['down', 'arrowdown'],
]);

/**
 * Get a single, normalized string from the list of the `KeyboardEvent.key` properties.
 *
 * @param {Array<string>} keys The list of the `KeyboardEvent.key` properties
 * @returns {string}
 */
export const normalizeKeys = (keys: string[]): string => {
    return keys
        .map(key => {
            const lowercaseKey = key.toLowerCase();

            if (mappings.has(lowercaseKey)) {
                return mappings.get(lowercaseKey) as string;
            }

            return lowercaseKey;
        })
        .sort()
        .join('+');
};

/**
 * Get every pressed modifier key from the performed `KeyboardEvent`.
 *
 * @private
 * @param {KeyboardEvent} event The event object.
 * @param {boolean} [mergeMetaKeys=false] If `true,` the function will return the "control" and "meta"
 *                                        modifiers keys as the "control/meta" name. This allows creating
 *                                        keyboard shortcuts with modifier key that trigger the shortcut
 *                                        actions depend on the OS keyboard layout (the Meta key for macOS
 *                                        and Control for non macOS system).
 * @returns {string[]}
 */
export const getPressedModifierKeys = (event: KeyboardEvent, mergeMetaKeys = false) => {
    const pressedModifierKeys = [];

    if (event.altKey) {
        pressedModifierKeys.push('alt');
    }

    if (mergeMetaKeys && (event.ctrlKey || event.metaKey)) {
        pressedModifierKeys.push('control/meta');
    } else {
        if (event.ctrlKey) {
            pressedModifierKeys.push('control');
        }

        if (event.metaKey) {
            pressedModifierKeys.push('meta');
        }
    }

    if (event.shiftKey) {
        pressedModifierKeys.push('shift');
    }

    return pressedModifierKeys;
};

export const shortcutEventPrefix = 'shortcut-event-';

export const calculateShortcutEventName = (shortcutName: string) =>
    `${shortcutEventPrefix}-${shortcutName}`;
