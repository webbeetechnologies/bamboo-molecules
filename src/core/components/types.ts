import type { ComponentType, ReactNode } from 'react';
import type { IComponentsProviderContext as IAtomsComponentsProviderContext } from '@webbee/bamboo-atoms';
import type {
    IconProps,
    IconButtonProps,
    ActivityIndicatorProps,
    TouchableRippleProps,
    HorizontalDividerProps,
    SurfaceProps,
    ButtonProps,
    SwitchProps,
    VerticalDividerProps,
    ListItemProps,
    Checkbox,
    FlatListProps,
} from '../../components';

export type ProvideComponentsProps = {
    components?: Partial<IComponentsProviderContext>;
    children: ReactNode;
};

export interface DefaultComponents {
    Icon: ComponentType<IconProps>;
    IconButton: ComponentType<IconButtonProps>;
    TouchableRipple: ComponentType<TouchableRippleProps>;
    ActivityIndicator: ComponentType<ActivityIndicatorProps>;
    HorizontalDivider: ComponentType<HorizontalDividerProps>;
    VerticalDivider: ComponentType<VerticalDividerProps>;
    Button: ComponentType<ButtonProps>;
    Surface: ComponentType<SurfaceProps>;
    Switch: ComponentType<SwitchProps>;
    ListItem: ComponentType<ListItemProps>;
    Checkbox: typeof Checkbox;
    FlatList: ComponentType<FlatListProps>;
}

export type IComponentsProviderContext = IAtomsComponentsProviderContext & DefaultComponents & {};
