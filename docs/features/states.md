# States

Most components have different states; hovered, focused, disabled, etc. Molecules provides a way for the component consumers to extend the predefined values to better suit their requirements.
States allows a component developer to make design extendible. Dimension properties are not allowed.

[**» Watch detailed explanation**](https://www.loom.com/share/3d7a27529c454484af0123ea756b5f37)

## Personas

-   Component consumer
-   Component developer

### Component developer

-   As a component developer, I want to define the theme for all the various states that my component can be in.\
    Example:
    -   disabled
    -   hover
    -   focus
    -   pressed

### Component consumer

-   As a component consumer, I expect that the states defined take preference over the default styles.
-   As a component consumer, I want to be able to overwrite the state styles with inline styles.
-   As a component consumer, I want to be able to define my states for the [variants](./variants.md) I created.
-   As a component consumer, I want to use [design tokens](./design-tokens.md) to define the state properties.
-   As a component consumer, I want to be able to extend the predefined component states.

## Implementation Details

```json
{
    "Button": {
        "color": "#000",
        "variants": {
            "solid": {
                "backgroundColor": "colors.primary",
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
