import React from "react";
import { useMolecules } from "../../src/hooks";
import { mergeRefs } from "../../src/utils";

export const Popover = () => {
    const triggerRef = React.useRef(null);

    const [ closeOnScroll, setCloseOnScroll ] = React.useState(true);
    const { Button, Popover, Text, View } = useMolecules<any>();


    const trigger = React.useCallback(({ ref, ...props}: any) => {
        const x = mergeRefs([triggerRef, ref]);
        console.log({ buttonRef: x })
        return <Button ref={x} { ...props } style={{ backgroundColor: "red"}} children="Hello World"  color="green" />
    }, []);

    return (
        <>
            <Button children={`Close on scroll: ${JSON.stringify(closeOnScroll)}`} onPress={() => setCloseOnScroll((x) => !x)} />
            <Popover trigger={trigger} triggerRef={triggerRef} placement="top" shouldFlip closeOnScroll={closeOnScroll}>
                <View style={{ flexDirection: "column", backgroundColor: "blue" }}>
                    <Text style={{ fontSize: 24 }}>Create new app</Text>
                    <Text>Keep the name short!</Text>
                    <Text>Create</Text>
                </View>
            </Popover>
        </>
    )
}