import React from 'react';
import { useColorMode } from '@webbee/bamboo-atoms';
import { useMolecules } from 'bamboo-molecules';

const ColorModeToggle = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const { IconButton } = useMolecules();
    return (
        <IconButton
            size="lg"
            type="material-community"
            name={colorMode === 'light' ? 'white-balance-sunny' : 'weather-night'}
            onPress={toggleColorMode}
        />
    );
};

export default ColorModeToggle;
