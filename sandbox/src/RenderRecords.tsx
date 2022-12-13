import * as React from 'react';
import { ESortDirection } from './DataSource/SortableDatasource';
import { DataSourceReturnType } from './DataSource/__types';
import { RecordType } from './types';
import {FilterableDataSource, FilterableDataSourceResult} from "./DataSource/FilterableDatasource/types";

const getPaginatedProps = (props: DataSourceReturnType<RecordType>) => {
    if (!props.isPaginated) {
        return { isPaginated: props.isPaginated };
    }

    const { isPaginated, pagination, goToStart, goToEnd, goToNext, goToPrev, setPerPage } = props;
    return { isPaginated, pagination, goToStart, goToEnd, goToNext, goToPrev, setPerPage };
};

const getSortableProps = (props: DataSourceReturnType<RecordType>) => {
    if (!props.isSortable) {
        return { isSortable: props.isSortable };
    }

    const { isSortable, sort, applySort, removeSort, reorderSort, updateSort } = props;
    return { isSortable, sort, applySort, removeSort, reorderSort, updateSort };
};

const getFilterableProps = (props: FilterableDataSourceResult<RecordType>) => {
    if (!props.isFilterable) {
        return { isFilterable: props.isFilterable };
    }

    const { isFilterable, filters, applyFilter, removeFilter, updateFilter, moveFilter, addFilterGroup, updateFilterGroup } = props;
    return { isFilterable, filters, applyFilter, removeFilter, updateFilter, moveFilter, addFilterGroup, updateFilterGroup };
};

const RenderJSON = (props: { json: Object }) => {
    return (
        <pre
            style={{
                width: 500,
                maxWidth: '100%',
                flex: 10,
                flexBasis: 100,
                background: '#f5f5f5',
                border: '1px solid #eee',
                borderRadius: '4px',
                padding: 8,
            }}>
            {JSON.stringify(props.json, null, 4)}
        </pre>
    );
};

const RenderRecords: React.FC<DataSourceReturnType<RecordType>> = props => {
    const paginatedProps = getPaginatedProps(props);
    const sortableProps = getSortableProps(props);
    const filterableProps = getFilterableProps(props);



    const [column, selectColumn] = React.useState('');


    const handleApplyFilter = (_e: React.SyntheticEvent) => {
        filterableProps.applyFilter?.({columnName: "id", value: "1000" })
    };

    const handleRemoveFilter = (_e: React.SyntheticEvent) => {
        filterableProps.removeFilter?.({position: "1",})
    };

    const handleUpdateFilter = (_e: React.SyntheticEvent) => {
        filterableProps.removeFilter?.({position: "1",})
    };

    const handleMoveFilter = (_e: React.SyntheticEvent) => {
        filterableProps.removeFilter?.({position: "1",})
    };

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

    const handleApplySort = (column: string, direction?: ESortDirection) => {
        sortableProps.applySort?.({ column, direction });
    };

    const handleMoveSort = (newIndex: string, i: number) => {
        sortableProps.reorderSort?.({
            newIndex: newIndex === '' ? i : +newIndex,
            prevIndex: i,
        });
    };

    const handleRemoveSort = (column: string) => {
        sortableProps.removeSort?.({ column });
    };

    const handleUpdateSortDirection = (index: number, direction: ESortDirection) => {
        sortableProps.updateSort?.({ direction, index });
    };

    // NOTE:: Don't judge the code below; it's meant to be a demo only :D

    return (
        <>
            {props.records && (
                <ul>
                    {props.records.map(worker => (
                        <Coworker worker={worker} key={worker.id} />
                    ))}
                </ul>
            )}

            {/* {
          (props.isLoading && records.length <= 0) &&
          <h2>Loading...</h2>
        }
 */}

            {!paginatedProps.isPaginated ? null : (
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
            )}

            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                {!sortableProps.isSortable ? null : (
                    <div>
                        <h1>Sorting</h1>
                        <table width="300" style={{ marginBlockEnd: 15 }}>
                            {sortableProps.sort.order.length > 0 && (
                                <thead style={{ textAlign: 'left' }}>
                                <tr>
                                    <th>Column</th>
                                    <th>Order</th>
                                </tr>
                                </thead>
                            )}
                            {sortableProps.sort.order.map(({ column, ...rest }, i) => {
                                return (
                                    <tbody key={column}>
                                    <tr>
                                        <td>{column}</td>
                                        <td>
                                            <select
                                                key={column + 'sort'}
                                                value={rest.direction + ''}
                                                onChange={e => {
                                                    if (e.target.value === '')
                                                        handleRemoveSort(column);
                                                    else
                                                        handleUpdateSortDirection(
                                                            i,
                                                            +e.target
                                                                .value as unknown as ESortDirection,
                                                        );
                                                }}>
                                                <option value="">Remove</option>
                                                <option value={ESortDirection.Asc}>asc</option>
                                                <option value={ESortDirection.Desc}>
                                                    desc
                                                </option>
                                            </select>
                                        </td>
                                        {sortableProps.sort.isNestedSort && (
                                            <td>
                                                <input
                                                    value={i}
                                                    type="number"
                                                    onChange={e =>
                                                        handleMoveSort(e.target.value, i)
                                                    }
                                                />
                                            </td>
                                        )}
                                    </tr>
                                    </tbody>
                                );
                            })}
                        </table>

                        <select onChange={e => handleApplySort(e.target.value)} value={column}>
                            <option>Select a column to Filter on</option>
                            {['id', 'first_name', 'last_name'].map(val => (
                                <option key={val} value={val}>
                                    {val}
                                </option>
                            ))}
                        </select>
                        <RenderJSON json={sortableProps.sort} />
                    </div>
                )}
            </div>

            {
                filterableProps.isFilterable &&
                <div>
                    <h1>Filters</h1>
                    <div style={{ display: 'flex', flexWrap: 'wrap', width: 500 }}>
                        <button onClick={ handleApplyFilter }>Add Filter</button>
                        <button style={{ flex: 0, flexBasis: 100 }} onClick={handleGoToPrev}>Remove</button>
                        <button style={{ flex: 0, flexBasis: 100 }} onClick={handleGoToNext}>Update Filter</button>
                        <button style={{ flex: 0, flexBasis: 100 }} onClick={handleGoToEnd}>Move Filter</button>
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
            }

        </>
    );
};

export default RenderRecords;

const Coworker = (props: { worker: RecordType }) => {
    const worker = props.worker;
    return (
        <li>
            {worker.id} {worker.first_name} {worker.last_name}
        </li>
    );
};
