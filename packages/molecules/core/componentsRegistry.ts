import type { ComponentType } from 'react';
import { createElement } from 'react';

declare const process: { env: { NODE_ENV?: string } };

type OnRegister<T> = (item: T, name: string, registry: Record<string, T>) => T;

interface RepositoryOptions<T> {
    onRegister?: OnRegister<T>;
    name?: string;
}

let id = Date.now();

export class Repository<T> {
    private registry: Record<string, T> = {};
    readonly #name: string;
    readonly #onRegister: OnRegister<T>;

    get name() {
        return this.#name;
    }

    static get uniqueId() {
        return (id++).toString(36).substring(0, 15);
    }

    constructor({
        onRegister = item => item,
        name = Repository.uniqueId,
    }: RepositoryOptions<T> = {}) {
        this.#onRegister = onRegister;
        this.#name = name;
    }

    has = (itemName: string): boolean => {
        return !!this.registry[itemName];
    };

    /**
     * Register a single item. Existing registrations are never overwritten.
     */
    registerOne = <X extends T = T>(itemName: string, item: X) => {
        if (this.registry[itemName]) return;

        this.registry = {
            ...this.registry,
            [itemName]: this.#onRegister(item, itemName, { ...this.registry }) ?? item,
        };
    };

    /**
     * Register multiple items at once. Existing registrations are never overwritten.
     */
    register = (items: Record<string, any>) => {
        const additions: Record<string, T> = {};

        Object.keys(items).forEach(itemName => {
            if (!this.registry[itemName]) additions[itemName] = items[itemName];
        });

        this.registry = {
            ...this.registry,
            ...additions,
        };
    };

    /**
     * Get all registered items from the registry.
     */
    getAll = () => {
        return this.registry;
    };

    get = (name: string) => {
        return this.registry[name];
    };
}

export const componentsRepository = new Repository<Record<string, any>>({
    name: 'Components_Repository',
});

export const componentsStylesRepository = new Repository<Record<string, any>>({
    name: 'Components_Styles_Repository',
});

export const componentsUtilsRepository = new Repository<Record<string, any>>({
    name: 'Components_Utils_Repository',
});

export const registerMoleculesComponent = componentsRepository.registerOne;
export const registerMoleculesComponents = componentsRepository.register;
export const registerComponentStyles = componentsStylesRepository.registerOne;
export const registerComponentsStyles = componentsStylesRepository.register;
export const registerComponentUtils = componentsUtilsRepository.registerOne;
export const registerComponentsUtils = componentsUtilsRepository.register;

type RegisterMoleculesConfig = {
    component: ComponentType<any>;
    styles?: Record<string, any>;
    utils?: Record<string, any>;
};

export const registerMolecules = (molecules: Record<string, RegisterMoleculesConfig>) => {
    const components: Record<string, ComponentType<any>> = {};
    const styles: Record<string, Record<string, any>> = {};
    const utils: Record<string, Record<string, any>> = {};

    Object.entries(molecules).forEach(([name, config]) => {
        if (config.component) components[name] = config.component;
        if (config.styles) styles[name] = config.styles;
        if (config.utils) utils[name] = config.utils;
    });

    if (Object.keys(components).length) registerMoleculesComponents(components);
    if (Object.keys(styles).length) registerComponentsStyles(styles);
    if (Object.keys(utils).length) registerComponentsUtils(utils);
};

export const getRegisteredMoleculesComponent = componentsRepository.get;
export const getRegisteredMoleculesComponentStyles = componentsStylesRepository.get;
export const getRegisteredComponentUtils = componentsUtilsRepository.get;

// Keys owned by React element/component internals — these must always come
// from the wrapper itself, never from the registered/default component, so
// React keeps treating the wrapper as a plain function component ('prototype'
// especially: leaking a class component's prototype would make React try to
// `new` the wrapper).
const REACT_OWN_KEYS = new Set([
    '$$typeof',
    'render',
    'type',
    'compare',
    'displayName',
    'prototype',
]);

/**
 * Gets a registered component with a fallback to the default component.
 *
 * Resolves from the registry at render time, not at call time: under real ESM
 * bundlers (e.g. Vite) component index modules are evaluated before the app's
 * `registerMoleculesComponents(...)` call runs, so an eager lookup would
 * permanently capture the default. (Metro's inline-requires deferred module
 * evaluation and masked this.)
 *
 * Compound statics (e.g. `X.Item`) must be `Object.assign`ed onto the wrapper
 * this returns, never onto the default component itself: the default is a
 * shared deep-import instance, and mutating it can clobber statics an app
 * override assigned onto that same instance (evaluation-order dependent).
 * @param name The name of the component to retrieve
 * @param defaultComponent The default component to use as fallback
 * @returns A component that renders the registered component, falling back to the default
 */
export function getRegisteredComponentWithFallback<T extends ComponentType<any>>(
    name: string,
    defaultComponent: T,
): T {
    // Plain function component: with React >= 19, `ref` is a regular prop, so
    // it flows through the spread to the resolved component untouched.
    const Resolved = (props: any) => {
        const Component = (getRegisteredMoleculesComponent(name) ??
            defaultComponent) as ComponentType<any>;
        return createElement(Component, props);
    };
    Resolved.displayName = `Registered(${name})`;

    // Statics (compound sub-components like Select.Dropdown, defaultProps, …)
    // also resolve lazily, so an override's statics win and late registration
    // is picked up. Precedence: registered component → statics assigned onto
    // this wrapper (component indexes do Object.assign(wrapper, {…})) →
    // default component.
    return new Proxy(Resolved, {
        get: (target, prop, receiver) => {
            if (typeof prop !== 'string' || REACT_OWN_KEYS.has(prop)) {
                return Reflect.get(target, prop, receiver);
            }
            const registered = getRegisteredMoleculesComponent(name);
            if (registered != null && Reflect.has(registered, prop)) {
                return Reflect.get(registered, prop);
            }
            if (Reflect.has(target, prop)) {
                return Reflect.get(target, prop, receiver);
            }
            return Reflect.get(defaultComponent, prop);
        },
        has: (target, prop) => {
            const registered = getRegisteredMoleculesComponent(name);
            return (
                Reflect.has(target, prop) ||
                (registered != null && Reflect.has(registered, prop)) ||
                Reflect.has(defaultComponent, prop)
            );
        },
    }) as unknown as T;
}

/**
 * Wraps a registry lookup so it resolves at ACCESS time instead of call time
 * (same late-binding rationale as getRegisteredComponentWithFallback — module
 * scope `export const x = getRegistered...WithFallback(...)` calls run before
 * the app registers overrides under real ESM bundlers).
 *
 * Only objects and functions can be late-bound; primitive defaults (e.g. a
 * plain string util) are returned as-is and keep the old eager capture.
 * Note: spreading/cloning the returned value still snapshots at that moment.
 */
function lazyRegistryValue<T>(defaultValue: T, resolveRegistered: () => unknown, label = ''): T {
    if (
        defaultValue === null ||
        (typeof defaultValue !== 'object' && typeof defaultValue !== 'function')
    ) {
        const registered = resolveRegistered();

        if (registered == null && process.env.NODE_ENV !== 'production') {
            console.warn(
                `[react-native-molecules] ${
                    label || 'registry lookup'
                }: a primitive default cannot pick up a later registration — ` +
                    'register it before this module evaluates, or wrap the value in an object/function.',
            );
        }

        return (registered ?? defaultValue) as T;
    }

    const source = () => (resolveRegistered() ?? defaultValue) as any;

    return new Proxy(defaultValue as any, {
        get: (_target, prop) => Reflect.get(source(), prop),
        set: (_target, prop, value) => Reflect.set(source(), prop, value),
        has: (_target, prop) => Reflect.has(source(), prop),
        ownKeys: _target => Reflect.ownKeys(source()),
        getOwnPropertyDescriptor: (_target, prop) => {
            const desc = Object.getOwnPropertyDescriptor(source(), prop);
            return desc ? { ...desc, configurable: true } : undefined;
        },
        getPrototypeOf: _target => Object.getPrototypeOf(source()),
        apply: (_target, thisArg, args) => Reflect.apply(source(), thisArg, args),
        construct: (_target, args, newTarget) => Reflect.construct(source(), args, newTarget),
    }) as T;
}

const resolveRegisteredUtils = (name: string, key?: string) =>
    key
        ? (getRegisteredComponentUtils(name) as Record<string, any> | undefined)?.[key]
        : getRegisteredComponentUtils(name);

const utilsLabel = (name: string, key?: string) => `utils '${name}'${key ? `.${key}` : ''}`;

/**
 * Gets a registered component's styles with a fallback to the default styles.
 * Resolves from the registry lazily (see lazyRegistryValue).
 * @param name The name of the component to retrieve
 * @param defaultStyles The default styles to use as fallback
 * @returns The registered styles or the default styles
 */
export function getRegisteredComponentStylesWithFallback<T>(name: string, defaultStyles: T): T {
    return lazyRegistryValue(
        defaultStyles,
        () => getRegisteredMoleculesComponentStyles(name),
        `styles '${name}'`,
    );
}

/**
 * Gets a registered component's utils with a fallback to the default utils.
 * Resolves from the registry lazily (see lazyRegistryValue).
 * @param name The name of the component to retrieve
 * @param defaultUtils The default utils to use as fallback
 * @param key Optional key inside the registered utils object
 * @returns The registered utils or the default utils
 */
export function getRegisteredComponentUtilsWithFallback<T>(
    name: string,
    defaultUtils: T,
    key?: string,
): T {
    return lazyRegistryValue(
        defaultUtils,
        () => resolveRegisteredUtils(name, key),
        utilsLabel(name, key),
    );
}

/**
 * Like getRegisteredComponentUtilsWithFallback, but MERGES the registered
 * value over the defaults (registered keys win, missing keys keep defaults)
 * instead of replacing wholesale. Resolves lazily on every access, so late
 * registration is picked up.
 * @param name The name of the component to retrieve
 * @param defaultUtils The default utils, also used as the merge base
 * @param key Optional key inside the registered utils object
 * @returns The defaults merged with the registered utils
 */
export function getRegisteredComponentUtilsMergedWithFallback<T extends Record<string, any>>(
    name: string,
    defaultUtils: T,
    key?: string,
): T {
    return lazyRegistryValue(
        defaultUtils,
        () => {
            const registered = resolveRegisteredUtils(name, key);
            return registered ? { ...defaultUtils, ...registered } : undefined;
        },
        utilsLabel(name, key),
    );
}
