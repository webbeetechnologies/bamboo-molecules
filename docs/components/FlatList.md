# Flatlist

Wraps and expose [FlashList](https://shopify.github.io/flash-list/) as a Bamboo Components; Provided in the context.

## Personas

-   Component developer
-   Component consumer

### Component developer

-   As a component developer, I want to allow my consumers to pass data as an array.
-   As a component developer, I want to allow my component consumers to pass children that are rendered in a virtualized list.
-   As a component developer, I want to render only data in the virtualized list if data array is provided and ignore the children.

### Component consumer

-   As a component consumer, I expect that a FlatList implements and extends a virtualized FlashList to render the items
-   As a component consumer, I expect FlatList accepts `renderItem`, a pure function, to render a [ListItem](./ListItem.md) or any other ReactNode.
-   As a component consumer, I want to pass options as children and expect them to be rendered in the list.
-   As a component consumer, I may want to configure how an empty list is displayed using `renderEmptyList` pure function that returns a ReactNode.

## Interface

```ts
type FlatList = FlatListProps &
    (
        | { children?: ReactNode | ReactNode[] }
        | {
              data: T[];
              renderItem: (item: Option, onClick: () => {}, index: number) => ReactNode;
          }
    );
```

## Components Consumed

-   [Flat List](./FlatList.md)
