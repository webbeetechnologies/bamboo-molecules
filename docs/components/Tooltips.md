# Tooltips
Use Tooltips to share more context about actions that
- do not have a descriptive lables associated with them
- or simply require more information.

## User Stories
- As a user, I want to be able to move the cursor over IconButtons or truncated text to know more about it.
- As a developer, I want to provide more context (a small message) to the end user when he moves over links/ texts/icons/buttons.


## Implementation Details
- Implements [WithPopover HOC](./HOC/WithPopover.md)
- Exit animation for all tooltips is a fade out effect


## References:
- https://material.io/components/tooltips