# DropdownList

A dropdown menu is refered to as a dropdown list component.
Dropdown list can be attached to a wide variety of interactible elements. It could also be used to display a custom context menu in the web.

[Video Explanation of Dropdown List](https://www.loom.com/share/b129cb5693b24991b9e450b34e4a72ad)

# References

-   [Material Design Menu](https://m3.material.io/components/menus/specs)

# Personas

-   End User
-   Component Consumer

### End User

-   As an end user, I expect to see a floating list of options as dropdown menu on trigger elements such as buttons/ text fields/ icon buttons.
-   As an end user, When open, I expect the dropdown menu is positioned next to the trigger element.
-   As an end user, On clicking outside the menu, I expect it to be closed.

### Component Consumer

-   As a component consumer, I want to define the trigger for displaying the dropdown menu.
-   As a component consumer, I want to be able to add list items to the menu as children of the menu component.\
    (Render List items as children of menu without passing options as an array.)
-   As a component consumer, I want to control when the dropdown menu is open/closed.
-   As a component consumer, I want to be able to listen to the dropdown menu open/close events.
-   As a component consumer, I want to define the default styles for the dropdown list.

## Interface

```ts
    import type { Option, UseSelectableListProps } from "useSelectableList";
    import type { UseSearchableProps } from "useSearchable";
    type DropdownListProps = UseSearchableProps & UseSelectableListProps {
        options: Options;
        onMenuToggle?: (isOpen?: boolean) => void;
        children?: ReactNode | ReactNode[];
        isOpen?: boolean;
    }
```

## Implementation Details

-   Implements [useControlledValue](../hooks/useControlledValue.md)
-   Implements [Popover HOC](./HOC/WithPopover.md)
-   Implements [useSelectableList](../hooks/useSelectableList.md)
-   Implements [useSearchable](../hooks/useSearchable.md)
-   Implements the features defined in [User Input Fields](../features/user-input-fields.md)
-   Implements the following states for all the list items as defined in [User Input States](../features/user-input-states.md).
    -   disabled
    -   hovered
    -   focused
    -   pressed
