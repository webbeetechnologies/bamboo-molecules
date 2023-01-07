import {
    EPageableActions,
    OnPaginateAction,
    PageableDataSourceProps,
    PaginationDataSource,
    PaginationDataSourceResult,
} from './types';
import { useCallback, useMemo, useRef } from 'react';
import { getPaginatedValue } from './utils';

const notPaginated = { isPaginated: false };

export const usePageableActionCreator = <T extends {}>(
    props: PageableDataSourceProps,
    dataSource: PaginationDataSource<T>,
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

            dispatch({
                type: 'UPDATE_PAYLOAD',
                payload: {
                    ...paginationResult,
                    lastAction: args.type,
                },
            });
        },
        [isPaginated, dispatch, onPaginate, pagination],
    );

    return useMemo(
        () =>
            !isPaginated
                ? notPaginated
                : ({
                      ...getPaginatedValue({
                          isPaginated,
                          pagination,
                          totalRecordsCount,
                          debug: true,
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
