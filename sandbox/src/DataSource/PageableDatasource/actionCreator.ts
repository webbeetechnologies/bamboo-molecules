import {
    EPageableActions,
    GoToArbitrary,
    OnPaginateAction,
    PaginationDataSource,
    SetPerPage,
} from './types';
import { useCallback, useMemo, useRef } from 'react';
import { getPaginatedValue } from './utils';

const notPaginated = { isPaginated: false };

export const actionCreator = <
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
    const { isPaginated, totalRecordsCount, pagination } = dataSource;

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

            if (!onPaginate) {
                throw new Error('onPaginate function is not provided');
            }

            // @ts-ignore
            dispatch({
                type: 'UPDATE_PAYLOAD',
                payload: {
                    ...onPaginate(dataSourceRef.current, args),
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
                : {
                      ...getPaginatedValue({
                          isPaginated,
                          pagination,
                          totalRecordsCount,
                          debug: true,
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
        [isPaginated, pagination, totalRecordsCount, handlePaginate],
    );
};
