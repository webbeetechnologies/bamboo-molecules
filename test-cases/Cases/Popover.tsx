import type { ViewProps } from '@webbee/bamboo-atoms';
import React, { ReactNode, useRef } from 'react';
import { useMolecules } from '../../src/hooks';
import { mergeRefs } from '../../src/utils';

const PopoverContent: React.FC<ViewProps & { message?: string | ReactNode }> = ({
    message,
    ...props
}) => {
    const { Text, H4, View } = useMolecules();
    console.log('Popover Content', ':)');

    return (
        <View {...props} style={[{ flexDirection: 'column' }, props.style]}>
            <H4 style={{ marginBottom: 'spacings.3' }}>
                Check the console, It should read Popover Content only when this message is
                displayed
            </H4>
            <Text style={{ marginBottom: 'spacings.2' }}>Keep the name short!</Text>
            <Text>{message}</Text>
        </View>
    );
};

export const Popover = () => {
    const triggerRef = React.useRef(null);

    const [closeOnScroll, setCloseOnScroll] = React.useState(true);
    const { Button, Popover, H4, View } = useMolecules();

    const trigger = React.useCallback(
        (message: string) =>
            ({ ref, ...props }: any) => {
                const mergedRef = mergeRefs([triggerRef, ref]);
                return <Button ref={mergedRef} {...props} children={message} variant="contained" />;
            },
        [],
    );

    return (
        <View style={useRef({ flexDirection: 'row' as 'row' }).current}>
            <Button
                style={useRef({ marginRight: 'spacings.2' }).current}
                variant="contained"
                children={`Close on scroll: ${JSON.stringify(closeOnScroll)}`}
                onPress={() => setCloseOnScroll(x => !x)}
                size="lg"
            />
            <View
                style={{
                    flexGrow: 1,
                    flexDirection: 'row',
                    alignContent: 'space-between',

                    // @ts-ignore
                    gap: 8,
                }}>
                <Popover
                    showArrow
                    trigger={trigger('Button: 1')}
                    triggerRef={triggerRef}
                    placement="top"
                    shouldFlip
                    closeOnScroll={closeOnScroll}>
                    <PopoverContent style={{ width: '300px' }} message="I'm only 300px wide" />
                </Popover>
                <Popover
                    showArrow
                    trigger={trigger('Button: 2')}
                    triggerRef={triggerRef}
                    placement="top"
                    shouldFlip
                    closeOnScroll={closeOnScroll}>
                    <PopoverContent
                        style={{ width: '200px' }}
                        message="I'm only smaller than Button 1"
                    />
                </Popover>
                <Popover
                    showArrow
                    trigger={trigger('Button: 3')}
                    triggerRef={triggerRef}
                    placement="top"
                    shouldFlip
                    closeOnScroll={closeOnScroll}>
                    <PopoverContent
                        style={{ width: '500px' }}
                        message="I'm only wider than Button 1"
                    />
                </Popover>
                <Popover
                    showArrow
                    trigger={trigger('Button: 4')}
                    triggerRef={triggerRef}
                    placement="top"
                    shouldFlip
                    closeOnScroll={closeOnScroll}>
                    <PopoverContent message={<H4>I'm free sized</H4>} />
                </Popover>
            </View>
        </View>
    );
};
