import {ColumnSort} from "../SortableDatasource";
import {modify} from "../../utils/objects";

// Mutating
export const move = <T extends {  }>(args: { fromArray: T[], from: number, to: number, toArray?: T[] }) => {
    let {fromArray, toArray, from, to} = args;

    if (from > fromArray.length - 1)
        throw new Error(`Item doesn't exist at position ${from}`);


    const oldItem = fromArray.at(from);
    fromArray = [...fromArray];
    fromArray.splice(from, 1);


    if (toArray) {
        return {
            fromArray,
            toArray: [...toArray].splice(to, 0, oldItem as T)
        }
    }

    fromArray.splice(to, 0, oldItem as T);

    return {fromArray}
};