import { usePaginatedDataSource } from '../DataSource';
import { RenderJSON } from './RenderJSONDemo';
import { ChangeEventHandler, SyntheticEvent } from 'react';
import { RecordType } from '../types';

export const ApplyPagination = () => {
    const paginatedProps = usePaginatedDataSource<RecordType>();

    const handleGoToStart = (_e: SyntheticEvent) => {
        paginatedProps.goToStart?.();
    };

    const handleGoToPrev = (_e: SyntheticEvent) => {
        paginatedProps.goToPrev?.();
    };

    const handleGoToNext = (_e: SyntheticEvent) => {
        paginatedProps.goToNext?.();
    };

    const handleGoToEnd = (_e: SyntheticEvent) => {
        paginatedProps.goToEnd?.();
    };

    const handleSetPerPage: ChangeEventHandler<HTMLInputElement> = e => {
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
