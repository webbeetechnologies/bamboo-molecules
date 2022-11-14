import type { ViewProps } from '@webbee/bamboo-atoms';
import React, { ReactNode, useMemo, useRef } from 'react';
import { useMolecules } from '../../src/hooks';

const PopoverContent: React.FC<ViewProps & { message?: string | ReactNode }> = ({
    message,
    ...props
}) => {
    const { Text, H4, View } = useMolecules();

    const { wrapperStyles, h4Styles, textStyles } = useMemo(
        () => ({
            wrapperStyles: [{ flexDirection: 'column' as 'column' }, props.style],
            h4Styles: { marginBottom: 'spacings.3' },
            textStyles: { marginBottom: 'spacings.2' },
        }),
        [props.style],
    );

    return (
        <View {...props} style={wrapperStyles}>
            <H4 style={h4Styles}>
                Check the console, It should read Popover Content only when this message is
                displayed
            </H4>
            <Text style={textStyles}>Keep the name short!</Text>
            <Text>{message}</Text>
        </View>
    );
};

export const Popover = () => {
    const [closeOnScroll, setCloseOnScroll] = React.useState(true);
    const { Button, Popover, H4, View } = useMolecules();

    const trigger = React.useCallback(
        (message: string) => (props: any) => {
            return <Button {...props} children={message} variant="contained" />;
        },
        [Button],
    );

    const { content1Styles, content2Styles, content3Styles, wrapperStyles } = useMemo(
        () => ({
            wrapperStyles: {
                flexGrow: 1,
                flexDirection: 'row' as 'row',
                alignContent: 'space-between' as 'space-between',

                gap: 8,
            },
            content1Styles: { width: '300px' },
            content2Styles: { width: '200px' },
            content3Styles: { width: '500px' },
        }),
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
            <View style={wrapperStyles}>
                <Popover
                    showArrow
                    trigger={trigger('Button: 1')}
                    placement="top"
                    shouldFlip
                    closeOnScroll={closeOnScroll}>
                    <PopoverContent style={content1Styles} message="I'm only 300px wide" />
                </Popover>
                <Popover
                    showArrow
                    trigger={trigger('Button: 2')}
                    placement="top"
                    shouldFlip
                    closeOnScroll={closeOnScroll}>
                    <PopoverContent
                        style={content2Styles}
                        message="I'm only smaller than Button 1"
                    />
                </Popover>
                <Popover
                    showArrow
                    trigger={trigger('Button: 3')}
                    placement="top"
                    shouldFlip
                    closeOnScroll={closeOnScroll}>
                    <PopoverContent style={content3Styles} message="I'm only wider than Button 1" />
                </Popover>
                <Popover
                    showArrow
                    trigger={trigger('Button: 4')}
                    placement="top"
                    shouldFlip
                    closeOnScroll={closeOnScroll}>
                    <PopoverContent message={<H4>I'm free sized</H4>} />
                </Popover>
            </View>
        </View>
    );
};
