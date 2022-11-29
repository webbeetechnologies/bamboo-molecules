# SelectList v1

A SelectList is a list of items of which one or many can be selected.

Check:

## User stories

-   As a user I want to see items in a list
-   As a user I want to have smooth performance for 1000 list entries
-   As a user I want that the items can be grouped
-   As a user I want to select a single item or multiple items
-   As a user I want to get different select styles depending on my expectations
-   As a user I want to have a SelectItem flavor with an icon to the left and on the right a checkbox + if enabled a drag handle
-   As a user I want the SelectList to be scrollable if not enough vertical space is available

## Developer stories

-   As a developer I want that this list consumes a [DataSource](../interfaces/DataSource.md)
-   As a developer I want to implement any number of SelectItem flavors
-   As a developer I want to add elements to the right or left side of an item using [WithElements Interface](../interfaces/WithElementsInterface.md)
-   As a developer I want to be updated about the change of selection.


## Implementation details

-   Does FlatList cut it for 1000 elements? As far as I understand, it virtualizes under the hood

## Minimum Viable Interface
```typescript
    interface ISelectList {
        multiple: boolean;
    }
```

# SelectList v2

## User stories

-   As a user I want to reorder items in the list
-   As a user I want a select item flavor that uses

## Developer stories

-   As a dev
