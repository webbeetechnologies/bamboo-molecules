import * as React from 'react';
import { useDataSource } from '../DataSource';
import { FilterableDataSourceResult } from '../DataSource/FilterableDatasource/types';
import { RecordType } from '../types';
import { RenderJSON } from './RenderJSONDemo';
import { ReactNode, useCallback, useMemo } from 'react';
import keyBy from 'lodash/keyby';

const getFilterableProps = (props: FilterableDataSourceResult<RecordType>) => {
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

    const filterHash = useMemo(
        () => keyBy(filterableProps.filters, 'columnName'),
        [filterableProps.filters],
    );

    const handleApplyFilter = useCallback(
        (columnName: string) => {
            filterableProps.applyFilter?.({ columnName, value: '' });
        },
        [filterableProps.removeFilter],
    );

    const handleRemoveFilter = useCallback(
        (position: number) => {
            filterableProps.removeFilter?.({ position });
        },
        [filterableProps.removeFilter],
    );

    const handleUpdateFilter = useCallback(
        (columnName: string, value: string) => {
            filterableProps.updateFilter?.({ columnName, value });
        },
        [filterableProps.updateFilter],
    );

    const handleMoveFilter = useCallback(
        (from: number, to: number) => {
            filterableProps.moveFilter?.({ from, to });
        },
        [filterableProps.moveFilter],
    );

    if (!filterableProps.isFilterable) {
        return null;
    }

    return (
        <div>
            <h1>Filters</h1>
            <table width="300" style={{ marginBlockEnd: 15 }}>
                {filterableProps.filters.length > 0 && (
                    <thead style={{ textAlign: 'left' }}>
                        <tr>
                            <th>Filter</th>
                            <th>Value</th>
                            <th>Order</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                            <th></th>
                        </tr>
                    </thead>
                )}
                {filterableProps.filters.map(({ columnName, value, createdAt, updatedAt }, i) => {
                    return (
                        <tbody key={columnName}>
                            <tr>
                                <td>{columnName}</td>
                                <td>
                                    <input
                                        value={value}
                                        onChange={e =>
                                            handleUpdateFilter(columnName, e.target.value)
                                        }
                                    />
                                </td>
                                <td>
                                    <input
                                        value={i}
                                        type="number"
                                        onChange={e => {
                                            const _v = e.target.value;
                                            if (_v === '') {
                                                return;
                                            }
                                            handleMoveFilter(i, +_v);
                                        }}
                                    />
                                </td>
                                <td>
                                    {new Date(createdAt).toLocaleDateString()} {}{' '}
                                    {new Date(createdAt).toLocaleTimeString()}
                                </td>
                                <td>
                                    {new Date(updatedAt).toLocaleDateString()} {}{' '}
                                    {new Date(updatedAt).toLocaleTimeString()}
                                </td>
                                <td>
                                    <button onClick={() => handleRemoveFilter(i)}>Remove</button>
                                </td>
                            </tr>
                        </tbody>
                    );
                })}
            </table>

            <select onChange={e => handleApplyFilter(e.target.value)} value={''}>
                <option>Select a column to Filter on</option>
                {['id', 'first_name', 'last_name'].reduce(
                    (all, val) =>
                        all.concat(filterHash[val] ? [] : [<option key={val}>{val}</option>]),
                    [] as Array<ReactNode>,
                )}
            </select>
            <RenderJSON json={filterableProps.filters} />
        </div>
    );
};
