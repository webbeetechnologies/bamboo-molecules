import React from 'react';
import { ScrollView, Text, View } from "react-native";
import {useFloating, autoPlacement, shift} from '@floating-ui/react-native';


export function Popover() {
  const {x, y, reference, floating} = useFloating({
    placement: 'right',
    middleware: [autoPlacement(), shift({ crossAxis: true })],
  });

  console.log({ x,y, reference, floating})

  return (
    <ScrollView >
      <View style={ {height: 500 }} />
      <View ref={reference} style={{ marginTop: "auto" }}>
        <Text>Reference</Text>
      </View>
      <View style={ {height: 500 }} />

      <View
        ref={floating}
        style={{
          position: 'absolute',
          top: y ?? 0,
          left: x ?? 0,
        }}
      >
        <Text>Floating</Text>
      </View>
      <View style={ {height: 500 }} />

    </ScrollView>
  );

}