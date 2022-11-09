import * as React from 'react';
import { PageableDataSource } from './DataSource/PageableDatasource/types';
import { DataSource } from './DataSource/types';
import { RecordType } from './types';

const RenderRecords: React.FC<PageableDataSource<RecordType> & { isPaginated: true }> = props => {
    const { pagination, records, goToStart, goToEnd, goToNext, goToPrev, setPerPage, ...rest } =
        props;

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
        goToStart?.();
    };

    const handleGoToPrev = (_e: React.SyntheticEvent) => {
        goToPrev?.();
    };

    const handleGoToNext = (_e: React.SyntheticEvent) => {
        goToNext?.();
    };

    const handleGoToEnd = (_e: React.SyntheticEvent) => {
        goToEnd?.();
    };

    const handleSetPerPage: React.ChangeEventHandler<HTMLInputElement> = e => {
        setPerPage?.(+e.target.value || 1);
    };

    // NOTE:: Don't judge the code below; it's meant to be a demo only :D

    return (
        <>
            {pagination.page && pagination && (
                <ul>
                    {pagination.page?.map(worker => (
                        <Coworker worker={worker} key={worker.id} />
                    ))}
                </ul>
            )}

            {/* {
          (props.isLoading && records.length <= 0) &&
          <h2>Loading...</h2>
        }
 */}

            {!goToStart ? null : (
                <>
                    <h1>Paginate</h1>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        <button style={{ flex: 1, flexBasis: 100 }} onClick={handleGoToStart}>
                            &lt;&lt; Start
                        </button>
                        <button style={{ flex: 1, flexBasis: 100 }} onClick={handleGoToPrev}>
                            &lt; Prev
                        </button>
                        <button style={{ flex: 1, flexBasis: 100 }} onClick={handleGoToNext}>
                            Next &gt;
                        </button>
                        <button style={{ flex: 1, flexBasis: 100 }} onClick={handleGoToEnd}>
                            End &gt;&gt;
                        </button>
                        <input
                            style={{ flex: 1, flexBasis: 100 }}
                            value={pagination.perPage}
                            onChange={handleSetPerPage}
                        />
                        <div style={{ flex: 10, flexBasis: 100 }}>
                            <textarea
                                disabled
                                style={{ width: '100%' }}
                                value={JSON.stringify(pagination, null, 4)}
                                rows={20}
                            />
                        </div>
                    </div>
                </>
            )}

            {/* <div style={{ display: "flex", alignItems: 'flex-start' }}>
        {
          applySort &&
          <div>
            <h1>Sorting</h1>
              <table width="300" style={{ marginBlockEnd: 15 }}>
                {
                  sort.length > 0 &&
                  <thead style={{ textAlign: "left" }}>
                    <tr>
                      <th>Column</th>
                      <th>Order</th>
                    </tr>
                  </thead>
                }
                {
                  sort.map(({ column, ...rest }) => {
                    return (
                      <tbody key={ column }>
                        <tr>
                          <td>{column}</td>
                          <td>
                            <select key={ column + "sort"} value={rest.direction + ""} onChange={(e) => changeSort(column, e.target.value as unknown as ESortDirection)}>
                              <option value="">Remove</option>
                              <option value={ESortDirection.ASC}>asc</option>
                              <option value={ESortDirection.DESC}>desc</option>
                            </select>
                          </td>
                        </tr>
                      </tbody>
                    )
                  })
                }
                </table>


                <select onChange={(e) => changeColumn(e.target.value)} value={column}>
                  <option>Select a column to Filter on</option>
                  {["id", "first_name", "last_name"].map((val) => <option key={val} value={val}>{val}</option>)}
                </select>
            </div>
        }

        {
          filters &&
            <div>
              <h1>Filters</h1>
              <button onClick={ handleApplyFilter }>Filter</button>
            </div>
        }
        </div> */}
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
