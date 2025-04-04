import EventEmitter, { ConstructorOptions, event as Event, eventNS } from 'eventemitter2';
// import debounce from 'lodash.debounce';

interface RepositoryConstructor<T> extends ConstructorOptions {
    onRegister?: (arg: T, name: string, registery: Record<string, T>) => T;
    name?: string;
}

let id = Date.now();

export class Repository<T> extends EventEmitter {
    private registry: Record<string, T> = {};
    readonly #name!: string;

    readonly #onRegister!: (arg: T, name: string, registery: Record<string, T>) => T;

    get name() {
        return this.#name;
    }

    static get uniqueId() {
        return (id++).toString(36).substring(0, 15);
    }

    constructor({
        onRegister = arg => arg,
        name = Repository.uniqueId,
        ...options
    }: RepositoryConstructor<T> = {}) {
        super(options);
        this.#onRegister = onRegister;
        this.#name = name;
    }

    has = (itemName: string): boolean => {
        return !!this.registry[itemName];
    };

    emit(event: eventNS | Event, ...values: any[]) {
        event = typeof event === 'string' ? `${this.#name}::event` : event;
        return super.emit(event, ...values);
    }

    /**
     * Register a item with the src.
     */
    registerOne = <X extends T = T, ItemName extends string = ''>(itemName: ItemName, item: X) => {
        let updatedItem = this.#onRegister?.(item, itemName, { ...this.registry });
        if (!updatedItem) updatedItem = item;

        if (this.registry[itemName]) return;

        this.registry = {
            ...this.registry,
            [itemName]: updatedItem,
        };

        this.emit('item_registered', itemName);
    };

    /**
     * Register a item with the src.
     */
    register = (items: Record<string, any>) => {
        // let updatedItem = this.#onRegister?.(item, itemName, { ...this.registry });
        // if (!updatedItem) updatedItem = item;

        Object.keys(items).forEach(itemName => {
            if (this.registry[itemName]) return;
            this.registry = {
                ...this.registry,
                [itemName]: items[itemName],
            };
        });
    };

    /**
     * Get all registered module from the registry.
     */
    getAll = () => {
        return this.registry;
    };

    get = (name: string) => {
        return this.registry[name];
    };

    /**
     * Register a listener to the module registry.
     * Return value returns a function that removes the listener.
     */
    // listen = (
    //     callback: (events: string[]) => void,
    //     { throttle = 100 }: { throttle?: number } = {},
    // ) => {
    //     let cached: string[] = [];

    //     const wrappedCallback = () => {
    //         callback(cached);
    //         cached = [];
    //     };

    //     const debouncedCallback = !throttle
    //         ? wrappedCallback
    //         : debounce(wrappedCallback, Math.abs(throttle), {
    //               trailing: true,
    //               leading: false,
    //           });

    //     const handledCallback = (itemName: string) => {
    //         cached.push(itemName);
    //         debouncedCallback();
    //     };

    //     this.on('item_registered', handledCallback);
    //     return () => {
    //         this.off('item_registered', handledCallback);
    //     };
    // };
}
