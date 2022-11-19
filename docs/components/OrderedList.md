# OrderedList - Phase 2

Simply copy and improve on the functionality for ordered lists from 
https://github.com/xiqi/react-native-unordered-list/blob/master/index.tsx

## User Stories
- As a user, I want to see list of ordered items.

## Developer user stories
- As a component developer, I want to format the characters as per my desire


## Example
1. Item 1
2. Item 2
    1) Item 2.1
    2) Item 2.1
3. Item 3



## Implementation Details
- Accepts function to formatter function to generate the character string.


----
# OrderedList V2

## User Stories
- As a user, I want to see a list of ordered items with (capital/small) alphabet/roman numerals type.
- As a user, I want to see nested list in different characters.

## Developer user stories
- As a component developer, I want to format the characters as per my desire

## Example
i. Item 1
ii. Item 2
    a. Item 2.1
    b. Item 2.1
iii. Item 3
    A) Item 2.1
    B) Item 2.1



## Implementation Details
- Accepts an optional levels props with different formats [number, alphabet-upper, alphabet-lower, roman]