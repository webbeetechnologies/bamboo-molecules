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

type Meta = {
    groupConstants: GroupConstantValues[];
    isFirst: boolean;
    isLast: boolean;
};

const makeNested = <T extends RecordWithId>(args: {
    records: T[];
    groups: TypedRecordSort<T>[];
    getIndex: () => number;
    level?: number;
    groupedDataMeta?: Meta;
}): GroupedData[] => {
    const {
        records,
        groups,
        getIndex,
        level = 1,
        groupedDataMeta = {
            isFirst: true,
            isLast: true,
            groupConstants: [],
        },
    } = args;

    type GroupBase = 'level';
    type GroupPartials =
        | Pick<GroupHeader, 'isGroupHeader' | GroupBase>
        | Pick<GroupFooter, 'isGroupFooter' | GroupBase>;

    /**
     *
     * Make group header and footer.
     *
     * Note:
     * Creating a new function on every pass because it depends on the data.
     * Also, the function will be garbage collected.
     *
     */
    const makeGroupMeta = <GroupType extends GroupPartials>(
        arg: GroupType,
        restGroupMeta: Meta,
        suffix?: string,
    ): GroupedData[] => {
        const groupId = getIdFromConstants(restGroupMeta.groupConstants);
        return [
            {
                ...arg,
                fieldId: currentField as string,
                title: restGroupMeta.groupConstants.at(-1)?.value,
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

    /**
     * Simplified makeGroupMeta.
     */
    const makeFooter = makeGroupMeta.bind(null, { isGroupFooter: true, level: level - 1 });
    const makeHeader = makeGroupMeta.bind(null, { isGroupHeader: true, level });

    const [currentField, ...pending] = groups ?? [];

    if (!currentField) {
        const groupId = getIdFromConstants(groupedDataMeta.groupConstants);

        const data: GroupedData[] = records.map(record => ({
            data: record,
            groupConstants: getCachedConstants(groupId, groupedDataMeta.groupConstants),
            id: record.id,
            level: level - 1,
            index: getIndex(),
            groupId,
        }));

        return data.concat(makeFooter(groupedDataMeta, `footer`));
    }

    const groupedData = groupBy(records, record => getPrimitiveValue(record[currentField]));

    const texts = Array.from(
        new Set(records.map(record => getPrimitiveValue(record[currentField]))),
    );

    const makeGroupedData = (key: string, groupMeta: Meta) =>
        makeNested({
            records: groupedData[key],
            groups: pending,
            getIndex,
            level: level + 1,
            groupedDataMeta: groupMeta,
        });

    const createGroupItem = (key: PrimitiveTypes, i: number, self: PrimitiveTypes[]) => {
        const currentValue = keyStoreReversed.get(key);
        const groupMeta = {
            isFirst: i === 0,
            isLast: self.length - 1 === i,
            groupConstants: [
                ...groupedDataMeta.groupConstants,
                {
                    field: currentField as string,
                    value: currentValue,
                },
            ],
        };

        return ([] as GroupedData[])
            .concat(makeHeader(groupMeta, `header`))
            .concat(makeGroupedData(String(key), groupMeta));
    };

    return texts.map(createGroupItem).flat();
};

const prepareFlattenedDataWithGroups = <T extends RecordWithId = RecordWithId>(
    modelRecords: T[],
    groupRecordsBy: TypedRecordSort<T>[] = [],
) => {
    let index = 0;
    keyStoreReversed.clear();
    return makeNested({
        records: modelRecords,
        groups: groupRecordsBy,
        getIndex: () => index++,
    }).flat();
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
