import * as React from 'react';
import axios from 'axios';
import { useSortableDataSource } from './DataSource/SortableDataSource';
import { useSearchableDataSource } from './DataSource/SearchableDataSource/SearchableDataSource';

function findAllCustomerData() {
  var baseURL = 'https://ktwjky3ybe.execute-api.us-east-1.amazonaws.com';
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

  const sortSource = useSortableDataSource({ records: workers as string[], setRecords: () => {}, sort: { }, searchKey: "test" });
  const searchSource = useSearchableDataSource({ ...sortSource, searchKey: "test", setRecords: () => {}, sort: { },  });

  React.useEffect(() => {
    (async () => {
      const customers = await findAllCustomerData();
      setWorkers(customers as any[]);
    })();
  }, []);

  return (
    <>

    <ul>
      {searchSource.records.map((worker: any) => (
        <Coworker worker={worker} key={worker.id} />
      ))}
    </ul>
    <button onClick={ sortSource.applySort }>Reverse</button>
    <button onClick={ searchSource.applySearch }>Reverse</button>
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
