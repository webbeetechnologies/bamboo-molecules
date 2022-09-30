import * as React from 'react';
import axios from 'axios';
import { useSortableDataSource } from './DataSource/SortableDataSource';
import { useFilterableDataSource } from './DataSource/FilterableDataSource/FilterableDataSource';
import { useArrayDataSource } from './DataSource/useArrayDataSource';

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

export default function App({ coworkers = [] as string[] }) {
  const [workers, setWorkers] = React.useState(coworkers);

  // @ts-ignore
  const {records: results,  applySort, applyFilter, removeSort } = useArrayDataSource(workers, (...args) => {
    // @ts-ignore
    console.log(args[0].action, args);
    debugger;
    return []
  });


  React.useEffect(() => {
    applySort({ column: "test", direction: "asc" });
    removeSort({ column: "test", direction: "asc" });
    applyFilter({ key: { value:" ", operator: "" } });
  }, []);

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

  React.useEffect(() => {
    (async () => {
      const customers = await findAllCustomerData();
      setWorkers(customers as any[]);
    })();
  }, []);

  return (
    <>

    <ul>
      {workers.map((worker: any) => (
        <Coworker worker={worker} key={worker.id} />
      ))}
    </ul>
    {/* <button onClick={ sortSource.applySort }>Reverse</button>
    <button onClick={ searchSource.applySearch }>Reverse</button> */}
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
