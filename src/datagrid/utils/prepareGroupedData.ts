import type { TDataTableRow } from '@bambooapp/bamboo-molecules';
import { groupBy } from './lodash';
import type { GroupConstantValues, GroupMeta } from '../types/row';

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

type GroupMetaRecord = GroupMeta & {
    title: any;
    groupConstants: GroupConstantValues[];
    id: string;
    groupId: string;
};

export type GroupHeader = GroupMetaRecord & {
    isGroupHeader: true;
};

export type GroupFooter = GroupMetaRecord & {
    isGroupFooter: true;
};

export type GroupRecord = {
    id: TDataTableRow;
    groupConstants: GroupConstantValues[];
    data: RecordWithId;
    level: number;
    groupId: string;
};

export type GroupedData = GroupRecord | GroupHeader | GroupFooter;

const keyStore = new WeakMap();
const keyStoreReversed = new Map();
const cachedFilters = new Map<string, GroupConstantValues[]>([]);

const getCachedConstants = (key: string, filters: GroupConstantValues[]) => {
    if (!cachedFilters.has(key)) cachedFilters.set(key, filters);
    return cachedFilters.get(key)!;
};

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

const getIdFromConstants = (filters: GroupConstantValues[], { prefix = '', suffix = '' } = {}) => {
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
    filters: GroupConstantValues[] = [],
): GroupedData[] => {
    const [currentField, ...pending] = groups ?? [];

    if (!currentField) {
        const groupId = getIdFromConstants(filters);
        return records.map(record => ({
            data: record,
            groupConstants: getCachedConstants(groupId, filters),
            id: record.id,
            level: level - 1,
            index: index++,
            groupId,
        })) as GroupRecord[];
    }

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
            groupConstants: GroupConstantValues[];
            isFirst: boolean;
            isLast: boolean;
        },
        suffix?: string,
    ): GroupedData[] => {
        const groupId = getIdFromConstants(restGroupMeta.groupConstants);
        return [
            {
                ...arg,
                fieldId: currentField as string,
                title,
                level,
                recordCount: records.length,
                groupId,
                isFirstLevel: level === 1,
                isLastLevel: pending.length === 0,
                id: getIdFromConstants([], { prefix: groupId, suffix }),
                isOnly: restGroupMeta.isFirst && restGroupMeta.isLast,
                ...restGroupMeta,
                groupConstants: getCachedConstants(groupId, restGroupMeta.groupConstants),
            },
        ];
    };

    const makeFooter = makeGroupMeta.bind(null, { isGroupFooter: true });
    const makeHeader = makeGroupMeta.bind(null, { isGroupHeader: true });

    const makeGroupedData = (
        key: string,
        { groupConstants }: { groupConstants: GroupConstantValues[] },
    ) => makeNested(groupedData[key], pending, index, level + 1, groupConstants);

    const createGroupItem = (key: PrimitiveTypes, i: number, self: PrimitiveTypes[]) => {
        const currentValue = keyStoreReversed.get(key);
        const groupMeta = {
            isFirst: i === 0,
            isLast: self.length - 1 === i,
            groupConstants: [
                ...filters,
                {
                    field: currentField as string,
                    value: currentValue,
                },
            ],
        };

        return ([] as GroupedData[])
            .concat(makeHeader(currentValue, groupMeta, `header`))
            .concat(makeGroupedData(String(key), groupMeta))
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

export const isGroupFooter = (x: GroupedData): x is GroupFooter => (x as GroupFooter).isGroupFooter;
export const isGroupHeader = (x: GroupedData): x is GroupHeader => (x as GroupHeader).isGroupHeader;
export const isDataRow = (x: GroupedData): x is GroupHeader =>
    !isGroupHeader(x) && !isGroupFooter(x);

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
