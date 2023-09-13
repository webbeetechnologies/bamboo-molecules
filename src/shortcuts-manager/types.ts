export type Shortcut = {
    name: string;
    keys: string[][];
    scope?: string;
};

export type ShortcutWithEvent = Shortcut & {
    // will be undefined for the mobile
    event: CustomEvent | undefined;
};

export type Scope = {
    name: string;
    /*
     * HTMLElement
     * this is currently the only way for now to get focustrap feature.
     * TODO - find a solution with ref
     * */
    node?: Element | null;
};
