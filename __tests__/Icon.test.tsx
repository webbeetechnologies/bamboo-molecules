// import { Example as Icon } from '../stories/components/Icon/Icon';
import { renderWithWrapper } from '../testHelpers';

beforeEach(() => {
    jest.resetModules();
});

it('should render with icon type', () => {
    jest.doMock('../src/components/Icon/Icon', () => {
        return jest.fn(args => JSON.stringify(args));
    });

    const Icon = require('../src/components/Icon/Icon');
    const tree = renderWithWrapper(<Icon name="wifi" />).toJSON();
    expect(tree).toEqual(JSON.stringify({ name: 'wifi' }));
});

// it('should have overridable testID', () => {
//     const { queryByTestId } = renderWithWrapper(<Icon name="wifi" testID="wifiIcon" />);
//     expect(queryByTestId('wifiIcon')).toBeTruthy();
// });
