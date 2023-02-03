import type { ViewProps } from '@bambooapp/bamboo-atoms';
import React, { forwardRef, ReactNode, useMemo, useRef } from 'react';
import type { ButtonProps } from '../../src/components';
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

const trigger = (message: string) => (args: any) => {
    return <Button {...args} children={message} variant="contained" />;
};

const Button = forwardRef<any, ButtonProps>((props, ref) => {
    const { Button: ButtonComponent } = useMolecules();
    return <ButtonComponent {...props} ref={ref} />;
});

export const Popover = () => {
    const [isPopoverOpen, setIsOpen] = React.useState(false);
    const [closeOnScroll, setCloseOnScroll] = React.useState(true);
    const { Button: ButtonComponent, Popover: PopoverComponent, H4, View } = useMolecules();

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
            <ButtonComponent
                style={useRef({ marginRight: 'spacings.2' }).current}
                variant="contained"
                children={`Close on scroll: ${JSON.stringify(closeOnScroll)}`}
                onPress={() => setCloseOnScroll(x => !x)}
                size="lg"
            />
            <View style={wrapperStyles}>
                <PopoverComponent
                    showArrow
                    trigger={useMemo(() => trigger('Button: 1'), [])}
                    placement="top"
                    shouldFlip
                    closeOnScroll={closeOnScroll}>
                    <PopoverContent style={content1Styles} message="I'm only 300px wide" />
                </PopoverComponent>
                <PopoverComponent
                    showArrow
                    trigger={useMemo(() => trigger('Button: 2'), [])}
                    placement="top"
                    shouldFlip
                    closeOnScroll={closeOnScroll}>
                    <PopoverContent
                        style={content2Styles}
                        message="I'm only smaller than Button 1"
                    />
                </PopoverComponent>
                <PopoverComponent
                    showArrow
                    trigger={useMemo(() => trigger('Button: 3'), [])}
                    placement="top"
                    shouldFlip
                    closeOnScroll={closeOnScroll}>
                    <PopoverContent style={content3Styles} message="I'm only wider than Button 1" />
                </PopoverComponent>
                <PopoverComponent
                    showArrow
                    trigger={useMemo(() => trigger('Button: 4'), [])}
                    placement="top"
                    shouldFlip
                    closeOnScroll={closeOnScroll}>
                    <PopoverContent message={<H4>I'm free sized</H4>} />
                </PopoverComponent>
                <PopoverComponent
                    showArrow
                    isOpen={isPopoverOpen}
                    trigger={useMemo(() => trigger('Controlled Popover'), [])}
                    setIsOpen={setIsOpen}
                    placement="top"
                    shouldFlip
                    closeOnScroll={closeOnScroll}>
                    <PopoverContent
                        message={
                            <H4>I'm a controlled Popover. My parent component controls me.</H4>
                        }
                    />
                </PopoverComponent>
            </View>
        </View>
    );
};
