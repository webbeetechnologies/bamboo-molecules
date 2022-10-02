import type { ComponentType, ReactNode } from 'react';
import type { IComponentsProviderContext as IAtomsComponentsProviderContext } from '@webbee/bamboo-atoms';
import type {
    IconProps,
    ActivityIndicatorProps,
    TouchableRippleProps,
    DividerProps,
    SurfaceProps,
    ButtonProps,
    SwitchProps,
} from '../../components';

export type ProvideComponentsProps = {
    components?: Partial<IComponentsProviderContext>;
    children: ReactNode;
};

export interface DefaultComponents {
    Icon: ComponentType<IconProps>;
    TouchableRipple: ComponentType<TouchableRippleProps>;
    ActivityIndicator: ComponentType<ActivityIndicatorProps>;
    Divider: ComponentType<DividerProps>;
    Button: ComponentType<ButtonProps>;
    Surface: ComponentType<SurfaceProps>;
    Switch: ComponentType<SwitchProps>;
}

export type IComponentsProviderContext = IAtomsComponentsProviderContext & DefaultComponents & {};
