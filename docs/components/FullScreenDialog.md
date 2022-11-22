# Full screen dialog
As the name suggests, this component displays a full screen dialog that can be used to display/ collect lots of information belonging to a specific context.
The component extends a dialog component in terms of functionality, but not in appearance.

## References
-   [M3 design guidelines](https://m3.material.io/components/dialogs/specs)

## Personas
-   End user
-   Component consumer

### End User

-   As a user, I want to see a **full screen dialog** on small and medium sized devices.
-   As a user, I expect to see a **popup dialog** in large screen devices.
-   As a user, I expect to use swipe gestures/ device specific back navigation to dismiss the dialog.
-   As a user, I want to see large amounts of data in a full screen dialog.
-   As a user, I want to always see a close button on a full screen dialog.
-   As a user, I expect to see a primary action button for a full screen dialog.

### Component consumer
-   As a component consumer, I expect that the full screen dialog follows platform specific guidelines.
-   As a component consumer, I expect that the component uses react-navigation.
-   As a component consumer, I expect the component internally uses the [AppBar](./Appbar.md) component for the header
-   As a component consumer, I want to be able to add a title to a full screen dialog.
-   As a component consumer, I want to control when the dialog is open. Should have an `isOpen`.
-   As a component consumer, I want to tap into an `onDismiss` event when the dialog is dismissed on clicking the close button.
-   As a component consumer, I want to add a custom primary action button to the app bar.