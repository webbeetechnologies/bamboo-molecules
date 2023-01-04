import get from "lodash/get";
import isFunction from "lodash/isFunction";
import clone from "lodash/clone";
import set from "lodash/set";

export const getOrFail = <T extends {} | []>(obj: T, key: string | number) => {
    const result = get(obj, key);
    if (result === undefined) { throw new Error(`${key} doesn't exist on object the object`) };

    return result;
}

export const modify = <T extends {} | [], U>(obj: T, key: string | number, inject: Function | U, defaultValue: null | U = null): T => {
    let keyFragments = ("" + key).split('.'),
        currentKey = '',
        prev = get(obj, key);

    if(isFunction(inject)) {
        inject = inject(get(obj, key, defaultValue));
    }

    if(prev === inject) { return obj; }

    obj = clone(obj);

    for(let i = 0; i < keyFragments.length-1; i++) {
        let keyFragment = keyFragments[i];
        currentKey = currentKey.length ? `${currentKey}.${keyFragment}` : keyFragment;

        set(obj, currentKey, clone(getOrFail(obj, currentKey)));
    }

    set(obj, key, inject);

    return obj;
}