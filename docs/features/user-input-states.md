# User Input States

The document is aimed to be a common reference for [states](./states.md) in user inputs. It's not intended to be an interface/type instead just a common reference :)\
Individual components will define the states they use in the component to and can extend the following list of states.

[Video Explanation for User Input States](https://www.loom.com/share/0be1911cc7e24a669a74d76635318e6e)

## Definitions

-   Interaction elements\
    Elements that can trigger an interaction. Could be buttons, text fields, checkboxes or even elements like ListItems
-   Interaction Events\
    Events that are triggered by mouse/tap events.
-   Interaction Key\
    Keyboard inputs that can trigger an Interaction Event. (example, spacebar/ enter/ return)

## States

While most states apply to all the components, some are component specific and some others are not applied to specific components.
Components can define what states they subscribe to.

-   **disabled**\
    When a user cannot perform any action on the user input field. User interaction events are not triggered.\
    All of user interaction elements can be in the disabled state.
-   **hovered**\
    On the web, when a user moves the cursor on the field.\
    All of user interaction elements can be in the hovered state.
-   **focused**\
    When the field is brought into focus by clicking it or on the web by pressing the tab key on the keyboard.\
    All of user interaction elements can be in the focused state.
-   **pressed**\
    When the field is clicked or activated by pressing the interaction key.\
    All of user interaction elements can be in the pressed state.\
    Some of the user interaction elements will also have support for ripples when they they have user interactions enabled.
-   **error**
    For when the input field has an error.\
    Fields that require user input in the form of a value can be in the error state.
-   **checked**\
    For radios, switches, and checkboxes; when they are selected.
-   **unchecked**\
    For Radios, switches, and checkboxes; when they are deselected.
-   **indeterminate**\
    For checkboxes when the value is not determineable.

## Personas

-   End User
-   Component Consumer

### End User

-   As a user, I want to identify a disabled field from field that is not disabled.
-   As a user, I want to see a [feedback](./states.md) on interacting with an element that I can interact with on hover, focus and pressed events.
-   As a user, I want identify a field that has an error.

### Component Consumer

-   As a component consumer, I want to define the styles for the different component states.
-   As a component consumer, I want to define the various [states](../features/states.md) such as hover / focus / disabled.
