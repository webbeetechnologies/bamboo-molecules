import { ESortDirection, PaginationDataSourceResult, useDataSource } from './DataSource';
import { RenderJSON } from './RenderJSONDemo';
import { useCallback } from 'react';

const getPaginatedProps = <T,>(props: PaginationDataSourceResult<T>) => {
    if (!props.isPaginated) {
        return { isPaginated: props.isPaginated };
    }

    const { isPaginated, pagination, goToStart, goToEnd, goToNext, goToPrev, setPerPage } = props;
    return { isPaginated, pagination, goToStart, goToEnd, goToNext, goToPrev, setPerPage };
};

export const ApplyPagination = () => {
    const paginatedProps = getPaginatedProps(useDataSource());

    const handleGoToStart = (_e: React.SyntheticEvent) => {
        paginatedProps.goToStart?.();
    };

    const handleGoToPrev = (_e: React.SyntheticEvent) => {
        paginatedProps.goToPrev?.();
    };

    const handleGoToNext = (_e: React.SyntheticEvent) => {
        paginatedProps.goToNext?.();
    };

    const handleGoToEnd = (_e: React.SyntheticEvent) => {
        paginatedProps.goToEnd?.();
    };

    const handleSetPerPage: React.ChangeEventHandler<HTMLInputElement> = e => {
        paginatedProps.setPerPage?.({ perPage: +e.target.value || 1 });
    };

    if (!paginatedProps.isPaginated) {
        return null;
    }

    return (
        <div>
            <h1>Paginate</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', width: 500 }}>
                <button style={{ flex: 0, flexBasis: 100 }} onClick={handleGoToStart}>
                    &lt;&lt; Start
                </button>
                <button style={{ flex: 0, flexBasis: 100 }} onClick={handleGoToPrev}>
                    &lt; Prev
                </button>
                <button style={{ flex: 0, flexBasis: 100 }} onClick={handleGoToNext}>
                    Next &gt;
                </button>
                <button style={{ flex: 0, flexBasis: 100 }} onClick={handleGoToEnd}>
                    End &gt;&gt;
                </button>
                <input
                    style={{ flex: 0, flexBasis: 100, width: 100, boxSizing: 'border-box' }}
                    value={paginatedProps.pagination.perPage}
                    onChange={handleSetPerPage}
                />
                <RenderJSON json={paginatedProps.pagination} />
            </div>
        </div>
    );
};
