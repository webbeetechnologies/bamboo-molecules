# Bamboo Molecules

## Goals 
- A feature complete UI component library for react-native; works on Android, iOS and Web
- Follows platform specific guidelines
- Reliably performant React Native components
- Easy theming
- Rapid development
- Composable components

## Core Principles
- At it core, Bamboo molecules extends the principles of Bamboo Atoms.
  - Dependency Injection\
    Allows the product developers to replace a component with an equivalent component
  - Absolute control and customizations\
    As a developer, you take control of how Molecules work for you from styles to functionality.
- A product developer should be able to style all the components, not only colors, but also shapes, sizes and variants. 
- A product developer shouldn't have to worry about importing a multitude of components.
- A product developer should be able to replace any components, including child components, as he thinks fit.
- A product developer should be able to use a component without worrying about performance of the component.


## What is Bamboo Molecules?
A one place library for React Native Material UI and iOS Cupertino components.\
It aims to provide a solid set of components that can used to create complex platform specific layouts like screens, modals, drawers and navigation.


## What does it provide?
Molecules is a set of composed components, a level higher than the un-opinionated Atoms.
Following the design pattern, Molecules like <a href="https://github.com/webbeetechnologies/bamboo-atoms" target="_blank">Bamboo Atoms</a>; the library is a highly performant, and well tested set of components.
Components have been specifically designed to meet the design guidelines of each platform iOS or Android.
Bamboo Molecules are opinionated for the platform they cater to.

For the web, the user gets the option to toggle between Material UI and iOS Cupertino style.
Molecules components are designed and optimized for the best user experience on the web in both the design styles.
Of-course, you can overwrite the styles for any of the platforms using the platform specific extensions. :)

Molecules also exposes an assortment of hooks otherwise not available from bamboo-atoms that make the development experience a breeze.


## What does it not do?
Bamboo molecules do not provide a for complex screens and layouts; you can create your own UI layouts using the molecules.



## Platforms
- Android
- iOS
- Web

## Themes
- Android
- iOS
- Web (Android/iOS)


# Getting Started

## Installation

Simply get started by using the [Bamboo Molecules starter template](https://github.com/webbeetechnologies/blueprint-react-native). Alternately, add Bamboo Molecules to an existing project by installing.
```bash
yarn add @webbeetechnologies/bamboo-molecules
```


## Usage

### Basic usage

- `ProvideMolecules`: React context provider to add the theming and components to your project.
- `useMolecules`: Hook to read the provided components from context.

```tsx
import { ProvideMolecules, useMolecules } from "@webbeetechnologies/bamboo-molecules";

const DemoComponent = () => {
  const {View, Text} = useMolecules();
  return (
    <View>
      <Text>Hello World!</Text>
    </View>
  )
}

const App = (props) => {
  return (
    <ProvideMolecules>
      <DemoComponent />
    </ProvideMolecules>
  )
}

export default Component;
```

### Providing Custom Components
Want to provide custom components to use within your app? Simply pass them to provider.
useMolecules is a generic, and thus, and thus it will accept an interface and for type inference.
```tsx
import { ProvideMolecules, useMolecules } from "@webbeetechnologies/bamboo-molecules";

const components = {
  AwesomeStringComponent: (props: { value: string, onChange?: (value: string) => {} }) => <>{ value }</>,
  AwesomeNumberComponent: (props: { value: number, onChange?: (value: number) => {} }) => <>{ value }</>,
}

const useAwesomeAppComponents = () => useMolecules<typeof components>();


const DemoComponent = () => {
  const {View, AwesomeStringComponent, AwesomeNumberComponent} = useAwesomeAppComponents();
  return (
    <View>
      <AwesomeStringComponent value="Hello World" />
      <AwesomeNumberComponent value={42} />
    </View>
  )
}

const App = (props) => {
  return (
    <ProvideMolecules components={components}>
      <DemoComponent />
    </ProvideMolecules>
  )
}
export default App;
```


### Theming
Want to provide a custom theme or extend the existing components; easy.\
Make a custom style definition for your components by using the `extendTheme` function.
Bamboo molecules implement platform specific design tokens that can be also be easily.
- `extendTheme`: accepts a custom default style definition for the Molecules and custom components that extends the theme.
```tsx
import { ProvideMolecules, useMolecules, extendTheme } from "@webbeetechnologies/bamboo-molecules";

const theme = extendTheme({
  AwesomeStringComponent: {
    color: "colors.onPrimary",
    backgroundColor: "colors.primary",
  },
  Button: {
    backgroundColor: "colors.primary",
    text: "colors.onPrimary",
    states: {
      disabled: {
        backgroundColor: "red",
        text: "black",
      },
      hovered: {
        backgroundColor: "colors.primaryOnHover",
      }
    }
  }
});


const DemoComponent = () => {
  const {Button} = useMolecules();
  return (
    <Button />
  )
}

const App = (props) => {
  return (
    <ProvideMolecules theme={theme}>
      <DemoComponent />
    </ProvideMolecules>
  )
}
export default App;
```

### Styling Custom components
If you are a library developer, you may want to enable your component consumers to extend the styles of the components.
You may have different states, you may also want to have different variants.
Bamboo Molecules enables you to create a configurable component all the parts of which can be separately styled.

```tsx
import { FC, useMemo } from "react";
import type { ViewProps } from "react-native";
import { ProvideMolecules, useMolecules, useComponentStyles, extendTheme, } from "@webbeetechnologies/bamboo-molecules";

const theme = extendTheme({
  ChessTile: {
    height: 16,
    width: 16,
    variants: {
      "black": { backgroundColor: "#000" },
      "white": { backgroundColor: "#fff" },
    },
    states: {
      possible: {
        variants: {
          "black": { backgroundColor: "#222" },
          "white": { backgroundColor: "#ddd" },
        }
      },
      selected: {
        variants: {
          "black": { backgroundColor: "#111" },
          "white": { backgroundColor: "#eee" },
        }
      },
      potentialMove: {
        backgroundColor: "blue",
      }
    },
  },
});


const ChessTile: FC<ViewProps & AndSomeChessPositionArgs> = (props) => {
  const { possible, selected, potentialMove } = deriveCurrentTileState(props);
  const componentStyles = useComponentStyles("ChessTile", props.style, {
    // Represents a possible position for the selected piece
    possible,
    // Represents the position of the selected piece
    selected,
    // Represents the selected possible position of the selected piece.
    potentialMove
  });

  const { View, Text } = useMolecules();
  return <View { ...props} />
}

const components = {AwesomeViewComponent}

const App = (props) => {
  const board = useMemo(() => {
    Array.from({ length: 12 }, (_, i) => Array.from({ length: 12 }, (_, j) => <ChessTile variant={ i % 2 === j % 2 ? "white" : 'black' } />))
  }, []);
  
  return (
    <ProvideMolecules components={components} theme={theme}>
      {board}
    </ProvideMolecules>
  )
}
export default App;
```


### Resolve Component styles
Though the component theme is opinionated by default.
You can write your own custom style resolver allowing you to use styles you already have. Molecules provider accepts an optional `resolveComponentStyles` prop.

```tsx
import { ProvideMolecules, extendTheme, resolveComponentStyles, extractComponentStyles } from "@webbeetechnologies/bamboo-molecules";


const theme = extendTheme({
  Knight: {
    height: 16,
    width: 16,
  },
});

const resolveStyles = (arg) => {
  const {componentName, componentTheme, variant, states, size, style, } = arg;

  switch(componentName) {
    case 'Knight':
      // Do something amazing with the componentTheme.
      // here, you can do something with the variants, states and sizes also.
      // you may choose to drop styles entirely for example.
      break;
    default:
      return resolveComponentStyles(arg);
  }
}

const extractStyles = (arg) => {
  const { theme, componentName, colorMode, style } = arg;

  switch(componentName) {
    case 'Knight':
      // here, you get the theme with duly resolved design tokens.
      // Do something with the style object and the theme.
      break;
    default:
      return resolveComponentStyles(arg);
  }
}

const App = (props) => {
  return (
      <ProvideMolecules theme={theme} extractComponentStyles={extractStyles} resolveComponentStyles={resolveStyles} />
  )
}
```


### Nesting ProvideMolecules - Components
If you need to provide some components access in only a certain part of the application, you can nest ProvideMolecules.
ProvideMolecules takes the top-down approach, thus allowing you to overwrite the components of molecules. 
This also allows you to provide the components at the topmost level, or at a much lower level where the component is most relevant.

Consider the example

```tsx
import { ProvideMolecules, extendTheme, useMolecules } from "@webbeetechnologies/bamboo-molecules";
import { useMemo } from "react";


const componentsModal = {
  ModalTitle: (props: TextProps) => {
    const { Text } = useMolecules();
    const style = useMemo(() => [{ typescale: 'typescale.displayMedium' }], []);
    return <Text style={style}></Text>
  },
  ModalBody: (props: ViewProps) => {
    const { View } = useMolecules();
    const viewStyles = useMemo(() => [{ borderRadius: 'shapes.corner.large' }], []);
    const textStyles = useMemo(() => [{ typescale: 'typescale.displayRegular' }], []);

    return (
      <View style={viewStyles} {...props}>
        <Text style={textStyles}>{props.children}</Text>
      </View>
    )
  },
}

const componentsRoot = {
  Modal: (props: ViewProps) => {
    const { View } = useMolecules();
    return (
      <ProvideMolecules components={componentsModal}>
        <View {...props} />
      </ProvideMolecules>
    )
  },
  ModalTitle: (props: TextProps) => {
    const { Text } = useMolecules();
    const style = useMemo(() => [{ typescale: 'typescale.headlineLarge' }], []);
    return <Text style={style}></Text>
  },
}

const LibraryModalBody = () => {
  const {ModalBody, ModalTitle} = useMolecules();
  return (
      <>
        <ModalTitle>I am rendered `headlineLarge`</ModalTitle>
        <ModalBody>Some Modal Body</ModalBody>
      </>
  )
}

const AppModal = () => {
  const {Modal} = useMolecules();
  return (
    <Modal>
      <LibraryModalBody />
    </Modal>
  )
}



const App = (props) => {
  return (
          <ProvideMolecules components={componentsRoot}>
            <AppModal />
          </ProvideMolecules>
  )
}
```

### Nesting ProvideMolecules - Themes
You may also find it useful to provide styling components separately at a lower level while still being able to extend the styles from a higher level.
While it allows you to create custom styles, it enables the end consumer of these components to overwrite the design.
Also, the component consumer can have a different color mode in different parts of the application without much ado.
```tsx
import { ProvideMolecules, extendTheme, useMolecules } from "@webbeetechnologies/bamboo-molecules";

const theme = extendTheme({
  ViewComponent: {
    backgroundColor: "colors.primary",
    padding: "spacings.16",
    margin: "spacings.16",
  }
})

const darkTheme = extendTheme({
  ...theme,
  colorMode: "dark",
})


const ViewComponent = (props) => {
  const {View, Text} = useMolecules();
  return (
          <View { ...props }>
            <Text>{props.children}</Text>
          </View>
  )
}

const App = (props) => {
  return (
          <ProvideMolecules theme={theme}>
            <ViewComponent>I am in a light theme</ViewComponent>
            <ProvideMolecules theme={darkTheme}>
              <ViewComponent>I am in a dark theme</ViewComponent>
            </ProvideMolecules>
          </ProvideMolecules>
  )
}
```


# Scripts
```bash
# Get started with storybooks
yarn start

# Demo project
yarn demo
```