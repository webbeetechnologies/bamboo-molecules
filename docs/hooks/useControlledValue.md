# useControlledValue

useControlledValue is a hook to normalize User Input.

[Video Explanation of useControlledValue](https://www.loom.com/share/4c845ab5121541e4b5b6dc189bbcea2b)

## Interface

```ts
interface UseControlledValueProps<T extends any> {
    value?: <T>;
    onChange?: (value: T) => void
}

type UseControlledValue = <T>(props: UseControlledValueProps<T>) => Required<UseControlledValueProps<T>>
```

## Component consumer

-   As a component consumer, I expect that if the user input value is undefined, I do not want to control the value.
-   As a component consumer, I expect that if the value is not undefined, I want to control the input value.
-   As a component consumer, I expect that if the user input value changes from undefined to a different value a warning is logged to the console.
-   As a component consumer, I expect that the hook exposes a normalized value and a normalized onChange function.
