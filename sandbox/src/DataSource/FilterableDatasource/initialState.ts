import { FilterableDataSourceProps, FilterableDataSourceState } from './types';
import omitBy from 'lodash/omitBy';

export const extractInitialState = <T extends {}>(props: FilterableDataSourceProps) =>
    omitBy(
        {
            isFilterable: props.isFilterable ?? false,
            filters: props.filters ?? null,
            filterConfig: props.filterConfig ?? initialState.filterConfig,
        },
        value => value === null,
    );

export const initialState = {
    isFilterable: true,
    filterConfig: { hasNestedFilter: false },
    filters: [],
};
