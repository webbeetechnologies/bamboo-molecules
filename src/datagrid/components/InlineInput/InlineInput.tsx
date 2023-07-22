import { memo, useMemo } from 'react';
import type { TextInputProps } from '../../../components';
import { useMolecules } from '../../../hooks';
import { StyleSheet } from 'react-native';

const InlineInput = ({
    containerStyle: containerStyleProp,
    style,
    actionStateContainerProps: _actionStateContainerProps,
    ...rest
}: TextInputProps) => {
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

export default memo(InlineInput);
