# Dialogs/ Modals

A molecule dialog component is a pixel perfect representation of a popup with the platform specific guidelines.


## Explanation Video
-   [Explaining Dialog Component](https://www.loom.com/share/8591cbe03adb4918968411ce90d54bad)

## References
-   [M3 design guidelines](https://m3.material.io/components/dialogs/specs)
-   [React Native Paper Dialog](https://callstack.github.io/react-native-paper/dialog.html)

## Personas
-   End user
-   Component consumer


### User stories

-   As a user, I want to see a dialog with some content, maybe a small form, or for selections.
-   As a user, I want to see a dialog header/ title.
-   As a user, I want to be able to close the dialog.
-   As a user, I want to be able to close the dialog when I click outside the dialog.
-   As a user, I want to see action buttons in Text mode on a dialog.
-   As a user, I expect the dialog is animated into the screen.


### Component consumer stories
-   As a component consumer, I expect that the dialog follows platform specific design guidelines.
-   As a component consumer, I may not want to allow the user to close the dialog on clicking outside, implements an `isDismissable: boolean` prop.
-   As a component consumer, I want to add buttons to my dialog.
-   As a component consumer, I want to be able add an icon to the dialog.
-   As a component consumer, I want to consume a dialog header with predefined styles.
-   As a component consumer, I want to control when the dialog is open. Should have an `isOpen`.
-   As a component consumer, I want to tap into an `onDismiss` event when the dialog is dismissed.
-   As a component consumer, I want to enable/disable entry/exit animations.
-   As a component consumer, I want to extend the styles of the dialog components.
-   As a component consumer, I expect that internally, dialog implements `withElementGroup` to build a seamless experience with proper borders.
-   As a component consumer, I expect to be able to use the dialog component on all the platforms; iOS, android and web.
