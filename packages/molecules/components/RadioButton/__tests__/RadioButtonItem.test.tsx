import { renderWithWrapper } from '../../../../testHelpers';
import { RadioButton } from '../index';

it('renders unchecked', () => {
    const tree = renderWithWrapper(
        <RadioButton.Item status="unchecked" label="Unchecked Button" value="unchecked" />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
});

it('can render leading radio button control', () => {
    const tree = renderWithWrapper(
        <RadioButton.Item
            label="Default with leading control"
            status={'unchecked'}
            value="default"
            position="leading"
        />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
});
