import { useCallback, useMemo, useRef } from 'react';
import omitBy from 'lodash.omitby';

import { createDataSource } from '../createDataSource';
import {
    EPageableActions,
    GoToArbitrary,
    OnPaginateAction,
    PaginationDataSource,
    PaginationReducer,
    SetPerPage,
} from './types';
import { getPage, getPages, getPaginatedValue } from './utils';

const paginatedReducer: PaginationReducer = (dataSource, args: any) => {
    let pageNumber = dataSource.pagination.pageNumber;
    let perPage = dataSource.pagination.perPage;

    switch (args.type) {
        case EPageableActions.SetPerPage:
            perPage = (args as SetPerPage).payload.perPage;
            pageNumber = perPage !== dataSource.pagination.perPage ? 1 : pageNumber;
            break;
        case EPageableActions.Page:
            pageNumber = (args as GoToArbitrary).payload.pageNumber;
            break;
        case EPageableActions.Start:
            pageNumber = 1;
            break;
        case EPageableActions.End:
            pageNumber = getPages(dataSource).length;
            break;
        case EPageableActions.Prev:
            pageNumber = Math.max(Math.min(getPages(dataSource).length, pageNumber - 1), 1);
            break;
        case EPageableActions.Next:
            pageNumber = Math.min(Math.max(0, pageNumber + 1), getPages(dataSource).length);
            break;
        default:
            return dataSource;
    }

    return {
        ...dataSource,
        pagination: {
            pageNumber,
            perPage,
        },
    };
};

const notPaginated = { isPaginated: false };

const usePaginatedActionCreator = <
    T extends {},
    S extends Omit<PaginationDataSource<T>, 'onPaginate'> = Omit<
        PaginationDataSource<T>,
        'onPaginate'
    >,
    A extends OnPaginateAction = OnPaginateAction,
    P extends PaginationDataSource<T> = PaginationDataSource<T>,
>(
    props: P,
    dataSource: S,
    dispatch: (action: A) => void,
) => {
    const { onPaginate = null } = props;
    const { isPaginated, records, pagination, shouldResolveRecords } = dataSource;

    const dataSourceRef = useRef(dataSource);
    dataSourceRef.current = dataSource;

    const handlePaginate = useCallback(
        (args: OnPaginateAction) => {
            if (pagination.disabled) {
                return;
            }

            if (!isPaginated) {
                throw new Error('Cannot paginate when isPaginated is false');
            }

            if (onPaginate === null) {
                // @ts-ignore
                dispatch(args);
                return;
            }

            // @ts-ignore
            dispatch({
                type: 'UPDATE_PAYLOAD',
                payload: onPaginate(dataSourceRef.current, args),
            });
        },
        [isPaginated, dispatch, onPaginate, records, pagination],
    );

    return useMemo(
        () =>
            !isPaginated
                ? notPaginated
                : {
                      ...getPaginatedValue({
                          isPaginated,
                          pagination,
                          shouldResolveRecords,
                          records,
                      }),
                      setPerPage: (payload: SetPerPage['payload']) => {
                          handlePaginate({ type: EPageableActions.SetPerPage, payload });
                      },
                      goTo: (payload: GoToArbitrary['payload']) => {
                          handlePaginate({ type: EPageableActions.Page, payload });
                      },
                      goToStart: () => {
                          handlePaginate({ type: EPageableActions.Start });
                      },
                      goToEnd: () => {
                          handlePaginate({ type: EPageableActions.End });
                      },
                      goToPrev: () => {
                          handlePaginate({ type: EPageableActions.Prev });
                      },
                      goToNext: () => {
                          handlePaginate({ type: EPageableActions.Next });
                      },
                  },
        [isPaginated, pagination, records, handlePaginate],
    );
};

const PaginatedDataSource = {
    reducer: paginatedReducer,
    actionCreator: usePaginatedActionCreator,
    extractInitialState: (props: any) =>
        omitBy(
            {
                isPaginated: props.isPaginated ?? false,
                pagination: props.pagination ?? null,
            },
            value => value === null,
        ),
    defaultResolver: <T extends {}>({
        isPaginated,
        records,
        pagination,
    }: PaginationDataSource<T>) => {
        if (!isPaginated) return records;
        return getPage({ records, pagination });
    },
    initialState: {
        isPaginated: true,
        pagination: {
            disabled: false,
            pageNumber: 1,
            perPage: 10,
        },
    },
};

const { DataSourceProvider, useDataSourceHook, useDataSourceDispatch } = createDataSource([
    PaginatedDataSource,
]);

export default PaginatedDataSource;
export const PaginatedDataSourceProvider = DataSourceProvider;
export const usePaginatedDataSource = useDataSourceHook;
export const usePaginatedDispatch = useDataSourceDispatch;
