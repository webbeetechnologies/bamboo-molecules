import { forwardRef, memo } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { useComponentStyles, useMolecules } from '../../hooks';
import { CallbackActionState, withActionState } from '../../hocs';
import type { TouchableRippleProps } from '../TouchableRipple';
import type { IconProps, IconType } from '../Icon';

export type Props = Omit<TouchableRippleProps, 'children' | 'disabled'> &
    CallbackActionState & {
        label?: string;
        iconName: string;
        iconType?: IconType;
        iconProps?: Omit<IconProps, 'name' | 'type'>;
    };

const NavigationRailItem = memo(
    withActionState(
        forwardRef(
            (
                {
                    iconName,
                    iconType,
                    iconProps = {},
                    style,
                    label,
                    hovered = false,
                    ...rest
                }: Props,
                ref: any,
            ) => {
                const { Icon, TouchableRipple, Text } = useMolecules();
                const componentStyles = useComponentStyles('NavigationRail_Item', style, {
                    states: {
                        hovered,
                    },
                });

                return (
                    <TouchableWithoutFeedback style={componentStyles}>
                        <TouchableRipple {...rest} ref={ref}>
                            <>
                                <Icon {...iconProps} name={iconName} type={iconType} />
                            </>
                        </TouchableRipple>
                        <>{label && <Text>label</Text>}</>
                    </TouchableWithoutFeedback>
                );
            },
        ),
    ),
);

NavigationRailItem.displayName = 'NavigationRail_Item';

export default NavigationRailItem;
