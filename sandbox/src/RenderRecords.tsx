import * as React from 'react';
import { ESortDirection } from './DataSource/SortableDatasource';
import { DataSourceReturnType } from './DataSource/__types';
import { RecordType } from './types';

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
    props;
    const sortableProps = getSortableProps(props);

    // const sortSource = useSortableDataSource({ records: workers as string[], setRecords: () => {}, sort: { }, searchKey: "test" });
    // const searchSource = useFilterableDataSource({ ...sortSource, searchKey: "test", setRecords: () => {}, sort: { },  });

    // searchSource.

    // const { useArraySource, useAsyncSource } = require('bamboo-datasource').state;
    // const { useArraySource, useAsyncSource } = require('bamboo-datasource').redux;

    // const = [model, setModel] useState();

    // const {records, pagination,} = useArrayStateSource([] , {filter: (filters) => {}});
    // const asyncSource = useAsyncStateSource<Filterable&Sortable>(async ({filters}, {}) => {
    //   model

    //   return {
    //     results: await axios.get(''),
    //     pagination: await axios.get('')
    //   };
    // });

    const [column, selectColumn] = React.useState('');

    // const changeColumn = (column: string, direction?: ESortDirection ) => {
    //   applySort?.({ column, direction})
    //   selectColumn("");
    // }

    // const changeSort = (column: string, direction?: ESortDirection | "" ) => {
    //   if (direction === "") {
    //     removeSort?.({ column })
    //   } else {
    //     changeColumn(column, Number(direction))
    //   }
    // }

    const handleApplyFilter = (_e: React.SyntheticEvent) => {
        // {filterName: string, value: any, operator: EFilterOperator }
        // applyFilter?.()
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
                        <RenderJSON json={sortableProps.sorting} />
                    </div>
                )}

                {/* {
          filters &&
            <div>
              <h1>Filters</h1>
              <button onClick={ handleApplyFilter }>Filter</button>
            </div>
        } */}
            </div>
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
