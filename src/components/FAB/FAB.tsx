import { forwardRef, memo, useMemo } from 'react';
import type { TextProps, ViewStyle } from 'react-native';

import { useComponentStyles, useMolecules } from '../../hooks';
import { CallbackActionState, withActionState } from '../../hocs';
import type { SurfaceProps } from '../Surface';
import type { TouchableRippleProps } from '../TouchableRipple';
import type { IconProps, IconType } from '../Icon';
import type { ViewProps } from '@webbee/bamboo-atoms';

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
        iconProps?: Omit<IconProps, 'name' | 'type'>;
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
        containerProps?: Omit<SurfaceProps, 'style'>;
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
        variant?: 'primary' | 'secondary' | 'tertiary' | 'surface';
        /**
         * Elevation level
         * @default 2
         * */
        elevation?: SurfaceProps['elevation'];
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
        elevation = 3,
        containerProps,
        innerContainerStyle: innerContainerStyleProp = emptyObj,
        labelProps = emptyObj,
        stateLayerProps = emptyObj,
        hovered = false,
        style,
        testID,
        ...rest
    }: Props,
    ref: any,
) => {
    const { Surface, TouchableRipple, Icon, Text, View } = useMolecules();

    const componentStyles = useComponentStyles(
        'FAB',
        [
            style,
            {
                innerContainer: innerContainerStyleProp || {},
                icon: iconProps.style || {},
                label: labelProps.style || {},
                stateLayer: stateLayerProps.style || {},
            },
        ],
        {
            variant,
            size,
            states: {
                hovered,
            },
        },
    );

    const {
        containerStyle,
        innerContainerStyle,
        iconStyle,
        labelStyle,
        iconSize,
        stateLayerStyle,
    } = useMemo(() => {
        const {
            innerContainer,
            iconSize: _iconSize,
            icon,
            label: _label,
            stateLayer,
            ...restStyle
        } = componentStyles;

        return {
            containerStyle: restStyle,
            innerContainerStyle: innerContainer,
            iconStyle: icon,
            labelStyle: _label,
            iconSize: _iconSize,
            stateLayerStyle: stateLayer,
        };
    }, [componentStyles]);

    // TODO: abstract the stateLayer
    return (
        <Surface
            testID={testID ? `${testID}-container` : ''}
            {...containerProps}
            elevation={elevation}
            style={containerStyle}>
            <TouchableRipple testID={testID} {...rest} style={innerContainerStyle} ref={ref}>
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
                    <View
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
