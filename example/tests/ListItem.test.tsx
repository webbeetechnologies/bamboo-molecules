import { Example as ListItem } from '../stories/components/ListItem/ListItem';
import { renderWithWrapper } from '../testHelper';

it('should render ListItem', () => {
    const tree = renderWithWrapper(<ListItem title="headline" />).toJSON();
    expect(tree).toMatchSnapshot();
});

it('should render ListItem with description', () => {
    const tree = renderWithWrapper(
        <ListItem title="headline" description="supporting text" />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
