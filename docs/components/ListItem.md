# ListItem V1

ListItem is a relatively low level component with uses accross the component tree for display in various kinds of lists.
Rather than a single component; ListItem is a repository of different flavors that cater to different needs of an variety of list types.

## Flavours
- With checkbox
- With radio
- With icons
- With Avatars
- With description \
\
  and a random mix of any or all of the above.

## User Stories
- As a user I want that the ListItem follows the MaterialYou guidelines


## Developer Stories
- As a developer, I want to use a ListItem flavour of my choice to compose a list.
- As a developer I want to add elements to the right or left side of an item using [WithElements HOC](./HOC/WithElements.md)
- As a developer, I want to display checkboxes in checklist items.
- As a developer, I want to display radio buttons in radio button list items.
- As a developer, I want to add icons to lists items icons for better context.
- As a developer, I want to add Avatars to lists of users. 
- As a developer, I want to add more description about the item.

---
# ListItem V2

## Flavours
- With drag handle on left/right
- With Accordion


## Developer Stories
- As a developer, I want item selection is not triggered when I drag the item.
- As a developer, I do not want that item selection is triggered when I click on the accordion item.
