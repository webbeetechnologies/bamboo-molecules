import { Text } from 'react-native';
import { fireEvent } from '@testing-library/react-native';

import { Appbar } from '../src/components';
import { renderWithWrapper } from './testHelpers';

describe('Appbar', () => {
    it('renders all of the expected subcomponents', () => {
        expect(Appbar.Title).toBeDefined();
        expect(Appbar.Left).toBeDefined();
        expect(Appbar.Right).toBeDefined();
        expect(Appbar.Actions).toBeDefined();
        expect(Appbar.CenterAligned).toBeDefined();
        expect(Appbar.Large).toBeDefined();
        expect(Appbar.Medium).toBeDefined();
        expect(Appbar.Small).toBeDefined();
    });

    it('handles filtering out the Appbar.Actions since it is not suppose to be a direct child of the Appbar', () => {
        const onPress = jest.fn();
        const { queryByTestId } = renderWithWrapper(
            <Appbar>
                <Appbar.Actions testID="appbar-actions" name="menu" onPress={onPress} />
            </Appbar>,
        );
        expect(queryByTestId('appbar-actions')).toBeNull();
    });

    it('handles the "onPress" event for the "AppbarLeft" and "AppbarRight" subcomponents', () => {
        const onPressLeft = jest.fn();
        const onPressRight = jest.fn();
        const { getByTestId } = renderWithWrapper(
            <Appbar>
                <Appbar.Left>
                    <Appbar.Actions name="menu" testID="appbar-left-action" onPress={onPressLeft} />
                </Appbar.Left>
                <Appbar.Right>
                    <Appbar.Actions
                        name="vertical-dots"
                        testID="appbar-right-actions"
                        onPress={onPressRight}
                    />
                </Appbar.Right>
            </Appbar>,
        );
        fireEvent.press(getByTestId('appbar-left-action'));
        expect(onPressLeft).toHaveBeenCalled();
        fireEvent.press(getByTestId('appbar-right-actions'));
        expect(onPressRight).toHaveBeenCalled();
    });

    it('handles changes to the "title" prop and updates the "AppbarTitle" subcomponent accordingly', () => {
        const { getByTestId, rerender } = renderWithWrapper(
            <Appbar>
                <Appbar.Title testID="appbar-title">Title 1</Appbar.Title>
            </Appbar>,
        );
        expect(getByTestId('appbar-title')).toHaveTextContent('Title 1');
        rerender(
            <Appbar>
                <Appbar.Title testID="appbar-title">Title 2</Appbar.Title>
            </Appbar>,
        );
        expect(getByTestId('appbar-title')).toHaveTextContent('Title 2');
    });

    it('handles changes to the "actions" prop and updates the "AppbarActions" subcomponent accordingly', () => {
        const { getByTestId, queryByTestId, rerender } = renderWithWrapper(
            <Appbar>
                <Appbar.Left>
                    <Appbar.Actions name="menu" testID="appbar-actions-menu" />
                </Appbar.Left>
            </Appbar>,
        );
        expect(getByTestId('appbar-actions-menu')).toBeDefined();
        rerender(
            <Appbar>
                <Appbar.Left>
                    <Appbar.Actions name="menu" testID="appbar-actions-chevron-left" />
                </Appbar.Left>
            </Appbar>,
        );
        expect(queryByTestId('appbar-actions-menu')).toBeNull();
        expect(getByTestId('appbar-actions-chevron-left')).toBeDefined();
    });

    it('does not render elements that are not Appbar subcomponents', () => {
        const { queryByText } = renderWithWrapper(
            <Appbar>
                <Text testID="textElement-inside-appbar">Not a valid Appbar subcomponent</Text>
            </Appbar>,
        );
        expect(queryByText('textElement-inside-appbar')).toBeNull();
    });
});
