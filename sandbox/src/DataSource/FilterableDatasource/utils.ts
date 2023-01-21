import { EFilterActions } from './types';

// Mutating
export const move = <T extends {}>(args: {
    fromArray: T[];
    from: number;
    to: number;
    toArray?: T[];
}) => {
    const { fromArray, toArray = fromArray, from, to } = args;

    if (from > fromArray.length - 1) throw new Error(`Item doesn't exist at position ${from}`);

    const [normalizedFrom, normalizedTo] = fromArray === toArray ? [from, to].sort() : [from, to];

    const oldItem = fromArray.at(normalizedFrom);
    const newFromArray = [...fromArray];

    if (fromArray !== toArray) {
        newFromArray.splice(normalizedFrom, 1);

        return {
            fromArray: newFromArray,
            toArray: [...toArray].splice(normalizedTo, 0, oldItem as T),
        };
    }

    const oldToItem = fromArray.at(normalizedTo);

    newFromArray.splice(normalizedFrom, 1, oldToItem as T);
    newFromArray.splice(normalizedTo, 1, oldItem as T);

    return { fromArray: newFromArray, toArray: [...newFromArray] };
};

export const isFilterAction = (action: any) => action in EFilterActions;
