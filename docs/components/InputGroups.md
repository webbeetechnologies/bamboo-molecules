# Input Groups

Input groups allow you to attach different elements together to build a seamless contextful UI.

## Personas

-   Component consumer

## Component consumer Stories

-   As a component consumer, I want to extend my user input fields to display addon buttons/ icons/ texts/ dropdowns or other input fields etc.
-   As a component consumer, I expect that the addons take the height of the tallest element.
-   As a component consumer, I want that all the items of an input group are attached.
-   As a component consumer, I want that only the elements on the far ends get a border radius (if any).

## Implementation Details

-   Create a higher order component that allows to add left and/or right addons; [WithAddons HOC](./HOC/WithAddons.md)
