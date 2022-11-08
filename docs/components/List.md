# List

Lists are easily one of the most used components across the platforms.\
Menus, dropdowns, Drawers, Selects/Typeaheads are some of the simplest examples where this building block component comes into use.

## Explanation Video

[Explaning Molecules List component](https://www.loom.com/share/9ba558d9b9d2498da0434ff78f65a2a3)

## Personas

1. End User
2. Component Consumer

### End User

-   As a user I want to see my items records/optons a list.
-   As a user I want that the List follows the MaterialYou guidelines.
-   As a user I want to have smooth performance for 1000 list entries
-   As a user I want be able to scroll long lists.

### Component Consumer

-   As a component consumer I want to display items in a flat list or a grouped list.
-   As a component consumer I expect that the list component renders a virtualised list.
-   As a component consumer I want that this component exports the following components
    -   [FlatList](./FlatList.md)
    -   [SectionList](./SectionList.md)
    -   [SwipeList](./SwipeList.md)
    -   [ListItem](./ListItem.md)

## Implementation details

-   Use [FlashList](https://shopify.github.io/flash-list/) to render a highly performant flat list of items.

---

# ListItem

-   As a developer I want add elements to the left and/or right of the List item.
-   As a developer I want to be give the user ability to swipe left or right to reveal item actions.
-   As a developer I want use different/mixed flavors of list items: with checkbox, drag, icons, avatars.
-   As a developer I want compose different flavors of list items using [WithElements Interface](../interfaces/WithElementsInterface.md).
