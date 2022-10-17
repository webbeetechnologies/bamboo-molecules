import {ESortDirection} from "../types";

export type TApplySortFunc = (args: ESortDirection | { column: string, direction: ESortDirection }) => void;
export type TRemoveSortFunc = (args: { index: number }) => void;