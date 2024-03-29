import { VerticalDivider } from '../../VerticalDivider';
import { renderWithWrapper } from '../../../../testHelpers';

it('should render VerticalDivider', () => {
    const tree = renderWithWrapper(<VerticalDivider />).toJSON();
    expect(tree).toMatchSnapshot();
});

it('should render VerticalDivider with spacing of 10 pixels', () => {
    const tree = renderWithWrapper(<VerticalDivider spacing={10} />).toJSON();
    expect(tree).toMatchSnapshot();
});
