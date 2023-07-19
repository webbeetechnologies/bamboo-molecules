import { memo, useMemo } from 'react';
import { TextInputProps, useMolecules } from '@bambooapp/bamboo-molecules';
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
        height: '100%',
    },
    innerContainer: {
        height: '100%',
        flexDirection: 'row',
    },
    input: {
        height: '100%',
        paddingHorizontal: 0,
    },
});

export default memo(InlineInput);
