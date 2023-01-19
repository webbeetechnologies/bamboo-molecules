import {
    EPageableActions,
    OnPaginateAction,
    PageableDataSourceProps,
    PaginationDataSourceState,
    PaginationDataSourceResult,
} from './types';
import { useCallback, useMemo, useRef } from 'react';
import { getPaginatedValue } from './utils';
import { useDataSource } from '../DataSourceContext';
import { DataSourceType } from '../types';

export const usePageableActionCreator = <T extends {}>(
    props: PageableDataSourceProps,
    dataSource: PaginationDataSourceState<T>,
    dispatch: (action: OnPaginateAction) => void,
    config: { hasReducer: boolean },
) => {
    const { onPaginate = null } = props;
    const { isPaginated, totalRecordsCount, pagination } = dataSource;

    const dataSourceRef = useRef(dataSource);
    dataSourceRef.current = dataSource;

    const handlePaginate = useCallback(
        (args: OnPaginateAction) => {
            if (pagination.disabled) {
                return;
            }

            if (config.hasReducer) {
                dispatch(args);
                return;
            }

            if (!isPaginated) {
                throw new Error('Cannot paginate when isPaginated is false');
            }

            if (!onPaginate) {
                throw new Error('onPaginate function is not provided');
            }

            const paginationResult = onPaginate(dataSourceRef.current, args);

            if (paginationResult === dataSourceRef.current) {
                return;
            }

            dataSourceRef.current = paginationResult;

            dispatch({
                type: 'UPDATE_PAYLOAD',
                payload: {
                    ...paginationResult,
                    lastAction: args.type,
                },
            });
        },
        [config.hasReducer, isPaginated, dispatch, onPaginate, pagination],
    );

    return useMemo(
        () =>
            ({
                ...getPaginatedValue({
                    isPaginated,
                    pagination,
                    totalRecordsCount,
                }),
                setPerPage: payload => {
                    handlePaginate({ type: EPageableActions.SetPerPage, payload });
                },
                goTo: payload => {
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
            } as PaginationDataSourceResult<T>),
        [isPaginated, pagination, totalRecordsCount, handlePaginate],
    );
};

export const usePaginatedDataSource = <T extends {}>(): PaginationDataSourceResult<T> => {
    const {
        records,
        isPaginated,
        setPerPage,
        pagination,
        goTo,
        goToStart,
        goToEnd,
        goToPrev,
        goToNext,
    } = useDataSource() as DataSourceType<T> & PaginationDataSourceResult<T>;

    return useMemo(
        () =>
            !(isPaginated as boolean)
                ? ({
                      records,
                      isPaginated,
                  } as PaginationDataSourceResult<T>)
                : ({
                      records,
                      isPaginated: true,
                      setPerPage,
                      goTo,
                      goToStart,
                      goToEnd,
                      goToPrev,
                      goToNext,
                      pagination,
                  } as PaginationDataSourceResult<T>),
        [
            records,
            isPaginated,
            pagination,
            setPerPage,
            goTo,
            goToStart,
            goToEnd,
            goToPrev,
            goToNext,
        ],
    );
};
