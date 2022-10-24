# Design Tokens

Design tokens are constants declared down and shared throughout the application. They are user configurable and can be used as replacement for actual design properties.\
Molecules supports different kinds of design tokens for texts, colors, spacing and border style.

[**» Watch detailed explanation**](https://www.loom.com/share/034c027503d34829a20a619bac19051b)

## Available Tokens

1.  Colors\
    MD3 Color token properties.
2.  Typescale\
    predefined configurations for fontSizes, lineHeights, fontWeights
3.  FontWeight\
    Defines the font weight
4.  FontSize\
    Size token for the font size.
5.  LineHeight\
    Sizes for height of a line of text.
6.  Roundness\
    Defines the border radius properties
7.  Spacing\
    For use in place of margins and paddings.

## Component Developer

-   As a component developer, I want to allow the consumers to use tokens as values for tokens.
-   As a component developer, I want to ensure that the tokens never run into a circular loop.

## Component Consumer

-   As a component consumer, I want to have nested objects that implement properties which resolve into token values.

```json
    {
        "displayLarge": {
            ...regularType,
            "lineHeight": "lineHeight.16",
            "fontSize": "fontSize.14",
        },

    }
```
