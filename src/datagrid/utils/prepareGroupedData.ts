import type { TDataTableColumn, TDataTableRow } from 'src/components/DataTable/types';
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

type GroupMetaRecord = {
    fieldId: TDataTableColumn;
    title: any;
    level: number;
    filters: GroupFilter[];
    id: string;
    count: number;
    groupId: string;
    isFirstLevel: boolean;
    isLastLevel: boolean;
    isFirst: boolean;
    isLast: boolean;
    isOnly: boolean;
};

export type GroupHeader = GroupMetaRecord & {
    isGroupHeader: true;
};

export type GroupFooter = GroupMetaRecord & {
    isGroupFooter: true;
};

export type GroupRecord = {
    id: TDataTableRow;
    filters: GroupFilter[];
    data: RecordWithId;
    level: number;
    groupId: string;
};

export type GroupedData = GroupRecord | GroupHeader | GroupFooter;

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

const getIdFromFilters = (filters: GroupFilter[], { prefix = '', suffix = '' } = {}) => {
    return [
        prefix || ([] as string[]),
        ...filters.map(x => `${x.field}_${getPrimitiveValue(x.value)}`),
        suffix || ([] as string[]),
    ]
        .flat()
        .join('::');
};

const makeNested = <T extends RecordWithId>(
    records: T[],
    groups: TypedRecordSort<T>[],
    index = 0,
    level = 1,
    filters: GroupFilter[] = [],
): GroupedData[] => {
    const [currentField, ...pending] = groups ?? [];

    if (!currentField)
        return records.map(record => ({
            data: record,
            filters,
            id: record.id,
            level: level - 1,
            index: index++,
            groupId: getIdFromFilters(filters),
        })) as GroupRecord[];

    const groupedData = groupBy(records, record => getPrimitiveValue(record[currentField]));

    const texts = Array.from(
        new Set(records.map(record => getPrimitiveValue(record[currentField]))),
    );

    const makeGroupMeta = <
        GroupType extends Pick<GroupHeader, 'isGroupHeader'> | Pick<GroupFooter, 'isGroupFooter'>,
    >(
        arg: GroupType,

        title: any,
        restGroupMeta: {
            filters: GroupFilter[];
            isFirst: boolean;
            isLast: boolean;
        },
        suffix?: string,
    ): GroupedData[] => {
        const groupId = getIdFromFilters(restGroupMeta.filters);
        return [
            {
                ...arg,
                fieldId: currentField as string,
                title,
                level,
                count: records.length,
                groupId,
                isFirstLevel: level === 1,
                isLastLevel: pending.length === 0,
                id: getIdFromFilters([], { prefix: groupId, suffix }),
                isOnly: restGroupMeta.isFirst && restGroupMeta.isLast,
                ...restGroupMeta,
            },
        ];
    };

    const makeFooter = makeGroupMeta.bind(null, { isGroupFooter: true });
    const makeHeader = makeGroupMeta.bind(null, { isGroupHeader: true });

    const makeGroupedData = (key: string, groupFilters: GroupFilter[]) =>
        makeNested(groupedData[key], pending, index, level + 1, groupFilters);

    const createGroupItem = (key: PrimitiveTypes, i: number, self: PrimitiveTypes[]) => {
        const currentValue = keyStoreReversed.get(key);
        const groupMeta = {
            isFirst: i === 0,
            isLast: self.length - 1 === i,
            filters: [
                ...filters,
                {
                    field: currentField as string,
                    value: currentValue,
                },
            ],
        };

        return ([] as GroupedData[])
            .concat(makeHeader(currentValue, groupMeta, `header`))
            .concat(makeGroupedData(String(key), groupMeta.filters))
            .concat(makeFooter(currentValue, groupMeta, `footer`));
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
