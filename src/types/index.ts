import type { ComponentPropsWithoutRef, ComponentType } from 'react';

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
