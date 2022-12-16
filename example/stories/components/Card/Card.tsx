import { useMolecules, CardProps } from 'bamboo-molecules';

export const Example = (props: CardProps) => {
    const { Card } = useMolecules();

    return <Card {...props} />;
};

export const BasicCard = (props: CardProps) => {
    const { Card, Button } = useMolecules();

    return (
        <Card style={{ maxWidth: 400 }} variant="outlined" onPress={() => {}} {...props}>
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
    );
};

export const CardWithMedia = (props: CardProps) => {
    const { Card, Button } = useMolecules();

    return (
        <Card style={{ maxWidth: 400 }} variant="outlined" {...props}>
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
    );
};
