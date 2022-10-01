import * as React from 'react';
import axios from 'axios';
import { useSortableDataSource } from './DataSource/SortableDataSource';
import { useFilterableDataSource } from './DataSource/FilterableDataSource/FilterableDataSource';
import { useArrayDataSource } from './DataSource/useArrayDataSource/useArrayDataSource';
import {ESortDirection} from "./DataSource";

function findAllCustomerData() {
  const baseURL = 'https://ktwjky3ybe.execute-api.us-east-1.amazonaws.com';
  return new Promise(function (resolve, reject) {
    axios
      .post('customers', {}, { baseURL: baseURL })
      .then(function (result: any) {
        var dataPromises = result.data.customerIds.map(function (customerId: any) {
          return axios.get('customers/' + customerId, { baseURL: baseURL });
        });

        Promise.all(dataPromises)
          .then(function (res) {
            resolve(
              res.map(function (result) {
                return result.data;
              })
            );
          })
          .catch(function (err) {
            reject(err);
          });
      })
      .catch(function (err: any) {
        console.log('fails', err.toString());
        reject(err);
      });
  });
}

export default function RenderRecords(props: any) {


  // @ts-ignore
  const {records, applySort, applyFilter, goToStart, goToEnd, goToNext, goToPrev, removeSort, ...rest } = props;

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



    const sortFirstName = React.useCallback(() => {applySort({ column: "first_name", direction: Number(window.prompt("Enter direction: 1|0")) })}, []);
    const sortLastName = React.useCallback(() => {applySort({ column: "last_name", direction: Number(window.prompt("Enter direction: 1|0")) })}, []);
    const removeSortHandled = React.useCallback(() => {removeSort({column: Number(window.prompt("Enter a column: 0 for first_name and 1 for last name")) === 0 ? "first_name" : "last_name"})}, []);

  return (
    <>
        <ul>
            {records.map((worker: any) => (
              <Coworker worker={worker} key={worker.id} />
            ))}
        </ul>

        <h1>Sorting</h1>
        {
            applySort &&
            <>
                <button onClick={ sortFirstName }>Sort By first name</button>
                <button onClick={ sortLastName }>Sort By last name </button>
                {/*<button onClick={ sortAsc }>sortAsc</button>*/}
                {/*<button onClick={ sortDesc }>sortDesc</button>*/}
                <button onClick={ removeSortHandled }>Remove Sort</button>
            </>
        }

        <h1>Filters</h1>
        {
            applyFilter &&
            <button onClick={ applyFilter }>Filter</button>
        }

        <h1>Paginate</h1>
        {
            goToStart &&
            <>
                <button onClick={goToStart}>Start</button>
                <button onClick={goToEnd}>End</button>
                <button onClick={goToNext}>Next</button>
                <button onClick={goToPrev}>Prev</button>
            </>
        }
    </>
  );
}





const Coworker = (props: any) => {
  const worker = props.worker;
  return (
    <li>
      {worker.first_name} {worker.last_name}
    </li>
  );
};
