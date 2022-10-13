import type { ComponentPropsWithoutRef, ComponentType } from 'react';
import type { StyleProp } from 'react-native';

export type NoInfer<T> = [T][T extends any ? 0 : never];

export type DeepPartial<T> = T extends object
    ? {
          [P in keyof T]?: DeepPartial<T[P]>;
      }
    : T;

export type $Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export type $RemoveChildren<T extends ComponentType<any>> = $Omit<
    ComponentPropsWithoutRef<T>,
    'children'
>;

/*
 *  T stands for ComponentStyle type eg. ViewStyl
 *  C stands for Customer Properties
 *  S stands for ComponentStates
 * */
export type ComponentStyleProp<T, C = {}> = StyleProp<T> & C;

export type ComponentStylePropWithStates<T, S extends ComponentState, C = {}> = ComponentStyleProp<
    T,
    C
> & {
    states?: {
        [key in S]?: ComponentStyleProp<T, C>;
    };
};

export type ComponentStylePropWithVariants<
    T,
    S extends ComponentState = ComponentState,
    C = {},
> = ComponentStylePropWithStates<T, S, C> & {
    variants?: {
        [key: string]: ComponentStylePropWithStates<T, S, C>;
    };
};

export type ComponentState =
    | 'selected_disabled'
    | 'selected'
    | 'disabled'
    | 'hovered'
    | 'focused'
    | 'pressed'
    | string;
