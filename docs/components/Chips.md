# Chips
Chips can have different purposes, for example, they can be used to display suggestions or user inputs.


# Explanation Video
-   [Explaining Chip Component](https://www.loom.com/share/7808bee1e2bf4f018eeb8a0a1fddb98c)

## References
-   [Material 3 Chips](https://m3.material.io/components/chips/overview)
-   [Material 3 Chips States](https://m3.material.io/components/chips/specs#2a845552-8503-4bfe-8b61-8eaab1842bb4)
-   [React Native Paper](https://callstack.github.io/react-native-paper/chip.html)

## Personas
-   End User
-   Component consumer

## End User
-   As an end user, I expect to see rectangular chips for suggestions, selections, filters, etc.
-   As an end user, I want to be able to interact with the chips.
-   As an end user, I expect that the chips show a remove/edit or any action Icon to the right depending on the context.
-   As an end user, I expect to see one icon to the left of the chips depending on the context.
-   As an end user, I expect to see an avatar or image if the chip belongs to a user context or a logo if it belongs to a company.
-   As an end user, I expect to see a spinner if the chip triggers an action that takes a while to be completed.
-   As an end user, I expect that the labels are 20 characters or smaller.


### Component Consumer
-   As a component consumer, I want the chips to follow material design guidelines.
-   As a component consumer, I want to add icons on either side of the chip label. Implements [WithElements Interface](../interfaces/WithElementsInterface.md)
-   As a component consumer, I want to define use custom icons for the trailing/ leading icons.
-   As a component consumer, I expect that chips implements [User Input States](../features/user-input-states.md)\
    Chips Supports the following state when they are clickable.
    -   disabled
    -   hovered
    -   focused
    -   pressed
    -   dragged
-   As a component consumer, I expect that clicking on the icon doesn't trigger click on chip.
-   As a component consumer, I want the ability to extend the default variants.
-   As a component consumer, I want to see different sizes for the chips.
-   As a component consumer, I want to be able to add a dropdown menu to chips.
-   As a component consumer, I expect that the chips are either bordered or elevated



## Variants

1. Outlined
3. Elevated