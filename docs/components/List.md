# List v1
A List is a presentational component which renders its children - SelectGroups and SelectItems.


## User stories
- As a user I want to see items in a list
- As a user I want to have smooth performance for 1000 list entries 
- As a user I want that the items can be grouped
- As a user I want that the List follows the MaterialYou guidelines


## Developer stories
- As a developer I want that this component exports the following components
  - List
  - Select
  - CheckboxSelectItem
- As a developer I want to add elements to the right or left side of an item using [WithElements HOC](./HOC/WithElements.md)
- As a developer I want to use 


## Implementation details
- Does FlatList cut it for 1000 elements? As far as I understand, it virtualizes under the hood

---
# List v2

## User stories
- As a user I want to reorder items in the list
- As a user I want a select item flavor that uses [TODO: Speak to Tobias]
