import * as React from 'react';
import axios from 'axios';
import { useAsyncDataSource } from './DataSource/useAsyncDataSource/useAsyncDataSource';
import RenderRecords from "./RenderRecords";

function findAllCustomerData<T>() {
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
                return result.data as T[];
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

export default function UsingAsyncSource({ coworkers = [] as string[] }) {
  const [workers, setWorkers] = React.useState([] as string[]);

  // @ts-ignore
  const {records, loadResults, applySort, applyFilter, goToStart, goToEnd, goToNext, goToPrev, removeSort, ...rest } = useAsyncDataSource({ records: workers, sort: [] }, async ({ records, ...args }) => {
    if (records.length === 0)  {
        // @ts-ignore
        records = await findAllCustomerData<T>();
    }
    
    return records;
  });

  React.useEffect(() => loadResults(), []);


  return (
    <RenderRecords {...{
        records, applySort, applyFilter, goToStart, goToEnd, goToNext, goToPrev, removeSort, ...rest
    }} />
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
