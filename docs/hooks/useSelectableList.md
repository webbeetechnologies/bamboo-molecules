# useSelectableList

Molecules exposes a highly performant memoized useSelectableList hook that can support large list of options. The hook returns a SectionList element.

[Video explaining useSelectableList](https://www.loom.com/share/42de0e5f4f814bd8ac8b851a01a633a7)

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
-   As a component consumer, I want to control how my options are rendered [see Rendering options](#implementation-details)]
-   As a component consumer, I want to pass options as children and expect them to be rendered in the list.\
    (Change/ click events in this case are handled by the component consumer.)

## Interface

```ts

    type UseSelectableListProps = {
        options: Options;
        multiple?: boolean;
        children?: ReactNode | ReactNode[];
        renderOptions?: (item: Option, onClick: () => {}, index: number) => ReactNode
    } & UseDataSourceProps;

    type UseSelectableList = (props: UseSelectableListProps) => SectionList

    type Options = <Option | OptionGroup>[];

    interface Option {
        value: string;
        label: string;
    };

    interface OptionGroup{
        label: string;
        children: Option[]
    };
```

## Implementation Details

-   Consumes `useDataSource` to manage the options.
-   Render options - `renderOptions` a pure function which returns a ListItem element.\
    rendered in React.Fragment which gets `key={item.value}` \
    **Params**: `item`, `onClick`, `index`\
    **default prop**, a function that returns a list item with the item.label\
    **onClick** doesn't accept any params; instead, it internally triggers an onChange event for the selected item value.
-   Returns a SectionList that can be used to render any of the following type of components.
    -   [Checkbox Group](./Checkbox.md#checkbox-group)
    -   [Radio Group](./Radio.md#radio-group)
    -   [SelectInput](./SelectInput.md)
    -   Maybe also [Chips List](./Chips.md#chips-list)

## Components Consumed

-   [Section List](./SectionList.md)
