# Cards

Molecule Cards are build on top of React Native Paper cards with under the hood performance optimizations, and re-implementing theming with latest platform guidelines.


## Explanation Video

## Personas
-   End User
-   Component Consumer
-   Component Developer

### End User
-   As a user, I expect to see content in cards that follow platform specific guidelines of my device.
-   As a user, I expect to see consistent titles and subtitles on all cards
-   As a user, I want to media cards to display the media end to end without whitespace.

### Component Consumer
-   As a component consumer, I want to be able to define how the card is laid out. `direction: ECardDirection.Horizontal | ECardDirection.Vertical`
-   As a component consumer, I want to use display images that are not contained in a white space.
-   As a component consumer, I expect that the cards are interactive; i.e. on clicking the card, The user should see touchable feedback.
-   As a component consumer, I want to have multiple content bodies in a card.
-   As a component consumer, I expect that internally, cards implements `withElementGroup` to build a seamless experience with proper borders.
-   As a component consumer, I may want to add horizontal | vertical dividers in the cards.
-   As a component consumer, I expect that the cards are responsive.
-   As a component consumer, I want to be able to nest cards.
-   As a component consumer, I want to extend the theme for the Card components

### Component Developer
-   As a component developer, I want to create a Card Title and Subtitle components for the consumers to create consistent design.
-   As a component developer, I want to make that only the first and last child in a card have a border radius.
-   As a component developer, I want to allow making horizontal or vertical card layouts.