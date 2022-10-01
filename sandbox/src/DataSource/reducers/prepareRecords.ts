import {ESortDirection, EStoreActions, Records, TSort} from "../types";
import {DataSourceState} from "../actions.type";
import zip from "lodash/zip";
import orderBy from "lodash/orderBy";
import chunk from "lodash/chunk";


type PrepareRecordsArg<T> = DataSourceState<T>;

export type PrepareRecords = typeof prepareRecords;

export const prepareRecords = <T>({ records,  action,  pagination, ...rest }: PrepareRecordsArg<T>) => {
    const orderRecords = <T>(records: Records<T>, sort?: TSort[]) => {
        let predicate = sort && zip(...sort?.map(({
            column,
            direction
        }) => [column, direction === ESortDirection.DESC ? "desc" : "asc"]));
        const sortFirstItem = sort?.[0];
        const isFlatRecords = sortFirstItem && !sortFirstItem.column;

        if (!predicate) {
            return records;
        }

        if (isFlatRecords) {
            predicate = [];
        }

        let sorted = orderBy(records, ...predicate);

        if (isFlatRecords && sortFirstItem.direction === ESortDirection.DESC) {
            sorted = sorted.reverse();
        }

        return sorted
    };

    const originalRecords = rest.originalRecords as Records<T> ?? records;

    return {
        originalRecords,
        ...rest,
        action: action ?? EStoreActions.SET_RECORDS,
        records: orderRecords(originalRecords, rest.sort),
        pages: pagination && chunk(records, pagination?.pageSize),
        pagination: pagination && {
            ...pagination,
            totalCount: records.length,
            page: 1,
        },
    };
};