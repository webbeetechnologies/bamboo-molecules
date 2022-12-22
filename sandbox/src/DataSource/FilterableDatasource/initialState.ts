import { FilterableDataSource } from './types';
import omitBy from 'lodash.omitby';

const initialFilterConfig = { hasNestedFilter: false };

export const extractInitialState = <T extends {}>(props: FilterableDataSource<T>) =>
    omitBy(
        {
            isFilterable: props.isFilterable ?? false,
            filters: props.filters ?? null,
            filterConfig: props.filterConfig ?? initialFilterConfig,
        },
        value => value === null,
    );

export const initialState = {
    isFilterable: true,
    filterConfig: { hasNestedFilter: false },
    filters: [],
};
