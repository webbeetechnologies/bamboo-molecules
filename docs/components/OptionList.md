# OptionList

Molecules exposes a highly performant memoized OptionList hook that can support large list of options. The hook returns a SectionList element.

[Video explaining OptionList](https://www.loom.com/share/42de0e5f4f814bd8ac8b851a01a633a7)

## Personas

-   End User
-   Component Consumer

### End User

-   As an end user, I expect that the items can be grouped.
-   As an end user, I want to be able to see large performant list of options.
-   As an end user, I want to see `"No options to display"` when there are no options to be displayed.

### Component Consumer

-   As a component consumer, I want to show a list of options or list of grouped options for user input.
-   As a component consumer, I want to be able to allow selection of multiple options with `multiple` boolean prop.
-   As a component consumer, I may not always want to pass the `renderOption` function and expect the component to use `item.label` for labels and `item.value` property for value in ListItem
-   As a component consumer, I expect OptionList to wrap a [SectionList](./SectionList.md).
-   As a component consumer, I expect the `renderItem` function extends the functionality of renderItem from SectionList and also adds an the `onClick` function to the arguments.

## Interface

```ts
import { Data, SectionData } from 'SectionList';
import type { UseSearchableProps } from 'useSearchable';
type OptionListProps = UseSearchableProps & UseDataSourceProps &
    SectionListProps & {
        onPress?: (item: Data) => void;
        renderItem?: (item: Data, index: number, onPress: () => void) => ReactNode;
    };
```

## Implementation Details

-   Returns a SectionList that can be used to create any of the following type of components.
    -   [Checkbox Group](./Checkbox.md#checkbox-group)
    -   [Radio Group](./Radio.md#radio-group)
    -   [SelectInput](./SelectInput.md)
    -   Maybe also [Chips List](./Chips.md#chips-list)
