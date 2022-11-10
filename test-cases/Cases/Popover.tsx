import React, { useRef } from 'react';
import { useMolecules } from '../../src/hooks';
import { mergeRefs } from '../../src/utils';

const PopoverContent = () => {
    const { Text, View } = useMolecules();
    console.log('Popover Content', ':)');

    return (
        <View style={{ flexDirection: 'column' }}>
            <Text style={{ fontSize: 24 }}>
                Check the console, It should read Popover Content only when this message is
                displayed
            </Text>
            <Text>Keep the name short!</Text>
            <Text>Create</Text>
        </View>
    );
};

export const Popover = () => {
    const triggerRef = React.useRef(null);

    const [closeOnScroll, setCloseOnScroll] = React.useState(true);
    const { Button, Popover, View } = useMolecules();

    const trigger = React.useCallback(({ ref, ...props }: any) => {
        const mergedRef = mergeRefs([triggerRef, ref]);
        return <Button ref={mergedRef} {...props} children="Hello World" variant="contained" />;
    }, []);

    return (
        <View style={useRef({ flexDirection: 'row' as 'row' }).current}>
            <Button
                style={useRef({ marginRight: 'spacings.2' }).current}
                variant="contained"
                children={`Close on scroll: ${JSON.stringify(closeOnScroll)}`}
                onPress={() => setCloseOnScroll(x => !x)}
                size="lg"
            />
            <Popover
                showArrow
                trigger={trigger}
                triggerRef={triggerRef}
                placement="top"
                shouldFlip
                closeOnScroll={closeOnScroll}>
                <PopoverContent />
            </Popover>
        </View>
    );
};
