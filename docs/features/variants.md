# Variants

Component consumers like to see options, the more the better. Component variants allow a developer to make aesthetically styled variants of components.
Sizes allows a component developer to make design and dimensions extendible.

[**» Watch detailed explanation**](https://www.loom.com/share/dcd867ab9a0b4b9f99b83c0b17cac99c)

## Personas

-   Component consumer
-   Component developer

### Component developer

-   As a component developer, I want to define the different variants for some of my components.\
    Example:
    -   Buttons (outlined/ solid/ rounded)
    -   Chips (outlined/ solid/ rounded)
    -   Inputs (outlined/ underlined)
-   As a component developer, I want to define some common default styles for all the components.
-   As a component developer, I want to replace the default styles for the components with different variants.
-   As a component developer, I want to define different [states](./states.md) and [sizes](./sizes.md) for each of my variant.

### Component consumer

-   As a component consumer, I want to create my own variants.
-   As a component consumer, I want to extend existing variants.
-   As a component consumer, I want to use existing variants in my components/product.
-   As a component consumer, I want to be able to overwrite the variant with inline styles.
-   As a component consumer, I want to use [design tokens](./design-tokens.md) to define the variant properties.

## Implementation Details

```json
{
    "Button": {
        "color": "#000",
        "fontSize": "fontSizes.12",
        "margin": "spacing.3",
        "variants": {
            "solid": {
                "backgroundColor": "colors.primary",
                "size": {
                    "sm": {
                        "fontSize": 8,
                        "margin": 8
                    },
                    "md": {},
                    "lg": {
                        "fontSize": 16,
                        "margin": 16
                    }
                },
                "state": {
                    "disabled": {
                        "color": "#444",
                        "backgroundColor": "#fdd"
                    },
                    "hovered": {
                        "backgroundColor": "colors.primary50"
                    },
                    "focused": {
                        "backgroundColor": "colors.primary80"
                    }
                }
            },
            "outline": {
                "borderWidth": 1,
                "borderColor": "colors.primary",
                "color": "colors.primary",
                "state": {
                    "disabled": {
                        "color": "#444",
                        "borderColor": "#fdd"
                    },
                    "hovered": {
                        "borderColor": "colors.primary50"
                    },
                    "focused": {
                        "borderColor": "colors.primary80"
                    }
                }
            }
        }
    }
}
```
