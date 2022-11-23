# Number Range Slider

Molecules implements the number slider for selecting a number/ range of number between a defined range.

## Explanation Video
-   [Explaining Range slider](https://www.loom.com/share/6afaddef965a414b829093dba1d6c61f)

## References
-   [M3 Slider Component Guidelines](https://m3.material.io/components/sliders)
-   [React Native Slider](https://www.npmjs.com/package/@sharcoux/slider)

## Personas
-   End User
-   Component Consumer

### End User
-   As an end user, I expect to see a drag handle for selecting a value.
-   As an end user, I expect to see two drag handles when I'm selecting a min and max values.
-   As an end user, I always want to see the selections made in real time.
-   As an end user, I want to be able to select a the same value as min and max value.


### Component Consumer
-   As a component consumer, I expect that the range slider follows the same theme as the rest of application.
-   As a component consumer, I expect the range slider to follow the platform specific guidelines.
-   As a component consumer, I want to control the minimum and maximum values.
-   As a component consumer, I expect that on changing the value prop, the position of the handle is updated.
-   As a component consumer, I want to listen to the onChange events.
-   As a component consumer, I expect that the changes are updated realtime.
-   As a component consumer, I may want to provide the size of step.
-   As a component consumer, I want to design the slider as per my requirements.
-   As a component consumer, I may want to use the slider in vertical orientation.


## Interfaces
```ts
    interface NumberRangeProps {
        value: { min: number, max: number } | number,
        minValue: number;
        maxValue: number;
    }
```