import { forwardRef, memo, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import type { TextInputProps } from '../../../components';
import { useMolecules } from '../../../hooks';

const InlineInput = (
    {
        containerStyle: containerStyleProp,
        style,
        actionStateContainerProps: _actionStateContainerProps,
        ...rest
    }: TextInputProps,
    ref: any,
) => {
    const { TextInput } = useMolecules();

    const { actionStateContainerProps, inputStyle, containerStyle } = useMemo(() => {
        return {
            actionStateContainerProps: {
                ..._actionStateContainerProps,
                style: [styles.container, _actionStateContainerProps?.style],
            },
            inputStyle: [styles.input, style],
            containerStyle: [styles.innerContainer, containerStyleProp],
        };
    }, [_actionStateContainerProps, containerStyleProp, style]);

    return (
        <TextInput
            ref={ref}
            variant="plain"
            size="sm"
            style={inputStyle}
            containerStyle={containerStyle}
            actionStateContainerProps={actionStateContainerProps}
            autoFocus={true}
            {...rest}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxWidth: '100%',
    },
    innerContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    input: {
        height: '100%',
        paddingHorizontal: 0,
        maxWidth: '100%',
    },
});

export default memo(forwardRef(InlineInput));
