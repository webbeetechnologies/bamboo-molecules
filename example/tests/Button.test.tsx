import { Button } from '../../src/components';
import { Contained as ButtonStory } from '../stories/components/Button/Button.stories';
import type { Props } from '../stories/components/Button/Button';
import { renderWithWrapper, fireEvent, runBenchmark } from '../testHelpers';

describe('button', () => {
    it('renders text button by default', () => {
        const tree = renderWithWrapper(<Button>Text Button</Button>).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('renders text button with variant', () => {
        const tree = renderWithWrapper(<Button variant="text">Text Button</Button>).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('renders outlined button with variant', () => {
        const tree = renderWithWrapper(
            <Button variant="outlined">Outlined Button</Button>,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('renders contained contained with variant', () => {
        const tree = renderWithWrapper(
            <Button variant="contained">Contained Button</Button>,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('renders loading button', () => {
        const tree = renderWithWrapper(<Button loading>Loading Button</Button>).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('renders disabled button', () => {
        const tree = renderWithWrapper(<Button disabled>Disabled Button</Button>).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('renders button with color', () => {
        const tree = renderWithWrapper(
            <Button textColor="colors.tertiary">Custom Button</Button>,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('renders button with custom background color', () => {
        const tree = renderWithWrapper(
            <Button buttonColor="colors.tertiary">Custom Button</Button>,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('renders button with custom testID', () => {
        const tree = renderWithWrapper(
            <Button testID={'custom:testID'}>Button with custom testID</Button>,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('renders button with an accessibility label', () => {
        const tree = renderWithWrapper(
            <Button accessibilityLabel={'label'}>Button with accessibility label</Button>,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('renders button with an accessibility hint', () => {
        const tree = renderWithWrapper(
            <Button accessibilityHint={'hint'}>Button with accessibility hint</Button>,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should execute onPressIn', () => {
        const onPressInMock = jest.fn();
        const onPress = jest.fn();

        const { getByTestId } = renderWithWrapper(
            <Button onPress={onPress} onPressIn={onPressInMock} testID="button">
                Button with onPressIn
            </Button>,
        );
        fireEvent(getByTestId('button'), 'onPressIn');
        expect(onPressInMock).toHaveBeenCalledTimes(1);
    });

    it('should execute onPressOut', () => {
        const onPressOutMock = jest.fn();
        const onPress = jest.fn();

        const { getByTestId } = renderWithWrapper(
            <Button onPress={onPress} onPressOut={onPressOutMock} testID="button">
                Button with onPressIn
            </Button>,
        );
        fireEvent(getByTestId('button'), 'onPressOut');
        expect(onPressOutMock).toHaveBeenCalledTimes(1);
    });

    it.only('benchmark button', done => {
        console.log('benchmark start');
        const results: any = Promise.race([
            runBenchmark({
                component: ButtonStory,
                props: ButtonStory.args as Props,
                timeout: 500,
            }),
            new Promise((x, reject) => setTimeout(reject, 600)),
        ]).then(() => {
            console.log('benchmark done');
            expect(results?.mean).toBeLessThan(4);
            done();
        });
    });
});
