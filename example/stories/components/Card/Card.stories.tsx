import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example, BasicCard, CardWithMedia } from './Card';

export default {
    title: 'components/Card',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Basic: ComponentStory<typeof BasicCard> = args => <BasicCard {...args} />;

Basic.args = {};

Basic.parameters = {
    docs: {
        source: {
            code: `
const { Card, Button } = useMolecules();

return (
    <Card style={{ maxWidth: 400 }} variant="outlined" onPress={() => {}}>
        <>
            <Card.Content>
                <Card.Text variant="title">Headline</Card.Text>
                <Card.Text variant={'subtitle'}>SubHead</Card.Text>
                <Card.Text>
                    Explain more about the topic shown and headline subhead through supporting
                    text
                </Card.Text>
            </Card.Content>
            <Card.Actions>
                <Button
                    variant="outlined"
                    onPress={() => {}}
                    style={{ marginRight: 'spacings.2' }}>
                    Action
                </Button>
                <Button variant="contained" onPress={() => {}}>
                    Action
                </Button>
            </Card.Actions>
        </>
    </Card>
);`,
            language: 'tsx',
            type: 'auto',
        },
    },
    chromatic: { disableSnapshot: true },
};

export const Media: ComponentStory<typeof CardWithMedia> = args => <CardWithMedia {...args} />;

Media.args = {
    onPress: () => {},
};

Media.parameters = {
    docs: {
        source: {
            code: `
 const { Card, Button } = useMolecules();

return (
    <Card style={{ maxWidth: 400 }} variant="outlined">
        <>
            <Card.Media source={{ uri: 'https://picsum.photos/700' }} />
            <Card.Content>
                <Card.Text variant="title">Headline</Card.Text>
                <Card.Text variant={'subtitle'}>SubHead</Card.Text>
                <Card.Text>
                    Explain more about the topic shown and headline subhead through supporting
                    text
                </Card.Text>
            </Card.Content>
            <Card.Actions>
                <Button
                    variant="outlined"
                    onPress={() => {}}
                    style={{ marginRight: 'spacings.2' }}>
                    Action
                </Button>
                <Button variant="contained" onPress={() => {}}>
                    Action
                </Button>
            </Card.Actions>
        </>
    </Card>
);`,
            language: 'tsx',
            type: 'auto',
        },
    },
    chromatic: { disableSnapshot: true },
};
