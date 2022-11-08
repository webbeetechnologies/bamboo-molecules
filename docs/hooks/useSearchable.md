# useSearchable

Some lists are searchable while some are not. useSearchable normalizes the behavior and returns TextInput field if the list is searchable.

[Video Explanation of useSearchable](https://www.loom.com/share/9c26702833cc4d56a70bf4a320503909)

## References

-   [Material Guidelines for Search](https://m3.material.io/components/text-fields/guidelines#51c13153-4236-4ec8-a1b4-a203c029bf13)

## Personas

-   End User
-   Component Consumer

### End User

-   As a user, I want to see a search field to filter the results.
-   As a user, I want that the list is filtered realtime.
-   As a user, I want to see a clear icon if I have typed something.
-   As a user, I want to see a search icon if the search field is blank.

### Component Consumer

-   As a component consumer, I want to control the search value.
-   As a component consumer, I want the ability to hide the search field.

## Interface

```ts
interface UseSearchableProps {
    searchable?: boolean;
    onQueryChange?: ({ search: string }) => void;
    query?: string;
    style?: StyleProp<TextInput>;
}
type UseSearchable = (props: UseSearchableProps) => TextInput;
```

## Implementation Details

-   hides the search input if searchable is false.
-   only shows the search input if onQueryChange is a function
-   implements [useControlledValue](./useControlledValue.md) hook
-   returns an text input or returns null

## Components consumed

-   TextInput
-   IconButton
