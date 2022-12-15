# Appbar
Molecules Appbar requires `react-navigation` to work.  

## Explanation Video
- [Video Explaining the Appbar Component](https://www.loom.com/share/0f20f475b55f4ceba789e75ca66c8a85)

## References
- [Material Design Guidelines](https://m3.material.io/components/top-app-bar/specs)
- [React Native Paper](https://callstack.github.io/react-native-paper/appbar.html)
- [React Navigation](https://reactnavigation.org/docs/handling-safe-area/#hiddencustom-header-or-tab-bar)
- [Animating Appbar header](https://github.com/benevbright/react-navigation-collapsible)
- [Code Reference](https://blog.logrocket.com/using-react-native-scrollview-create-sticky-header/)


## Personas
- End User
- Component Consumer

### End User Stories

- 
- As an end user, I want the AppBar to be easy to navigate and use on both mobile and web platforms.
- As an end user, on an application, I want to see a clear title of the page I am on.
- As an end user, If the application supports a drawer, I expect to see a drawer button.
- As an end user, If I have navigated away from the main screen, I expect to see a back button.
- As an end user, If the current context is a full screen modal, I expect to see a close or back button for navigation.
- As an end user, I may want to see a primary action on the Appbar.
- As an end user, I may want to see a dropdown of other actions.


### Component Consumer Stories
- As a component consumer, I expect the Appbar to follow platform specific guidelines.
- As a component consumer, I want to be able to add multiple action items to the app bar.
- As a component consumer, I want to be able to hide or show the leading navigation icon (drawer/back).
- As a component consumer, I expect to use the Appbar wrapper of different types, `Appbar.CenterAligned` | `Appbar.Small` | `Appbar.Medium` | `Appbar.Large`
- As a component consumer, I may want to be able to collapse `Appbar.Medium` and `Appbar.Large` to collapse on scroll.
- As a component consumer, I want to be able to overwrite the styles of each of the different types of Appbars.
- As a component consumer, I want to be able to use a component `Appbar.Title` that has default styles which can be overwritten.
- As a component consumer, I want to be able to add a background image to the `Appbar.Large` and `Appbar.Medium` components.
- As a component consumer, I expect the Appbar to be responsive.
- As a component consumer, I expect the Appbar background changes to a contrasting on scrolling.
- As a component consumer, I to be have access to an `Appbar.DrawerButton` and `Appbar.BackButton`.
- As a component consumer, I want to be able to be able to add Dropdowns with IconButtons to the Appbar.
- As a component consumer, I want to be able to replace the navigation button with an `Appbar.CloseButton` in case of full screen dialogs.
- As a component consumer, I want the component to be compatible with the latest versions of React Native.


```typescript
import {PropsWithChildren} from "react";

type SpacingDesignToken = string | number;

interface AppBarProps extends ViewProps {
    safeAreaInsets: { bottom?: SpacingDesignToken; top?: SpacingDesignToken; left?: SpacingDesignToken; right?: SpacingDesignToken; }
}

interface AppBarNavigationActionProps extends Omit<IconButtonProps, "icon" | "onPress"> {
}

type DrawerButton = React.FC<AppBarNavigationActionProps>;
type BackButton = React.FC<AppBarNavigationActionProps>;
type CloseButton = React.FC<AppBarNavigationActionProps>;

interface AppBarActionProps extends IconButtonProps {
}

interface AppBarLeft extends PropsWithChildren<ViewProps> {
}

interface AppBarRight extends PropsWithChildren<ViewProps> {
}

interface AppBarContent extends PropsWithChildren<ViewProps> {
    titleStyle: StyleProp<TextStyle>;
    onPress: () => void;
}
```