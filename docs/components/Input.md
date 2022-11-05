# TextInput

TextInput fields in bamboo, like other components, are super fast and extremely flexible.

[**» Watch detailed explanation**](https://www.loom.com/share/9d674b33e65b46c09b6845da0cff884b)

## References

-   [Material Textfield Specs](https://m3.material.io/components/text-fields/specs)\
    Single most important resource to implement the default color schemes and pixel perfect design.
-   [Material Textfield Specs](https://m3.material.io/components/text-fields/guidelines)\
    Clear examples how a field should and should not behave.
-   [React Native Paper](https://callstack.github.io/react-native-paper/text-input.html)\
    Paper elements implement the closest to the material design, and hence Bamboo takes inspiration from Paper.
-   [Native Base](https://docs.nativebase.io/next/input#page-title)\
    Native base has an elaborate implementation for TextInputs with different variants, addons making it a good resource to take inspiration from. However, the implementation of Native base is not optimal for a data heavy application.

## Personas

-   End user
-   Component consumer

## End user

-   As a user, I want to type into a TextInput field.

## Component consumer

-   As a component consumer, I want to change the keyboard type for TextInput field. ([TextInput:keyboardType](https://reactnative.dev/docs/textinput#keyboardtype)).\
    **NOTE:** this doesn't handle type=number on the web;
-   As a component consumer, I want to supplement my TextInput component with icons/text.
-   As a component consumer, I want the supplementing components react to the state changes such as color change on disabled state etc.
-   As a component consumer, I want the icons are wrapped within the borders of the TextInput field.
-   As a component consumer, I want to have predefined styled TextInputs with different [variant options](../features/variants.md) matching with specific platforms ios and android.
-   As a component consumer, I want to build an TextInput field with custom styles and custom variants.
-   As a component consumer, I want to use TextInputs in different predefined [sizes](../features/sizes.md).
-   As a component consumer, I want to customize certain TextInputs with inline styles.
-   As a component consumer, I want to be able to design entirely redesign my input component.
-   As a component consumer, I want to use [design tokens](../features/design-tokens.md) in my custom styles.

## Variants

1. Outlined
2. Underlined

## Implementation Details

-   Implements [WithElements Interface](../interfaces/WithElementsInterface.md)
-   Implements the features defined in [User Input Fields](../features/user-input-fields.md)
-   Implements the following states as defined in [User Input States](../features/user-input-states.md)
    -   disabled
    -   hovered
    -   focused
    -   pressed
    -   error
