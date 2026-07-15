import { describe, expect, it, jest } from '@jest/globals';
import { Component, type ComponentType, type ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import {
    componentsRepository,
    componentsStylesRepository,
    componentsUtilsRepository,
    getRegisteredComponentStylesWithFallback,
    getRegisteredComponentUtilsMergedWithFallback,
    getRegisteredComponentUtilsWithFallback,
    getRegisteredComponentWithFallback,
    registerComponentsStyles,
    registerComponentsUtils,
    registerMolecules,
    registerMoleculesComponent,
    Repository,
} from '../componentsRegistry';

// The exported repositories are module-level singletons and registrations are
// permanent, so every test registers under its own unique name.
let seq = 0;
const uniqueName = (label: string) => `Test_${label}_${seq++}`;

const render = (element: ReactNode) => renderToStaticMarkup(<>{element}</>);

describe('Repository', () => {
    it('registers and retrieves a single item', () => {
        const repo = new Repository<string>();

        expect(repo.has('a')).toBe(false);

        repo.registerOne('a', 'value-a');

        expect(repo.has('a')).toBe(true);
        expect(repo.get('a')).toBe('value-a');
        expect(repo.getAll()).toEqual({ a: 'value-a' });
    });

    it('never overwrites an existing registration', () => {
        const repo = new Repository<string>();

        repo.registerOne('a', 'first');
        repo.registerOne('a', 'second');

        expect(repo.get('a')).toBe('first');
    });

    it('bulk-registers items, skipping already-registered keys', () => {
        const repo = new Repository<string>();

        repo.registerOne('a', 'first');
        repo.register({ a: 'second', b: 'value-b', c: 'value-c' });

        expect(repo.getAll()).toEqual({ a: 'first', b: 'value-b', c: 'value-c' });
    });

    it('applies the onRegister transform on registerOne', () => {
        const repo = new Repository<string>({
            onRegister: (item, name) => `${name}:${item}`,
        });

        repo.registerOne('a', 'value');

        expect(repo.get('a')).toBe('a:value');
    });

    it('does not invoke onRegister for a duplicate registration', () => {
        const onRegister = jest.fn((item: string) => item);
        const repo = new Repository<string>({ onRegister });

        repo.registerOne('a', 'first');
        repo.registerOne('a', 'second');

        expect(onRegister).toHaveBeenCalledTimes(1);
    });

    it('uses the given name and falls back to a unique id', () => {
        const named = new Repository({ name: 'My_Repo' });
        const anonymousA = new Repository();
        const anonymousB = new Repository();

        expect(named.name).toBe('My_Repo');
        expect(anonymousA.name).not.toBe(anonymousB.name);
    });
});

describe('registerMolecules', () => {
    it('splits component, styles and utils into their repositories', () => {
        const name = uniqueName('RegisterMolecules');
        const Comp = () => null;
        const styles = { root: { color: 'red' } };
        const utils = { sizeMap: { sm: 1 } };

        registerMolecules({ [name]: { component: Comp, styles, utils } });

        expect(componentsRepository.get(name)).toBe(Comp);
        expect(componentsStylesRepository.get(name)).toBe(styles);
        expect(componentsUtilsRepository.get(name)).toBe(utils);
    });

    it('skips repositories for omitted parts', () => {
        const name = uniqueName('ComponentOnly');
        const Comp = () => null;

        registerMolecules({ [name]: { component: Comp } });

        expect(componentsRepository.get(name)).toBe(Comp);
        expect(componentsStylesRepository.get(name)).toBeUndefined();
        expect(componentsUtilsRepository.get(name)).toBeUndefined();
    });
});

describe('getRegisteredComponentWithFallback', () => {
    it('renders the default component when nothing is registered', () => {
        const Default = ({ label }: { label: string }) => <span>default:{label}</span>;
        const Wrapped = getRegisteredComponentWithFallback(uniqueName('Unregistered'), Default);

        expect(render(<Wrapped label="x" />)).toBe('<span>default:x</span>');
    });

    it('picks up a registration that happens AFTER the wrapper is created (the Vite/ESM case)', () => {
        const name = uniqueName('LateRegistration');
        const Default = () => <span>default</span>;
        const Override = () => <span>override</span>;

        const Wrapped = getRegisteredComponentWithFallback(name, Default);

        expect(render(<Wrapped />)).toBe('<span>default</span>');

        registerMoleculesComponent(name, Override);

        expect(render(<Wrapped />)).toBe('<span>override</span>');
    });

    it('renders a registered component when registration happened before wrapper creation', () => {
        const name = uniqueName('EarlyRegistration');
        const Override = () => <span>override</span>;
        registerMoleculesComponent(name, Override);

        const Wrapped = getRegisteredComponentWithFallback(name, () => <span>default</span>);

        expect(render(<Wrapped />)).toBe('<span>override</span>');
    });

    it('passes props through to the resolved component', () => {
        const name = uniqueName('Props');
        registerMoleculesComponent(name, ({ a, b }: { a: number; b: string }) => (
            <span>
                {a}-{b}
            </span>
        ));

        const Wrapped = getRegisteredComponentWithFallback(
            name,
            (() => null) as ComponentType<any>,
        );

        expect(render(<Wrapped a={1} b="two" />)).toBe('<span>1-two</span>');
    });

    it('supports a class component override without breaking the function wrapper', () => {
        const name = uniqueName('ClassOverride');

        class Override extends Component {
            render() {
                return <span>class override</span>;
            }
        }
        registerMoleculesComponent(name, Override);

        const Wrapped = getRegisteredComponentWithFallback(name, () => <span>default</span>);

        expect(render(<Wrapped />)).toBe('<span>class override</span>');
    });

    it('sets a Registered(...) displayName', () => {
        const name = uniqueName('DisplayName');
        const Wrapped = getRegisteredComponentWithFallback(name, () => null);

        expect((Wrapped as any).displayName).toBe(`Registered(${name})`);
    });

    describe('statics (compound sub-components)', () => {
        it('exposes statics assigned onto the wrapper', () => {
            const Item = () => null;
            const Wrapped = Object.assign(
                getRegisteredComponentWithFallback(uniqueName('WrapperStatics'), () => null),
                { Item },
            );

            expect(Wrapped.Item).toBe(Item);
            expect('Item' in Wrapped).toBe(true);
        });

        it("prefers the registered component's statics over the wrapper's", () => {
            const name = uniqueName('OverrideStatics');
            const DefaultTrigger = () => null;
            const OverrideTrigger = () => null;

            const Wrapped = Object.assign(
                getRegisteredComponentWithFallback(name, () => null),
                {
                    Trigger: DefaultTrigger,
                },
            );

            expect(Wrapped.Trigger).toBe(DefaultTrigger);

            registerMoleculesComponent(
                name,
                Object.assign(() => null, { Trigger: OverrideTrigger }),
            );

            expect(Wrapped.Trigger).toBe(OverrideTrigger);
        });

        it('falls back per property: statics missing from the override keep the defaults', () => {
            const name = uniqueName('PartialOverride');
            const DefaultTrigger = () => null;
            const DefaultValue = () => null;
            const OverrideTrigger = () => null;

            const Wrapped = Object.assign(
                getRegisteredComponentWithFallback(name, () => null),
                {
                    Trigger: DefaultTrigger,
                    Value: DefaultValue,
                },
            );

            // The override only replaces Trigger…
            registerMoleculesComponent(
                name,
                Object.assign(() => null, { Trigger: OverrideTrigger }),
            );

            expect(Wrapped.Trigger).toBe(OverrideTrigger);
            // …so Value still resolves to the wrapper's static.
            expect(Wrapped.Value).toBe(DefaultValue);
        });

        it('falls back to statics on the default component itself', () => {
            const Legacy = () => null;
            const Default = Object.assign(() => null, { Legacy });

            const Wrapped = getRegisteredComponentWithFallback(
                uniqueName('DefaultStatics'),
                Default,
            );

            expect((Wrapped as any).Legacy).toBe(Legacy);
            expect('Legacy' in Wrapped).toBe(true);
        });

        it('renders sub-components resolved through the wrapper', () => {
            const name = uniqueName('RenderStatics');
            const Wrapped = Object.assign(
                getRegisteredComponentWithFallback(name, () => null),
                {
                    Item: ({ children }: { children: ReactNode }) => <li>{children}</li>,
                },
            );

            expect(render(<Wrapped.Item>one</Wrapped.Item>)).toBe('<li>one</li>');

            registerMoleculesComponent(
                name,
                Object.assign(() => null, {
                    Item: ({ children }: { children: ReactNode }) => (
                        <li data-override>{children}</li>
                    ),
                }),
            );

            expect(render(<Wrapped.Item>one</Wrapped.Item>)).toBe(
                '<li data-override="true">one</li>',
            );
        });
    });
});

describe('getRegisteredComponentStylesWithFallback', () => {
    it('returns default styles when nothing is registered', () => {
        const defaults = { root: { color: 'red' } };
        const styles = getRegisteredComponentStylesWithFallback(uniqueName('Styles'), defaults);

        expect(styles.root).toEqual({ color: 'red' });
    });

    it('reflects styles registered after the lookup (late binding on property access)', () => {
        const name = uniqueName('LateStyles');
        const styles = getRegisteredComponentStylesWithFallback(name, {
            root: { color: 'red' },
        });

        expect(styles.root).toEqual({ color: 'red' });

        registerComponentsStyles({ [name]: { root: { color: 'blue' } } });

        expect(styles.root).toEqual({ color: 'blue' });
        expect(Object.keys(styles)).toEqual(['root']);
    });
});

describe('getRegisteredComponentUtilsWithFallback', () => {
    it('replaces the default wholesale once registered (keyed lookup)', () => {
        const name = uniqueName('UtilsKeyed');
        const sizeMap = getRegisteredComponentUtilsWithFallback(
            name,
            { sm: 1, md: 2 } as Record<string, number>,
            'sizeMap',
        );

        expect(sizeMap.sm).toBe(1);

        registerComponentsUtils({ [name]: { sizeMap: { sm: 10 } } });

        expect(sizeMap.sm).toBe(10);
        // Wholesale replacement: keys missing from the registered value are gone.
        expect(sizeMap.md).toBeUndefined();
    });

    it('late-binds a function default through the proxy apply trap', () => {
        const name = uniqueName('UtilsFn');
        const getMinHeight = getRegisteredComponentUtilsWithFallback(
            name,
            (size: string) => (size === 'sm' ? 32 : 40),
            'getMinHeight',
        );

        expect(getMinHeight('sm')).toBe(32);

        registerComponentsUtils({ [name]: { getMinHeight: () => 100 } });

        expect(getMinHeight('sm')).toBe(100);
    });

    it('returns a pre-registered primitive', () => {
        const name = uniqueName('PrimitiveRegistered');
        registerComponentsUtils({ [name]: { maxItems: 20 } });

        const maxItems = getRegisteredComponentUtilsWithFallback(name, 5, 'maxItems');

        expect(maxItems).toBe(20);
    });

    it('returns the primitive default eagerly and warns in dev when nothing is registered', () => {
        const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
        const name = uniqueName('PrimitiveDefault');

        try {
            const maxItems = getRegisteredComponentUtilsWithFallback(name, 5, 'maxItems');

            expect(maxItems).toBe(5);
            expect(warn).toHaveBeenCalledWith(
                expect.stringContaining('a primitive default cannot pick up a later registration'),
            );

            // Eager capture: a later registration is NOT picked up.
            registerComponentsUtils({ [name]: { maxItems: 20 } });
            expect(maxItems).toBe(5);
        } finally {
            warn.mockRestore();
        }
    });
});

describe('getRegisteredComponentUtilsMergedWithFallback', () => {
    it('returns the defaults when nothing is registered', () => {
        const constants = getRegisteredComponentUtilsMergedWithFallback(
            uniqueName('MergedDefault'),
            { disabledColor: 'onSurfaceDisabled', opacity: 0.5 },
            'constants',
        );

        expect(constants.disabledColor).toBe('onSurfaceDisabled');
        expect(constants.opacity).toBe(0.5);
    });

    it('merges registered keys over defaults, keeping unregistered keys', () => {
        const name = uniqueName('Merged');
        const constants = getRegisteredComponentUtilsMergedWithFallback(
            name,
            { disabledColor: 'onSurfaceDisabled', opacity: 0.5 },
            'constants',
        );

        registerComponentsUtils({ [name]: { constants: { disabledColor: 'custom' } } });

        expect(constants.disabledColor).toBe('custom');
        expect(constants.opacity).toBe(0.5);
    });

    it('merges the whole utils object when no key is given', () => {
        const name = uniqueName('MergedNoKey');
        const utils = getRegisteredComponentUtilsMergedWithFallback(name, { a: 1, b: 2 });

        registerComponentsUtils({ [name]: { b: 20 } });

        expect({ ...utils }).toEqual({ a: 1, b: 20 });
    });
});
