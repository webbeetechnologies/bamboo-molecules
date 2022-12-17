import { useMolecules, CardProps } from 'bamboo-molecules';
import { Image } from 'react-native';

export const Example = (props: CardProps) => {
    const { Card } = useMolecules();

    return <Card {...props} />;
};

export const BasicCard = (props: CardProps) => {
    const { Card, Button, IconButton } = useMolecules();

    return (
        <Card style={{ maxWidth: 400 }} variant="outlined" onPress={() => {}} {...props}>
            <Card.Header>
                <IconButton name="account-circle-outline" size="lg" onPress={() => {}} />
                <IconButton name="dots-vertical" size="sm" onPress={() => {}} />
            </Card.Header>
            <Card.Content>
                <Card.Headline>Headline</Card.Headline>
                <Card.Subhead>SubHead</Card.Subhead>
                <Card.Text>
                    Explain more about the topic shown and headline subhead through supporting text
                </Card.Text>
            </Card.Content>
            <Card.Actions>
                <Button variant="outlined" onPress={() => {}} style={{ marginRight: 'spacings.2' }}>
                    Action
                </Button>
                <Button variant="contained" onPress={() => {}}>
                    Action
                </Button>
            </Card.Actions>
        </Card>
    );
};

export const CardWithMedia = (props: CardProps) => {
    const { Card, Button } = useMolecules();

    return (
        <Card style={{ maxWidth: 400 }} variant="outlined" {...props}>
            <Card.Media>
                <Image source={{ uri: 'https://picsum.photos/700' }} style={{ flex: 1 }} />
            </Card.Media>
            <Card.Content>
                <Card.Headline>Headline</Card.Headline>
                <Card.Subhead>SubHead</Card.Subhead>
                <Card.Text>
                    Explain more about the topic shown and headline subhead through supporting text
                </Card.Text>
            </Card.Content>
            <Card.Actions>
                <Button variant="outlined" onPress={() => {}} style={{ marginRight: 'spacings.2' }}>
                    Action
                </Button>
                <Button variant="contained" onPress={() => {}}>
                    Action
                </Button>
            </Card.Actions>
        </Card>
    );
};
