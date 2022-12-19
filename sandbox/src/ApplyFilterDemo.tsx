import * as React from 'react';
import { useDataSource } from './DataSource';
import { FilterableDataSourceResult } from './DataSource/FilterableDatasource/types';
import { RecordType } from './types';
import { RenderJSON } from './RenderJSONDemo';
import { useCallback } from 'react';

const getFilterableProps = (props: FilterableDataSourceResult<RecordType>) => {
    if (!props.isFilterable) {
        return { isFilterable: props.isFilterable };
    }

    const {
        isFilterable,
        filters,
        applyFilter,
        removeFilter,
        updateFilter,
        moveFilter,
        addFilterGroup,
        updateFilterGroup,
    } = props;
    return {
        isFilterable,
        filters,
        applyFilter,
        removeFilter,
        updateFilter,
        moveFilter,
        addFilterGroup,
        updateFilterGroup,
    };
};

export const ApplyFilters = () => {
    const filterableProps = getFilterableProps(useDataSource());

    const handleApplyFilter = useCallback(
        (_e: React.SyntheticEvent) => {
            filterableProps.applyFilter?.({ columnName: 'id', value: '1000' });
        },
        [filterableProps.removeFilter],
    );

    const handleRemoveFilter = useCallback(
        (_e: React.SyntheticEvent) => {
            filterableProps.removeFilter?.({ position: '1' });
        },
        [filterableProps.removeFilter],
    );

    const handleUpdateFilter = useCallback(
        (_e: React.SyntheticEvent) => {
            filterableProps.updateFilter?.({ position: '1' });
        },
        [filterableProps.updateFilter],
    );

    const handleMoveFilter = useCallback(
        (_e: React.SyntheticEvent) => {
            filterableProps.moveFilter?.({ position: '1' });
        },
        [filterableProps.moveFilter],
    );

    if (!filterableProps.isFilterable) {
        return null;
    }

    return null;

    return (
        <div>
            <h1>Filters</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', width: 500 }}>
                <button onClick={handleApplyFilter}>Add Filter</button>
                <button style={{ flex: 0, flexBasis: 100 }} onClick={handleGoToPrev}>
                    Remove
                </button>
                <button style={{ flex: 0, flexBasis: 100 }} onClick={handleGoToNext}>
                    Update Filter
                </button>
                <button style={{ flex: 0, flexBasis: 100 }} onClick={handleGoToEnd}>
                    Move Filter
                </button>
                <select onChange={e => handleApplySort(e.target.value)} value={column}>
                    <option>Select a column to Filter on</option>
                    {['id', 'first_name', 'last_name'].map(val => (
                        <option key={val} value={val}>
                            {val}
                        </option>
                    ))}
                </select>
                <input
                    style={{ flex: 0, flexBasis: 100, width: 100, boxSizing: 'border-box' }}
                    value={paginatedProps.pagination.perPage}
                    onChange={handleSetPerPage}
                />
            </div>
            <RenderJSON json={filterableProps.filters} />
        </div>
    );
};
