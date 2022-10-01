# Design
Built upon Bamboo Atoms; they are already themable. The molecules are written with the specific guidelines from the platform this library supports.
Material components deeply follow M3 design philosophy and Cupertino heavily relies on the iOS style guide.


Molecules aims to closely mimic not just the ui of the components, but also interactions and transitions. It tries to be create a pixel perfect interface with a chance to enhance and extend the design externally at a granualar level.



## Variants
Elements can have different styles, and we support the most common ones out of the box.
Some examples of elements that have a more than one variant.
- Inputs
- Select
- Buttons
- Icon Buttons
- Chips


### Component Developer User Stories
- As a component developer, I want to define my own variants.
- As a component developer, I want to extend/replace existing variants of a component.



## Design Tokens
Molecules implements takes inspiration from Material You design tokens. However, this does however have it's own limitations.\
Molecules extends Material You design tokens to enable spacing (margins, paddings) and roundness; here is the exhaustive list of available design tokens.
- Colors
- Spacing
- Typography
- Border Radius
- Elevation


### Component Developer Stories
- As a component developer, I want a common interface to get constant/shared properties from.
- As a component developer, I want that my component themes with design tokens are resolved into final values before render.
- As a component developer, I want the ability to add design tokens to the style prop.
- As a component developer, I want to be able to use design tokens in styles for margins, paddings, border radius, all properties that accept colors and elevation.
- As a component developer, I want to use design tokens to develop variants.


### Product Developer Stories
- As a product developer, I want to be able to configure the color palette.
- As a product developer, I want to replace the entire color palette with a new one.
- As a product developer, I want to extend the color palette.
- As a product developer, I want to extend/replace/update the design tokens for colors/ spacing/ typography/ border radius and elevation.



### Reference:
- [M3 Tokens](https://m3.material.io/styles/color/the-color-system/tokens)
- [M3 Colors](https://m3.material.io/styles/color/the-color-system/custom-colors)
- [Understanding the colour palette](https://codelabs.developers.google.com/visualize-dynamic-color)

