import { Example as HorizontalDivider } from '../stories/components/HorizontalDivider/HorizontalDivider';
import { renderWithWrapper } from '../testHelper';

it('should render VerticalDivider', () => {
    const tree = renderWithWrapper(<HorizontalDivider />).toJSON();
    expect(tree).toMatchSnapshot();
});

it('should render VerticalDivider with spacing of 10 pixels', () => {
    const tree = renderWithWrapper(<HorizontalDivider spacing={10} />).toJSON();
    expect(tree).toMatchSnapshot();
});
