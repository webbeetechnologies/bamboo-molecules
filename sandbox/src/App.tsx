import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { Popover } from './Popover';
// import UsingArraySource from "./UsingArraySource";
// import UsingAsyncSource from './UsingAsyncDataSource';


export default function App({ coworkers = [] as string[] }) {
  // const [workers, setWorkers] = React.useState(coworkers);


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

  // React.useEffect(() => {
  //   (async () => {
  //     const customers = await findAllCustomerData();
  //     setWorkers(customers as any[]);
  //   })();
  // }, []);



  return (
    <>
        {/* <UsingArraySource /> */}
        <SafeAreaView>
          <Popover />
        </SafeAreaView>
        {/* <UsingAsyncSource /> */}
    </>
  );
}