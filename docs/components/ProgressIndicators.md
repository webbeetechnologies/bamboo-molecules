# Progress Indicator
Progress Indicators are displayed to an ongoing long running activity such as file upload

# Explanation Video
-   [Video explaining the Progress Indicators](https://www.loom.com/share/136e6e562bae42de9c91bb2890d9344d)

# References
-   [Material 3 Specs](https://m3.material.io/components/progress-indicators/specs)
-   [React Native Paper ProgressBar](https://callstack.github.io/react-native-paper/progress-bar.html)


# Personas
-   End User
-   Component consumer
-   Component developer

### End User
-   As a user, I want to be able to see the current progress of a task I am performing so that I know how much longer the task will take.
-   As a user, I want to see progress indicators when an action may take longer than a blink, eg. file upload, loading data, submitting items, etc.

### Component Consumer
-   As a component consumer, I expect the Progress indicators follow the platform specific guidelines.
-   As a component consumer, I want the progress indicator to accurately reflect the progress of the task.
-   As a component consumer, I want to be able to control the value of the progress indicator so that I can set it to reflect the current progress of the task I am performing. usage: `progress` prop
-   As a component consumer, I want the progress indicator to be customizable so that I can match it to the design of my app.
-   As a component consumer, I want the progress indicator to be easy to implement in my app so that I can quickly add it to my user interface.
-   As a component consumer, I want to make a progress indicator indeterminate.
-   As a component consumer, I want change a progress indicator from indeterminate to determinate or the otherway.
-   As a component consumer, I want to access the ref of the progress indicator to update the status such as `ref.current.update(33.33)`;

### Component developer
-   As a component developer, I want to build separate presentation components that satisfy different modes `circular` and `linear`.
-   As a component developer, I want to abstract the common functionality of the two components into a common place.

## Modes
-   Linear
-   Circular