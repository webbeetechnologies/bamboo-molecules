import React from 'react';
import { Pressable, PressableProps, Text } from 'react-native';

const Backdrop: React.FC<PressableProps> = (props) => {
  //TODO: refactor for responsive prop
  console.log("Backdrop rendered");
  return (
    <Pressable
        style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgb(0, 0, 0)',
            opacity: 0.3
        }}
      accessible={false}
      importantForAccessibility="no"
      {...props}
    ><Text>Hello World</Text></Pressable>
  );
};

export default React.memo(Backdrop);
