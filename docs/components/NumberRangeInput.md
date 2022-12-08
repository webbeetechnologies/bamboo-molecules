# Number Range

Number ranges can be open ended, and sometimes they have a maximum and minimum values for selection. Thus, molecules takes this into accounts and implements the Number Range component.

## Explanation Video
-   [Explanining Number Range](https://www.loom.com/share/59bb6ac407cc4b948aa883bec10f86f6)

## References
-   [Butlerapp](https://bamboo.veranstaltungsbutler.de/)

## Personas
-   End User
-   Component Consumer


### End User
-   As an end user, I want to be able to manually enter values numeric values in text boxes.
-   As an end user, I expect to be able to enter only numeric values into the input.
-   As an end user, I expect to see a numeric keypad on mobile/tablet platforms.
-   As an end user, I want to be able to type in decimal numbers.
-   As an end user, I want to see validation messages when the `minValue` value is greater than `maxValue` value entered.
-   As an end user, I expect that the validation messages are only shown once I am done entering the values.
-   As an end user, I want to be able to enter same values for min and max input fields.


### Component Consumer
-   As a component consumer, I expect that the component implements Number Input Components.
-   As a component consumer, I want may not always be able to define a `minValue` and `maxValue` value for the number component
-   As a component consumer, I expect the user input is validated against `minValue` and `maxValue` props as available.
-   As a component consumer, I want to be able to be able to listen into the onChange events.


## Interfaces
```ts
    interface NumberRangeProps {
        value: { min: number, max: number },
        minValue?: number;
        maxValue?: number;
    }
```