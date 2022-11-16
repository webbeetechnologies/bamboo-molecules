import { Example as ActivityIndicator } from '../stories/components/ActivityIndicator/ActivityIndicator';
import { renderWithWrapper } from '../testHelpers';

it('renders indicator', () => {
    const tree = renderWithWrapper(<ActivityIndicator animating />).toJSON();

    expect(tree).toMatchSnapshot();
});

it('renders hidden indicator', () => {
    const tree = renderWithWrapper(
        <ActivityIndicator animating={false} hidesWhenStopped />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
});

it('renders large indicator', () => {
    const tree = renderWithWrapper(<ActivityIndicator size="large" />).toJSON();

    expect(tree).toMatchSnapshot();
});

it('renders colored indicator', () => {
    const tree = renderWithWrapper(<ActivityIndicator color="#FF0000" />).toJSON();

    expect(tree).toMatchSnapshot();
});
