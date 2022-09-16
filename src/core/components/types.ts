import type { ComponentType } from 'react';
import type { IComponentsProviderContext as IAtomsComponentsProviderContext } from '@webbee/bamboo-atoms';
import type { IconProps } from '../../components';
import type { NoInfer } from '../../types';

export type IExtendComponentsTypes<T> = Omit<DefaultComponents, keyof NoInfer<T>> & NoInfer<T>;

export interface DefaultComponents {
    Icon: ComponentType<IconProps>;
}

export interface IComponentsProviderContext
    extends IAtomsComponentsProviderContext,
        DefaultComponents {}
