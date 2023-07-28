import { groupBy } from './lodash';

export interface RecordWithId extends Record<string, any> {
    id: number | string;
}

type TypedRecordSort<O = RecordWithId> = keyof O;

type PrimitiveTypes = string | boolean | number | null | undefined;

export enum RowType {
    HEADER = 'header',
    FOOTER = 'footer',
    DATA = 'data',
}

export type GroupHeader = {
    isGroupHeader: true;
    field: string;
    title: PrimitiveTypes;
    level: number;
    filters: GroupFilter[];
    id: string;
};

export type GroupedRecord = {
    id: number;
    filters: GroupFilter[];
    data: RecordWithId;
    level: number;
};

export type GroupFooter = {
    id: string;
    isGroupFooter: true;
    filters: GroupFilter[];
    level: number;
};

export type GroupedData = GroupedRecord | GroupHeader | GroupFooter;

type GroupFilter = { field: string; value: any };

const keyStore = new WeakMap();
const keyStoreReversed = new Map();

const addToKeyStoreReversed = (key: PrimitiveTypes, value: any = key) => {
    keyStoreReversed.set(key, value);
    return key;
};

const getPrimitiveValue = (value: any): PrimitiveTypes => {
    if (!value) return addToKeyStoreReversed(value);
    if (typeof value !== 'object') return addToKeyStoreReversed(value);
    if (typeof value === 'function') return '';

    if (!keyStore.has(value))
        keyStore.set(value, addToKeyStoreReversed(JSON.stringify(value), value));

    return keyStore.get(value);
};

const makeNested = <T extends RecordWithId>(
    records: T[],
    groups: TypedRecordSort<T>[],
    index = 0,
    level = 1,
    filters: GroupFilter[] = [],
): GroupedData[] => {
    const [current, ...pending] = groups ?? [];
    const baseKey: string[] = filters.map(x => x.field);

    if (!current)
        return records.map(record => ({
            data: record,
            filters,
            id: record.id,
            level,
            index: index++,
        })) as GroupedRecord[];

    const groupedData = groupBy(records, record => getPrimitiveValue(record[current]));

    const texts = Array.from(new Set(records.map(record => getPrimitiveValue(record[current]))));

    const groupKey = baseKey
        .concat(current as string)
        .filter(Boolean)
        .join('_');

    const makeFooter = (id: string, groupFilters: GroupFilter[]) =>
        !pending.length
            ? [
                  {
                      id,
                      isGroupFooter: true as const,
                      filters: groupFilters,
                      level,
                  },
              ]
            : [];

    const makeHeader = (id: string, title: any, groupFilters: GroupFilter[]): GroupedData[] =>
        !pending.length
            ? [
                  {
                      isGroupHeader: true as const,
                      field: current as string,
                      title,
                      level,
                      filters: groupFilters,
                      id,
                  },
              ]
            : [];

    const makeGroupedData = (key: string, groupFilters: GroupFilter[]) =>
        makeNested(groupedData[key], pending, index, level + 1, groupFilters);

    const createGroupItem = (key: PrimitiveTypes) => {
        const currentValue = keyStoreReversed.get(key);
        const groupFilters = [
            ...filters,
            {
                field: current as string,
                value: currentValue,
            },
        ];

        return ([] as GroupedData[])
            .concat(makeHeader(`${groupKey}_${key}_header`, currentValue, groupFilters))
            .concat(makeGroupedData(String(key), groupFilters))
            .concat(makeFooter(`${groupKey}_${key}_footer`, groupFilters));
    };

    return texts.map(createGroupItem).flat();
};

const prepareFlattenedDataWithGroups = <T extends RecordWithId = RecordWithId>(
    modelRecords: T[],
    groupRecordsBy: TypedRecordSort<T>[] = [],
) => {
    keyStoreReversed.clear();
    return makeNested(modelRecords, groupRecordsBy).flat();
};

export const prepareGroupedData = <T extends RecordWithId = RecordWithId>(
    modelRecords: T[],
    groupRecordsBy?: TypedRecordSort<T>[],
) => {
    const groupedData = prepareFlattenedDataWithGroups(modelRecords, groupRecordsBy);

    return {
        groupedRecords: groupedData,
        rowIds: Array.from(new Set(groupedData.map(({ id }) => id))),
    };
};
