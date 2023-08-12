import type { TDataTableRow } from '@bambooapp/bamboo-molecules';
import { groupBy } from './lodash';
import { RowType, GroupConstantValues, GroupMeta } from '../types/row';

export interface RecordWithId extends Record<string, any> {
    id: number | string;
}

type TypedRecordSort<O = RecordWithId> = keyof O;

type PrimitiveTypes = string | boolean | number | null | undefined;

type GroupMetaRecord = GroupMeta & {
    title: any;
    groupConstants: GroupConstantValues[];
    id: string;
    groupId: string;
    isAbsolute?: boolean;
};

export type GroupHeader = GroupMetaRecord & {
    rowType: 'header';
};

export type GroupFooter = GroupMetaRecord & {
    rowType: 'footer';
};

export type GroupRecord = {
    id: TDataTableRow;
    groupConstants: GroupConstantValues[];
    data: RecordWithId;
    level: number;
    groupId: string;
    index: number;
    rowType: 'data';
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
    isAbsolute?: boolean;
    recordCount: number;
};

const makeNested = <T extends RecordWithId>(args: {
    records: T[];
    groups: TypedRecordSort<T>[];
    getIndex: () => number;
    groupedDataMeta?: Meta;
}): GroupedData[] => {
    const {
        records,
        groups,
        getIndex,
        groupedDataMeta = {
            isFirst: true,
            isLast: true,
            groupConstants: [],
            recordCount: records.length,
        },
    } = args;

    type GroupPartials = { rowType: Exclude<RowType, RowType.DATA> };

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
    ): GroupedData[] => {
        const groupId = getIdFromConstants(restGroupMeta.groupConstants);
        const level = restGroupMeta.groupConstants.length;
        return [
            {
                ...(arg as GroupType),
                fieldId: restGroupMeta.groupConstants.at(-1)?.field,
                title: restGroupMeta.groupConstants.at(-1)?.value,
                groupId,
                level: restGroupMeta.groupConstants.length,
                isFirstLevel: level === 1,
                isLastLevel: pending.length === 0,
                id: getIdFromConstants([], { prefix: groupId, suffix: arg.rowType }),
                isOnly: restGroupMeta.isFirst && restGroupMeta.isLast,
                ...restGroupMeta,
                groupConstants: getCachedConstants(groupId, restGroupMeta.groupConstants),
            },
        ];
    };

    /**
     * Simplified makeGroupMeta.
     */
    const makeFooter = makeGroupMeta.bind(null, { rowType: RowType.FOOTER });
    const makeHeader = makeGroupMeta.bind(null, { rowType: RowType.HEADER });

    const [currentField, ...pending] = groups ?? [];

    if (!currentField) {
        const groupId = getIdFromConstants(groupedDataMeta.groupConstants);

        const data: GroupedData[] = records.map(record => ({
            data: record,
            groupConstants: getCachedConstants(groupId, groupedDataMeta.groupConstants),
            id: record.id,
            level: groupedDataMeta.groupConstants.length,
            index: getIndex(),
            groupId,
            rowType: RowType.DATA,
        }));

        return data.concat(makeFooter(groupedDataMeta));
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
            groupedDataMeta: groupMeta,
        });

    const createGroupItem = (key: PrimitiveTypes, i: number, self: PrimitiveTypes[]) => {
        const currentValue = keyStoreReversed.get(key);
        const groupMeta = {
            isFirst: i === 0,
            isLast: self.length - 1 === i,
            recordCount: groupedData[String(key)].length,
            groupConstants: [
                ...groupedDataMeta.groupConstants,
                {
                    field: currentField as string,
                    value: currentValue,
                },
            ],
        };

        return ([] as GroupedData[])
            .concat(makeHeader(groupMeta))
            .concat(makeGroupedData(String(key), groupMeta))
            .concat(pending.length ? makeFooter(groupMeta) : []);
    };

    return [
        ...texts.map(createGroupItem),

        groupedDataMeta.groupConstants.length
            ? []
            : makeFooter({
                  isAbsolute: true,
                  isFirst: false,
                  isLast: false,
                  groupConstants: [],
                  recordCount: records.length,
              }),
    ].flat();
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

export const isGroupFooter = (x: GroupedData): x is GroupFooter => x.rowType === RowType.FOOTER;
export const isGroupHeader = (x: GroupedData): x is GroupHeader => x.rowType === RowType.HEADER;
export const isDataRow = (x: GroupedData): x is GroupHeader => x.rowType === RowType.DATA;

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
