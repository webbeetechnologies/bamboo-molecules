export type NoInfer<T> = [T][T extends any ? 0 : never];

export type DeepPartial<T> = T extends object
    ? {
          [P in keyof T]?: DeepPartial<T[P]>;
      }
    : T;
