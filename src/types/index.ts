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

export type ComponentStateStyles<T> = StyleProp<T> & {
    [key: string]: any; // to be able to define custom props
};

export type VariantStyles<T> = StyleProp<T> & {
    states: {
        [key: string]: ComponentStateStyles<T>;
    };
    [key: string]: any; // to be able to define custom props
};

export type ComponentStyles<T> = StyleProp<T> & {
    variants: {
        [key: string]: VariantStyles<T>;
    };
};
