# SelectInput

A highly performant React native implementation of the HTML Select element.

[Video explaining Select Component in Bamboo Molecules](https://www.loom.com/share/2ceb74af295a41c9bf78cd7a2585fbf1)

## References

-   [Platform specific select](https://www.learnui.design/blog/ios-vs-android-app-ui-design-complete-guide.html#selection)
-   [TextField Menu Material Design](https://m3.material.io/components/menus/specs#14846245-f9f0-433f-8105-09f0515d86e4)

## Personas

-   End User
-   Component Consumer

### End User

-   As an end user, I expect to see a readonly [input field](./Input.md).
-   As an end user, I want to identify a select input field from a text input field\
    (expect to see a caret icon on the right)
-   As an end user, in the options list, I want to be able to distinguish between headers and available options.\
    Reference: Options and OptGroups in HTML.
-   As an end user, I expect that the list of options is not displayed on clicking a disabled Select input field.

### Component Consumer

-   As a component consumer, I want the ability to render grouped and/or flattened list of options (opt-groups with options or just options).
-   As a component consumer, I expect that the Select Input extends all the abilities of the [Text Input](./Input.md) component.
-   As a component consumer, I expect that the the Input is not editable.
-   As a component consumer, I want to be able to allow selection of multiple options with `multiple` boolean prop.
-   As a component consumer, I want to control how multiple selections are rendered.
-   As a component consumer, I want to configurable caret/chevron-down icon next to the select field.

## Interface

```ts
import type { DropdownListProps } from 'DropdownList';
import type { InputProps } from 'InputProps';
import type { WithElements } from 'WithElements';
type SelectProps = DropdownListProps & InputProps & WithElements;
```

## Implementation Details

-   Implements [Input](./Input.md)
-   Implements [DropdownList](./DropdownList.md)
-   Implements [WithElements Interface](../interfaces/WithElementsInterface.md)
-   Implements the features defined in [User Input Fields](../features/user-input-fields.md)
-   Implements the following states as defined in [User Input States](../features/user-input-states.md)
    -   disabled
    -   hovered
    -   focused
    -   pressed
    -   error

## Variants

1. Outlined
2. Underlined

## Components Consumed

-   [Input](./Input.md)
-   [IconButton](./IconButton.md)
-   [DropdownList](./DropdownList.md)
