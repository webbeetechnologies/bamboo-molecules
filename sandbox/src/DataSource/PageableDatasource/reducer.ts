import { EPageableActions, GoToArbitrary, PaginationReducer, SetPerPage } from './types';
import { getPages } from './utils';

export const paginatedDataSourceReducer: PaginationReducer = (dataSource, args) => {
    let pageNumber = dataSource.pagination.pageNumber;
    let perPage = dataSource.pagination.perPage;

    const records = Array.from({
        length: dataSource.totalRecordsCount ?? dataSource.records.length,
    });

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
            pageNumber = getPages({ ...dataSource, records }).length;
            break;
        case EPageableActions.Prev:
            pageNumber = Math.max(
                Math.min(getPages({ ...dataSource, records }).length, pageNumber - 1),
                1,
            );
            break;
        case EPageableActions.Next:
            pageNumber = Math.min(
                Math.max(0, pageNumber + 1),
                getPages({ ...dataSource, records }).length,
            );
            break;
        default:
            return dataSource;
    }

    if (
        pageNumber === dataSource.pagination.pageNumber &&
        perPage === dataSource.pagination.perPage
    ) {
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
