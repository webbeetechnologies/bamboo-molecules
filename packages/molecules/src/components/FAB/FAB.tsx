import { forwardRef, memo, useMemo } from 'react';
import { Text } from 'react-native';
import type { ViewProps, TextProps, ViewStyle } from 'react-native';

import type { MD3Elevation } from '../../types/theme';
import { CallbackActionState, withActionState } from '../../hocs';
import { Surface, type SurfaceProps } from '../Surface';
import { TouchableRipple, type TouchableRippleProps } from '../TouchableRipple';
import { Icon, type IconProps, type IconType } from '../Icon';
import { FABVariant } from './types';
import { resolveStateVariant } from '../../utils';
import { StateLayer } from '../StateLayer';
import { fabStyles } from './utils';

export type Props = Omit<TouchableRippleProps, 'children'> &
    CallbackActionState & {
        /**
         * name of the icon
         * */
        iconName: string;
        /**
         * type of the icon
         * */
        iconType?: IconType;
        /**
         * icon component's props
         * */
        iconProps?: Omit<IconProps, 'name' | 'type' | 'ref'>;
        /**
         * Label of the FAB, if provided the FAB will be on extended mode
         * */
        label?: string;
        /**
         * Props of the label
         * */
        labelProps?: Omit<Partial<TextProps>, 'children'>;
        /**
         * Props for the surface container
         * */
        containerProps?: Omit<SurfaceProps, 'style' | 'ref'>;
        /**
         * Props for the innner touchable container
         * */
        innerContainerStyle?: ViewStyle;
        /**
         * sizes of the FAB
         * @default 'md'
         * */
        size?: 'sm' | 'md' | 'lg';
        /**
         * variants of the FAB
         * */
        variant?: FABVariant;
        /**
         * Elevation level
         * @default 2
         * */
        elevation?: MD3Elevation;
        /**
         * Props for the state layer
         * */
        stateLayerProps?: ViewProps;
    };

const emptyObj = {};

const FAB = (
    {
        iconName,
        iconType,
        iconProps = emptyObj,
        label,
        variant = 'primary',
        size = 'md',
        elevation: elevationProp,
        containerProps,
        innerContainerStyle: innerContainerStyleProp = emptyObj,
        labelProps = emptyObj,
        stateLayerProps = emptyObj,
        hovered = false,
        disabled = false,
        onPress,
        style,
        testID,
        ...rest
    }: Props,
    ref: any,
) => {
    const elevation = useMemo(
        () => (elevationProp === undefined ? 3 : elevationProp),
        [elevationProp],
    );

    fabStyles.useVariants({
        variant,
        size,
        state: resolveStateVariant({
            disabled,
            hovered,
        }) as any,
    });

    const {
        containerStyle,
        innerContainerStyle,
        iconStyle,
        labelStyle,
        iconSize,
        stateLayerStyle,
    } = useMemo(() => {
        const { iconSize: _iconSize, ...restStyle } = fabStyles.root;

        return {
            containerStyle: [restStyle, style],
            innerContainerStyle: [fabStyles.innerContainer, innerContainerStyleProp],
            iconStyle: [fabStyles.icon, iconProps?.style],
            // @ts-ignore
            labelStyle: [fabStyles.label, labelProps?.style],
            iconSize: _iconSize,
            stateLayerStyle: [fabStyles.stateLayer, stateLayerProps?.style],
        };
    }, [
        iconProps?.style,
        innerContainerStyleProp,
        labelProps?.style,
        stateLayerProps?.style,
        style,
    ]);
    // TODO: abstract the stateLayer
    return (
        <Surface
            testID={testID ? `${testID}-container` : ''}
            {...containerProps}
            elevation={(disabled ? 0 : hovered ? elevation + 1 : elevation) as MD3Elevation}
            style={containerStyle}>
            <TouchableRipple
                testID={testID}
                {...rest}
                disabled={disabled}
                onPress={onPress}
                style={innerContainerStyle}
                ref={ref}>
                <>
                    <Icon
                        name={iconName}
                        type={iconType}
                        testID={testID ? `${testID}-icon` : ''}
                        {...iconProps}
                        size={iconSize}
                        style={iconStyle}
                    />
                    {label && (
                        <Text
                            selectable={false}
                            testID={testID ? `${testID}-label` : ''}
                            {...labelProps}
                            style={labelStyle}>
                            {label}
                        </Text>
                    )}
                    <StateLayer
                        testID={testID ? `${testID}-stateLayer` : ''}
                        {...stateLayerProps}
                        style={stateLayerStyle}
                    />
                </>
            </TouchableRipple>
        </Surface>
    );
};

export default memo(withActionState(forwardRef(FAB)));
