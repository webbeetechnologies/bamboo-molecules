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

-   As a component consumer, I expect that DropdownList implements and extends [OptionList](./OptionList.md) component.
-   As a component consumer, I expect that DropdownList uses [WithPopover HOC](./HOC/WithPopover.md) to render popovers.
-   As a component consumer, I expect the features defined in [User Input Fields](../features/user-input-fields.md)
-   As a component consumer, I expect the following states for all the list items as defined in [User Input States](../features/user-input-states.md).

    -   disabled
    -   hovered
    -   focused
    -   pressed

-   As a component consumer, I want to define the trigger for displaying the dropdown menu.
-   As a component consumer, I want to be able to add list items to the menu as children of the menu component.\
    (Render List items as children of menu without passing options as an array.)
-   As a component consumer, I may want to control when the dropdown menu is open/closed.\
    Expect that the component implements [useControlledValue](../hooks/useControlledValue.md)
-   As a component consumer, I may want to be able pass an `onDropdownToggle` prop that accepts a function that is triggered open/close events.
-   As a component consumer, I want to define the default styles for the dropdown list.
-   As a component consumer, I expect that options are rendered a performant scrollable list by default `mode=DropdownListMode.auto` as:
    -   on wide screens (above 920px);
        popovers dropdowns for options.
    -   on small screens (less 920px);
        -   if less than **less than configured `optionsThreshhold`** options are available, display options in
            -   ios: bottom and centered action-sheets.
            -   android: popover.
        -   if count is **more than configured `optionsThreshhold`** display a scrollable list in modal with a back button.\
            (See References)
        -   if the count of options is flexible display a scrollable list in full screen modal with a back button.\
            (See References)
-   As a component consumer, I may want to control how the options are displayed on the small screens
    : "popover", "fullscreen", "actionsheet" or "auto".
-   As a component consumer, I may want to control how the options are displayed the options in a dialog on wider screens.

## Interface

```ts
import type { Option, OptionListProps } from 'OptionList';


enum DropdownListMode {
    auto,
    popover, // mobile only
    fullscreen, // mobile only
    actionsheet, // mobile only
    dialog, // large screen only
}

type DropdownListProps = OptionListProps & {
        mode: DropdownListMode;

        // optionsThreshhold: configuration to show maximum number of options in popover/actionsheet when mode == DropdownListMode.auto (default: 5).
        // on reaching threshold, switches to a full screen view in smaller devices.
        optionsThreshhold?: number;
        onDropdownToggle?: (isOpen?: boolean) => void;
        isOpen?: boolean;
    };
```
