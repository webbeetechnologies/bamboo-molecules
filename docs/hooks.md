Molecules also export additional hooks that enable composition of more complex layouts.

    - useDisclose
    Used in dialogs/ popovers/ tooltips/ accordions and anything that can have a hidden state.


    - useHover
    As the name suggests, to track the hover state of the components for styling; on mobile, the touchable api is used. **(Maybe look at pressable component that enables pressed/hovered statuses)


    - useActive
    Tracks the active state of the components for styling; on mobile, the touchable api is used. **(Maybe look at pressable component that enables pressed/hovered statuses)


    - useFocus
    Allows to style the components when the element is focused. **(Maybe look at pressable component that enables pressed/hovered statuses)


    - useMolecule
    use platform specific injected Molecule [cupertino/ material style]
        on the web, depending on the selected style [cupertino/ material style]


    - useCupertinoMolecule
    Exports cupertino themed molecule 


    - useMaterialMolecule
    Exports material themed molecule


    - useMoleculeTheme
    use injected/default Molecule theme
        on the web, depending on the selected style [cupertino/ material style]


    - useCupertinoTheme
    use cupertino theme


    - useMaterialTheme
    use material theme


... and more as we identify ..