import { useMemo, useRef, useState } from 'react';
import {
    EPageableActions,
    SetPerPage,
    NotPageable,
    OnPaginate,
    Pagination,
    PaginationInfo,
    PaginatedDataSourceProps,
    PageableDataSource,
    NotPageableReturnProps,
    PaginatedDataSourcePropsEnabled,
    OnPaginateAction,
    GoToArbitrary,
    PageableWithInfo,
} from './types';
import { useControlledValue } from 'bamboo-molecules';
import chunk from 'lodash/chunk';

type Args<T> = { isPaginated?: boolean; pagination: Pagination; records: T[] };

const getPages = <T>({ pagination, records }: Args<T>) => {
    const { perPage = 10 } = pagination;
    return chunk(records, perPage);
};

const getPage = <T>({ pagination, records }: Args<T>) => {
    const { pageNumber = 1 } = pagination;
    return getPages({ pagination, records })[pageNumber - 1];
};

const getPaginatedValue = <T extends {}>({ isPaginated, pagination, records }: Args<T>) => {
    if (!isPaginated) {
        return { ...{isPaginated: false} as NotPageable, };
    }

    const page = getPage({ pagination, records });
    return {
        isPaginated,
        pagination: {
            ...pagination,
            count: page.length || 0,
            totalRecords: records.length,
        } as Pagination & PaginationInfo<T>,
    };
};

const defaultPaginate: OnPaginate = (dataSource, args) => {
    let pageNumber = dataSource.pagination.pageNumber;
    let perPage = dataSource.pagination.perPage;

    if (!dataSource.pagination) {
        throw new Error('Pagination cannot be undefined');
    }

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
    }

    return { pageNumber, perPage };
};

export const usePageableDatasource = <T extends {}>(props: PaginatedDataSourceProps<T>,): PageableDataSource<T> => {
    const paginatedProps = props as PaginatedDataSourcePropsEnabled<T>
    const {isPaginated, onPaginate = defaultPaginate, records, pagination, ...rest} = paginatedProps;
    const memoizedKeys = useMemo(() => Object.keys(rest), []);
    const isControlled = useRef(onPaginate !== defaultPaginate).current;
    const [lastAction, setLastAction] = useState<OnPaginateAction | null>(null);

    const [paginatedSource, setPaginatedSource] = useControlledValue({
        value: !isControlled
            ? undefined
            : useMemo(
                  () => getPaginatedValue({ isPaginated, pagination, records }),
                  [isPaginated, pagination, records],
              ),
        defaultValue: isControlled
            ? undefined
            : useMemo(
                  () => getPaginatedValue({ isPaginated, pagination, records }),
                  [isPaginated, pagination, records],
              ),
    });


    const handlePaginate = (args: OnPaginateAction) => {
        const { onPaginate: _, ...rest } = paginatedProps;
        if (rest.pagination.disabled) {
            return;
        }

        if (!rest.isPaginated) {
            throw new Error("Cannot paginate when isPaginated is false");
        }

        const pagination = onPaginate(
            {
                ...rest,
                ...paginatedSource,
                records: rest.records,
            } as PaginatedDataSourcePropsEnabled<T>,
            args,
            defaultPaginate,
        )

        const value = getPaginatedValue({
            isPaginated: rest.isPaginated,
            pagination,
            records: rest.records,
        }) as PageableWithInfo<T>;


        setLastAction(args);
        setPaginatedSource(value);
    };

    return useMemo(
        () =>
            !paginatedSource.isPaginated
                ? ({ ...rest, ...paginatedSource, records, } as NotPageableReturnProps<T>)
                : {
                      ...rest,
                      ...paginatedSource,
                      records: getPage({...rest, ...paginatedSource, records}),
                      setPerPage: (payload) => {
                          handlePaginate({ type: EPageableActions.SetPerPage, payload });
                      },
                      goTo: (payload) => {
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
        [paginatedSource, records].concat(memoizedKeys.map(key => (rest as any)[key])),
    );
};
