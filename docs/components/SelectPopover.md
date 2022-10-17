# SelectPopover
A select popover displays a list of items in a popover. This is always related to a user click event on a trigger element.


## Definitions
- Trigger-able component\
Could be any component; icon, text, button, or any other item that can be interacted with.
- Click Feedback\
Platform specific feedback. Ripple in Material You and highlight on iOS;


## User Stories
- As a user, I want to click on a [trigger-able component](#Definitions) to open a popover.
- As a user, It is important to me that the trigger component displays a [click feedback](#Definitions).


## Developer Stories
- As a developer, I want to be flexible with the type of [SelectItem](./SelectItem.md) I want to display.
- As a developer, I want to use [DataSelectList](./DataSelectList.md) to render my list.
- As a developer, I want to use [WithPopover HOC](./HOC/WithPopover.md) to create the SelectPopover.
- As a developer, I want to control the selections made; manage the component state or have the `onChange` and `value` passed down to SelectPopover.