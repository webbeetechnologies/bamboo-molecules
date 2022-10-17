import {ESortDirection, IDataSourceState, Records, TSort} from "../types";
import {EStoreActions} from "./types";
import zip from "lodash/zip";
import orderBy from "lodash/orderBy";
import chunk from "lodash/chunk";
import omitBy from "lodash/omitBy";



export const prepareRecords = <T>({ records,  action,  pagination, ...rest }: IDataSourceState, updatePagination = false) => {
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

    records = orderRecords(rest.originalRecords as Records<T> ?? records, rest.sort)

    return {
        ...rest,
        action: action ?? EStoreActions.UN_INITIALIZED,
        records: records,
        pages: pagination && chunk(records, pagination?.pageSize),
        pagination: !updatePagination ? pagination : pagination && {
            ...pagination,
            totalCount: records.length,
            page: 1,
        },
    };
};