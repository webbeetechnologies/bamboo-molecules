# List Item

List items are composed components that differ in the context they present. List items can be different and a hybrid mix of flavours composed from other molecule components.

## Explanation Video

[Explaning Molecules ListItem component](https://www.loom.com/share/9ba558d9b9d2498da0434ff78f65a2a3)

## References

-   [Material List Item specs](https://m3.material.io/components/lists/specs)
-   [React Native Paper](https://callstack.github.io/react-native-paper/list-item.html)
-   [MUI](https://mui.com/material-ui/react-list/#selected-listitem)\
    MUI offers an array of examples of different flavours that a component consumer can compose.
-   [Native Base](https://mui.com/material-ui/react-list/#selected-listitem)

## Personas

1. End User
2. Component Consumer

## States

List items can be either of these [User States](../features/user-input-states) on user interaction

-   hovered
-   focused
-   pressed
-   disabled

### End User

1. As an end user, I want to a list item that can be selected.
2. As an end user, I want the items to interact when I move the over the item or press it.
3. As an end user, I expect to see a ripple when I click over the item.
4. As an end user, I want to see list of options with checkboxes or radios that present the selection.
5. As an end user, I want to see list of users have images or avatars.
6. As an end user, I want to see list of emails that show subject and an extract of the email.
7. As an end user, in a list of notifications, I want to see a notification message accompanied with an icon for a type of notification and number of times it occured.
8. As an end user, I want to be able to have the ability to swipe to perform different actions.

### Component Consumer

1. As a component consumer, I expect that the List item follows Material UI guidelines.
2. As a component consumer, I want to compose list items of different complex flavours
3. As a component consumer, I want to add descriptions to the list items.
4. As a component consumer, I want to add secondary actions to the list items.
5. As a component consumer, I want to add icons to the list items.
6. As a component consumer, I want to add text/ badges to the list items.
7. As a component consumer, I want to add switches to the list items.
8. As a component consumer, I want to show a ripple on an item that can be clicked.
9. As a component consumer, I want to change the state of the list item with code.\
   On keyboard, I want to set it to be focused.
10. As a component consumer, I expect that the left, right and the primary content (title/description) of the list items are correctly spaced out.
11. As a component consumer, I expect that ListItem implements the features defined in [User Input Fields](../features/user-input-fields.md)
12. As a component consumer, I expect that ListItem implements the features defined in [User Input States](../features/user-input-states.md)
    - disabled
    - hovered
    - focused
    - pressed

## Flavours

List item flavours are different variants that can coexist. ListItems in Molecules are extremely flexible, unopinionated and composible.

-   Selectable
-   Checkbox Item/ Radio Item
-   Icons
-   Images
-   Avatars
-   With Description
-   With Actions
-   Badges
-   Switches
