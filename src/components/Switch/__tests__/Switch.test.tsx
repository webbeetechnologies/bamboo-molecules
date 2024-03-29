import { renderWithWrapper } from '../../../../testHelpers';
import { Switch } from '../index';

it('renders on switch', () => {
    const tree = renderWithWrapper(<Switch value />).toJSON();

    expect(tree).toMatchSnapshot();
});

it('renders off switch', () => {
    const tree = renderWithWrapper(<Switch value={false} />).toJSON();

    expect(tree).toMatchSnapshot();
});

it('renders disabled switch', () => {
    const tree = renderWithWrapper(<Switch disabled value />).toJSON();

    expect(tree).toMatchSnapshot();
});

it('renders switch with secondary color', () => {
    const tree = renderWithWrapper(
        <Switch value trackColor={{ true: 'colors.secondary' }} />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
});
