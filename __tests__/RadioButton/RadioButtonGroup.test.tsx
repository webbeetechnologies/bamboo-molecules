import { renderWithWrapper } from '../../testHelpers';

import { RadioButton } from '../../src/components';

describe('RadioButtonGroup', () => {
    it('renders properly', () => {
        const tree = renderWithWrapper(
            <RadioButton.Group value="first" onValueChange={() => {}}>
                <RadioButton value="first" />
            </RadioButton.Group>,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
