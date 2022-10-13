import type { ComponentType, ReactNode } from 'react';
import type { IComponentsProviderContext as IAtomsComponentsProviderContext } from '@webbee/bamboo-atoms';
import type {
    IconProps,
    ActivityIndicatorProps,
    TouchableRippleProps,
    HorizontalDividerProps,
    SurfaceProps,
    ButtonProps,
    SwitchProps,
    VerticalDividerProps,
} from '../../components';

export type ProvideComponentsProps = {
    components?: Partial<IComponentsProviderContext>;
    children: ReactNode;
};

export interface DefaultComponents {
    Icon: ComponentType<IconProps>;
    TouchableRipple: ComponentType<TouchableRippleProps>;
    ActivityIndicator: ComponentType<ActivityIndicatorProps>;
    HorizontalDivider: ComponentType<HorizontalDividerProps>;
    VerticalDivider: ComponentType<VerticalDividerProps>;
    Button: ComponentType<ButtonProps>;
    Surface: ComponentType<SurfaceProps>;
    Switch: ComponentType<SwitchProps>;
}

export type IComponentsProviderContext = IAtomsComponentsProviderContext & DefaultComponents & {};
