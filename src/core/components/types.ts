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
    PopperProps,
    PresenceTransitionProps,
    OverlayProps,
    PopoverProps,
    BackdropProps,
    TransitionProps
} from '../../components';
import type { ViewProps } from 'react-native';

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
    Overlay: ComponentType<OverlayProps>,
    PresenceTransition: ComponentType<PresenceTransitionProps>,
    Transition: ComponentType<TransitionProps>,
    Backdrop: ComponentType<BackdropProps>,
    Popper: ComponentType<PopperProps>,
    Popover: ComponentType<PopoverProps>,
    PopperContent: ComponentType<ViewProps>,
}

export type IComponentsProviderContext = IAtomsComponentsProviderContext & DefaultComponents & {};
