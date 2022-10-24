#WithElements

Several elements implement the WithElements Interface. Some of them are listed below.

## References

-   [Buttons](https://m3.material.io/components/buttons/specs#256326ad-f934-40e7-b05f-0bcb41aa4382)
-   [ListItems](https://m3.material.io/components/lists/guidelines#24fdb9eb-4630-46fd-8078-4f929bba571d)
-   [Inputs with Text Elements](https://m3.material.io/components/text-fields/guidelines#bf5a00a9-9882-447b-a5fb-4e1e05ac77fa)
-   [Inputs with Icons](https://m3.material.io/components/text-fields/guidelines#51c13153-4236-4ec8-a1b4-a203c029bf13)
-   [Chips](https://m3.material.io/components/chips/guidelines#8b988d8b-555a-4cf1-955e-58111f6dc0d8)

## Personas

-   Component Consumer

## Component Consumer

-   As a component consumer, I want the ability to add elements before or after my wrapped element.
-   As a component consumer, I want to be able to add component specific elements before or after the wrapped component.\
    Eg. Extra Text elements for buttons do not make sense. Only icons do.
    Similarly, List items could take Images/ Icons/ Text/ IconButtons or Buttons.
-   As a component consumer, I want to be able to pass down the components using props like `left` and `right`.

## Usage in

-   [Input](../Input.md)
-   [Button](../Button.md)
-   [Select](../Select.md)
-   [Chips](../Chips.md)
-   Textarea
