# Sizes

Component consumers can chose to use the components in the default size or depending on the context make the bigger or smaller depending on their target audience.\
Molecules allows component developers to preconfigure various sizes for each component that they think are well suited to the UI. Thus taking away the onus from the component consumer to manage them while still giving the ability to extend the styles.
Sizes allows a component developer to make dimensions extendible. Design properties are not allowed.

[**» Watch detailed explanation**](https://www.loom.com/share/2ccc3bdfbde645dbbd97b2d56687076b)

## References

## Personas

-   Component consumer
-   Component developer

### Component developer

-   As a component developer, I want to to define the layout props for my components in predefined configurations/
    Layout props such as: margins, paddings, borderWidth, fontSize, lineHeight, borderRadius.
-   As a component developer, I want to build my component with a default dimensions and sizes.
-   As a component developer, I want to enhance the ability of the components by accepting a `size` prop to use predefined dimensions and sizes.

### Component consumer

-   As a component consumer, I want to be able to overwrite the predefined configuration with inline styles.
-   As a component consumer, I want to be able to define my sizes for the [variants](./variants.md) I created.
-   As a component consumer, I want to use [design tokens](./design-tokens.md) to define the size properties.
-   As a component consumer, I want to be able to extend the component sizes.

## Implementation Details

```json
extendTheme({
"Button": {
"fontSize": 12,
"lineheight": 16,
"marginBottom": 8,

        "size": {
            "sm": {
                "fontSize": "fontSize.12",
                "lineheight": 12,
                "marginBottom": 4
            },
            "md": {},
            "lg": {
                "fontSize": 16,
                "lineheight": 20,
                "marginBottom": 12
            }
        },
        "variants": {
            "solid": {
                "size": {
                    "sm": {
                        "padding": "spacing.12",
                    },
                    "md": {
                        "padding": "spacing.16",
                    },
                    "lg": {
                        "padding": "fontSize.20",
                    }
                }
            },
            "rounded": {
                "size": {
                    "sm": {
                        "borderRadius": 8
                    },
                    "md": {
                        "borderRadius": 12
                    },
                    "lg": {
                        "borderRadius": 16
                    }
                }
            }
        }
    }

}
)
```
