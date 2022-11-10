# Inputs

User inputs are an essential field for a user facing interface.

## Explanation Video
[Explaning Molecules Input component](https://www.loom.com/share/67004337c4cd484cbe90df3c013a8e1f)

## User Stories
- As a user, I want to know that the field is disabled.
- As a user, I want to be able to distinguish a required field from an optional field.
- As a user, I want to see feedback from inputs on hover and focus.
- As a user, I want to type in or paste values into the input field.

## Developer Stories
- As a developer, I want to inject the base Input (React-native replacement) component.
- As a developer, I want to change the keyboard type for input field. ([TextInput:keyboardType](https://reactnative.dev/docs/textinput#keyboardtype)).\
**NOTE:** this doesn't handle type=number on the web;
- As a developer, I want to mark a field as required.
- As a developer, I want to mark a field as disabled.
- As a developer, I want to display a valid/invalid state for the input field.
- As a developer, I want to supplement my input component with icons for my inputs styles of which are updated on hover/focus/disabled/invalid/valid states.
- As a developer, I want that the icons are wrapped within the borders of the input field.
- As a developer, I want to have predefined styled inputs with different variant options matching with specific platforms ios/android
- As a developer, I want to use inputs in different predefined sizes.

## Variants
1. Outlined
2. Ghost
3. Underlined


## Implementation Details
- Create a higher order component that allows to add left and/or right elements; [WithElements HOC](./HOC/WithElements.md)
- A clean abstraction to derive `required` prop, add the required asterisk, and validate as necessary.


--- 
# Input Groups

## Product Developer Stories
- As a developer, I want to extend my user input fields to display addon buttons/icons/texts/dropdowns etc.
- As a developer, I expect that the addons take the height of the tallest element.
- As a developer, I want that all the items of an input group are attached.
- As a developer, I want that only the elements on the far ends get a border radius (if any).

## Implementation Details
- Create a higher order component that allows to add left and/or right addons; [WithAddons HOC](./HOC/WithAddons.md)