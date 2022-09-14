# Inputs
- As a developer, I want to inject the base Input (React-native replacement) component.
- As a developer, I want to use change the keyboard type for input field. Reference [TextInput:keyboardType](https://reactnative.dev/docs/textinput#keyboardtype). NOTE: this doesn't handle type=number on the web;
- As a developer, I want to have elements on left or right of the input; Icons or other types of user inputs/checkbox/select/button
- As a user, I want to see feedback from inputs on hover and focus.
- As a user, I want to know that the field is disabled.
- As a developer, I want to mark a field as required.
- As a user, I want to be notified that a field is required field.
- As a developer, I want to have predefined styled inputs with different variant options matching with specific platforms ios/android

## Variants
1. Outlined
2. Ghost
3. Underlined

## Implementation Details
- Create a higher order component that allows to add left and/or right elements.
- Hooks to maintain hover, focus and disabled status OR use Pressable.
- A clean abstraction to derive `required` prop, add the required asterisk, and validate as necessary.
- Implement an abstraction for adding variants.