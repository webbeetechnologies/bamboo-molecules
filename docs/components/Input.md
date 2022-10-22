# Input

Input fields in bamboo, like other components, are super fast and extremely flexible.
After researching all the other component libraries out there that serve a half baked Input field, Bamboo developing performant and customized applications.

[**» Watch detailed explanation**](https://www.loom.com/share/fb960f3c21c34d18880b98d1b0b84f37)

## References

-   [React Native Paper](https://callstack.github.io/react-native-paper/text-input.html)\
    Paper elements implement the closest to the material design, and hence Bamboo takes inspiration from Paper.
-   [Native Base](https://docs.nativebase.io/next/input#page-title)\
    Native base has an elaborate implementation for Inputs with different variants, addons making it a good resource to take inspiration from. However, the implementation of Native base is optimal for a data heavy application.

## Personas

-   End user
-   Component consumer

## End user

-   As a user, I want to type into a input field.
-   As a user, I want that the feedback from the input field is instant.
-   As a user, I want to paste into an input field.
-   As a user, I want to be able to distinguish a required field from an optional field.
-   As a user, I want to see feedback from inputs on hover and focus.
-   As a user, I want to know if the field is disabled.

## Component consumer

-   As a developer, I want to change the keyboard type for input field. ([TextInput:keyboardType](https://reactnative.dev/docs/textinput#keyboardtype)).\
    **NOTE:** this doesn't handle type=number on the web;
-   As a developer, I want to mark a field as required.
-   As a developer, I want to mark a field as disabled.
-   As a developer, I want to display a valid/ invalid state for the input field.
-   As a developer, I want to supplement my input component with icons for my inputs styles of which are updated on hover/ focus/ disabled/ invalid/ valid states.
-   As a developer, I want that the icons are wrapped within the borders of the input field.
-   As a developer, I want to have predefined styled inputs with different variant options matching with specific platforms ios/ android.
-   As a developer, I want to build an input field with custom styles and custom variants.
-   As a developer, I want to use inputs in different predefined sizes.
-   As a developer, I want to customize certain inputs with inline styles.
-   As a developer, I expect that inline styles overwrite variants and state styles.
-   As a developer, I want to use design tokens in my custom styles.

## Variants

1. Outlined
2. Ghost
3. Underlined

## Implementation Details

-   Create a higher order component that allows to add left and/or right elements; [WithElements HOC](./HOC/WithElements.md)
-   A clean abstraction to derive `required` prop, add the required asterisk, and validate as necessary.

# Input Groups

Input groups allow you to attach different elements together to build a seamless contextful UI.

## Product Developer Stories

-   As a developer, I want to extend my user input fields to display addon buttons/ icons/ texts/ dropdowns or other input fields etc.
-   As a developer, I expect that the addons take the height of the tallest element.
-   As a developer, I want that all the items of an input group are attached.
-   As a developer, I want that only the elements on the far ends get a border radius (if any).

## Implementation Details

-   Create a higher order component that allows to add left and/or right addons; [WithAddons HOC](./HOC/WithAddons.md)
