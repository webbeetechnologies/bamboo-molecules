import omitBy from 'lodash.omitby';
import { PaginationDataSource } from './types';

export const extractInitialState = <T extends {}>(props: PaginationDataSource<T>) =>
    omitBy(
        {
            isPaginated: props.isPaginated ?? false,
            pagination: props.pagination ?? null,
        },
        value => value === null,
    );

export const initialState = {
    isPaginated: true,
    pagination: {
        disabled: false,
        pageNumber: 1,
        perPage: 10,
    },
};
