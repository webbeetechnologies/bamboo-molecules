export const deepCompare = (x: any, y: any, depth = Infinity) => {
    if (Object.is(x, y)) return true;
    if (typeof x !== typeof y) return false;
    if (!x || !y) return false;

    if (typeof x === 'function') return false;

    if (typeof x === 'object') {
        if (depth === 0) return false;
        const keys = Array.from(new Set(Object.keys({ ...x, ...y })));
        for (const key of keys) {
            if (!deepCompare(x[key], y[key], depth - 1)) return false;
        }
    }

    return false;
};

export const shallowCompare = (x: any, y: any) => deepCompare(x, y, 1);

export const compare = (x: any, y: any) => deepCompare(x, y, 0);
