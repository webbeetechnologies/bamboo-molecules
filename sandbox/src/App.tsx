import { PortalProvider } from '@react-native-aria/overlays';
import * as React from 'react';
import { Button, Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
// import { Pressable, SafeAreaView, Text, View } from 'react-native';
// import { Popover } from "./Popover/Pop";
// import {  NestedPopover } from './Popover/NestedPop';
// import UsingArraySource from "./UsingArraySource";
// import UsingAsyncSource from './UsingAsyncDataSource';

import Popover from "./Popover/Popover";
import { mergeRefs } from './Popper/mergeRefs';
import { PopperContent } from './Popper/Popper';


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

    const triggerRef = React.useRef(null);
    const scrollRef = React.useRef(null);

    const [ closeOnScroll, setCloseOnScroll ] = React.useState(true);


  const trigger = React.useCallback(({ ref, ...props}: any) => {
    return <Pressable ref={ mergeRefs([triggerRef, ref])} style={{ backgroundColor: "red"}}><Button { ...props } title="Hello World"  color="green" /></Pressable>
  }, []);

    return (
      <SafeAreaView>
      <PortalProvider>
        <ScrollView ref={scrollRef}>
          <View style={{ height: 900 }}></View>
          <Button title={`Close on scroll: ${JSON.stringify(closeOnScroll)}`} onPress={() => setCloseOnScroll((x) => !x)} />
            <Popover scrollRef={scrollRef} trigger={trigger} triggerRef={triggerRef} placement="top" shouldFlip closeOnScroll={closeOnScroll}>
                <View style={{ flexDirection: "column", height: 1000, backgroundColor: "blue" }}>
                  <Text style={{ fontSize: 24 }}>Create new app</Text>
                  <Text>Keep the name short!</Text>
                  <Pressable><Text>Create</Text></Pressable>
                </View>
            </Popover>
          <View style={{ height: 900 }}></View>
        </ScrollView>
      </PortalProvider>
      </SafeAreaView>
    )

    // return (
    //     <>
    //         {/* <UsingArraySource /> */}
    //         <SafeAreaView>
    //             <View style={{ height: 500 }}></View>
    //             <Popover
    //     render={({ close, labelId, descriptionId }) => (
    //       <View style={{ flexDirection: "column"}}>
    //         <Text style={{ fontSize: 24 }} id={labelId}>Create new app</Text>
    //         <Text id={descriptionId}>Keep the name short!</Text>
    //         {/* <input placeholder="Name" /> */}
    //         <Pressable onPress={close}><Text>Create</Text></Pressable>
    //       </View>
    //     )}
    //   >
    //     <Pressable><Text>Click to open popover</Text></Pressable>
    //   </Popover>

    //   <NestedPopover
    //     render={({ close, labelId, descriptionId }) => (
    //       <>
    //         <Text style={{ fontSize: 24 }} id={labelId}>Create new app</Text>
    //         <Text id={descriptionId}>Keep the name short!</Text>
    //         {/* <input placeholder="Name" /> */}
    //         <NestedPopover
    //           render={({ close, labelId }) => (
    //             <View style={{ flexDirection: "column"}}>
    //               <Text style={{ fontSize: 24 }} id={labelId}>Description</Text>
    //               <input placeholder="" />
    //               <Pressable onPress={close}><Text>Close</Text></Pressable>
    //             </View>
    //           )}
    //         >
    //           <Pressable style={{ width: 200 }}><Text>More options...</Text></Pressable>
    //         </NestedPopover>
    //         <Pressable onPress={close}><Text>Create</Text></Pressable>
    //       </>
    //     )}
    //   >
    //     <Pressable style={{ width: 200 }}><Text>Click to open nested popover</Text></Pressable>
    //   </NestedPopover>
    //         </SafeAreaView>
    //         {/* <UsingAsyncSource /> */}
    //     </>
    // );
}