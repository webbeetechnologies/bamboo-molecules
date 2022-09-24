# Bamboo Molecules

## What is it?
A one place library for React Native Material UI and iOS Cupertino components. It aims to provide a solid set of components that can used to create complex platform specific layouts like screens, modals, drawers and navigation.

Read the [architecture decision](./architecture.md) and [design decision](./design.md) documents.


## What does it provide?
Molecules is a set of composed components, a level higher than the un-opinionated Atoms. Following the design pattern, Molecules 


Like <a href="https://github.com/webbeetechnologies/bamboo-atoms" target="_blank">Bamboo Atoms</a>; the library is a highly performant, and well tested set of components. Components have been specifically designed to meet the design guidelines of each platform iOS or Android. Components that are composed/created in this level are opinionated for the platform they cater to; 


However, for the web, the user gets the option to toggle between Material UI and iOS Cupertino style. [Molecules components](./components.md) are designed and optimized for the best user experience on the web in both the design styles. and are built upon bamboo atoms which in-turn are built on react-native components. Offcourse, you can overwrite the styles for any of the platforms using the platform specific extensions. :)

Molecules also exposes a larger set of hooks otherwise not available from bamboo-atoms.


## What does it not do?
Bamboo molecules do not provide a for complex screens and layouts; you can create your own UI layouts using the molecules.



# Platforms
- Android
- iOS
- Web

# Themes
- Android
- iOS
- Web (Android/iOS)