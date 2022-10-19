import * as React from 'react';
import { ESortDirection, ITypedDataSourceState } from './DataSource';
import { RecordType } from './types';


export default function  RenderRecords(props: ITypedDataSourceState<RecordType>) {


  // @ts-ignore
  const {pages, pagination, records, sort = [], applySort, applyFilter, goToStart, goToEnd, goToNext, goToPrev, removeSort, ...rest } = props;

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
    applySort({ column, direction})
    selectColumn("");
  }

  const changeSort = (column: string, direction?: ESortDirection | "" ) => {
    if (direction === "") {
      removeSort({ column })
    } else {
      changeColumn(column, Number(direction))
    }
  }

  return (
    <>

        {
          pages && pagination && 
          <ul>
              {pages?.[pagination?.page - 1]?.map((worker) => (
                <Coworker worker={worker} key={worker.id} />
              ))}
          </ul>
        }

        {
          applySort &&
          <>
            <h1>Sorting</h1>
                {
                  sort.map(({ column, ...rest }) => {
                    return [
                      column,
                      " ",
                      <select key={ column + "sort"} value={rest.direction + ""} onChange={(e) => changeSort(column, e.target.value as unknown as ESortDirection)}>
                        <option value="">not Set</option>
                        <option value={ESortDirection.ASC}>asc</option>
                        <option value={ESortDirection.DESC}>desc</option>
                      </select>,
                      <br key="break" />
                    ]
                  })
                }
                <br/>
                <select onChange={(e) => changeColumn(e.target.value)} value={column}>
                  <option>Select a column to Filter on</option>
                  {["id", "first_name", "last_name"].map((val) => <option key={val} value={val}>{val}</option>)}
                </select>
            </>
        }

        {
          applyFilter &&
            <>
              <h1>Filters</h1>
              <button onClick={ applyFilter }>Filter</button>
            </>
        }

        {
          goToStart &&
            <>
              <h1>Paginate</h1>
              <button onClick={goToStart}>&lt;&lt; Start</button>
              <br />
              <button onClick={goToPrev}>&lt;Prev</button>
              <button onClick={goToNext}>Next &gt;</button>
              <br />
              <button onClick={goToEnd}>End &gt;&gt;</button>
            </>
        }
    </>
  );
}





const Coworker = (props: { worker: RecordType }) => {
  const worker = props.worker;
  return (
    <li>
      {worker.id} {worker.first_name} {worker.last_name}
    </li>
  );
};
