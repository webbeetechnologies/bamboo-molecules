import * as React from 'react';
import { ESortDirection, DataSourceResult } from './DataSource';
import { RecordType } from './types';


const RenderRecords: React.FC<DataSourceResult<RecordType>> = (props) => {
  const {pages, pagination, records, sort = [], applySort, filters, applyFilter, goToStart, goToEnd, goToNext, goToPrev, removeSort, ...rest } = props;

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


  const [column, selectColumn] = React.useState("");


  const changeColumn = (column: string, direction?: ESortDirection ) => {
    applySort?.({ column, direction})
    selectColumn("");
  }

  const changeSort = (column: string, direction?: ESortDirection | "" ) => {
    if (direction === "") {
      removeSort?.({ column })
    } else {
      changeColumn(column, Number(direction))
    }
  }

  const handleApplyFilter = (_e: React.SyntheticEvent) => {
    // {filterName: string, value: any, operator: EFilterOperator }
    // applyFilter?.()
  }

  const handleGoToStart = (_e: React.SyntheticEvent) => {
    goToStart?.()
  }

  const handleGoToPrev = (_e: React.SyntheticEvent) => {
    goToPrev?.()
  }

  const handleGoToNext = (_e: React.SyntheticEvent) => {
    goToNext?.()
  }

  const handleGoToEnd = (_e: React.SyntheticEvent) => {
    goToEnd?.()
  }

  // NOTE:: Don't judge the code below; it's meant to be a demo only :D

  return (
    <>

        {
          pages && pagination && (!props.isLoading || records.length > 0) &&
          <ul>
              {pages?.[pagination?.page - 1]?.map((worker) => (
                <Coworker worker={worker} key={worker.id} />
              ))}
          </ul>
        }

        {
          (props.isLoading && records.length <= 0) &&
          <h2>Loading...</h2>
        }


        {
          goToStart &&
            <>
              <h1>Paginate</h1>
              <div style={{ display: "flex" }}>
              <button onClick={handleGoToStart}>&lt;&lt; Start</button>
              <button onClick={handleGoToPrev}>&lt; Prev</button>
              <button onClick={handleGoToNext}>Next &gt;</button>
              <button onClick={handleGoToEnd}>End &gt;&gt;</button>
              </div>
            </>
        }

        <div style={{ display: "flex", alignItems: 'flex-start' }}>
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
        </div>
    </>
  );
}


export default RenderRecords;


const Coworker = (props: { worker: RecordType }) => {
  const worker = props.worker;
  return (
    <li>
      {worker.id} {worker.first_name} {worker.last_name}
    </li>
  );
};
