# List v1

Lists are easily one of the most used components across the platforms.\
Menus, dropdowns, Drawers, Selects/Typeaheads are some of the simplest examples where this building block component comes into use.

## Explanation Video

[Explaning Molecules List component](https://www.loom.com/share/349f01909dfd4eeabb02635b8a87be99)

## User stories

-   As a user I want to see items in a list view.
-   As a user I want that the List follows the MaterialYou guidelines.
-   As a user I want to have smooth performance for 1000 list entries

## Developer stories

-   As a developer I want to display items in a flat list or a grouped list.
-   As a developer I want that this component exports the following components
    -   List
    -   ListItem

## Implementation details

-   Does FlatList cut it for 1000 elements? As far as I understand, it virtualizes under the hood

---

# ListItem

-   As a developer I want add elements to the left and/or right of the List item.
-   As a developer I want to be give the user ability to swipe left or right to reveal item actions.
-   As a developer I want use different/mixed flavors of list items: with checkbox, drag, icons, avatars.
-   As a developer I want compose different flavors of list items using [WithElements Interface](../interfaces/WithElementsInterface.md).

## Flavours

-   Orderable
-   Selectable
-   Checkbox Item
-   Icons
-   Avatars
-   With Description
-   With Actions
-   Collapsible Item
-   Badges

---

# List v2

## User stories

-   As a user I want to reorder items in the list
-   As a user I want a select item flavor that uses [TODO: Speak to Tobias]
