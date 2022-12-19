import type { ComponentMeta, ComponentStory } from '@storybook/react';

import {
    Example,
    BasicCard,
    CardWithMedia,
    AdvancedUsage,
    CardsInCollection as CardsInCollectionStory,
} from './Card';

export default {
    title: 'components/Card',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Basic: ComponentStory<typeof BasicCard> = args => <BasicCard {...args} />;

Basic.args = {
    variant: 'outlined',
};

Basic.parameters = {
    docs: {
        source: {
            code: `
const { Card, Button } = useMolecules();

return (
    <Card style={{ maxWidth: 400 }} variant="outlined" onPress={() => {}}>
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
    </Card>
);`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const Media: ComponentStory<typeof CardWithMedia> = args => <CardWithMedia {...args} />;

Media.args = {
    variant: 'outlined',
};

Media.parameters = {
    docs: {
        source: {
            code: `
 const { Card, Button } = useMolecules();

return (
    <Card style={{ maxWidth: 400 }} variant="outlined">
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
    </Card>
);`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const ComplexUsage: ComponentStory<typeof AdvancedUsage> = args => (
    <AdvancedUsage {...args} />
);

ComplexUsage.args = {
    variant: 'outlined',
};

ComplexUsage.parameters = {
    docs: {
        source: {
            code: `
 export const AdvancedUsage = (props: CardProps) => {
    const { Card, IconButton, Button } = useMolecules();

    return (
        <Card style={styles.card} variant="outlined" {...props}>
            <Card.Header>
                <IconButton name="account-circle-outline" size="lg" />
            </Card.Header>
            <Card.Content>
                <Card.Media style={styles.media}>
                    <Image source={{ uri: 'https://picsum.photos/700' }} style={styles.image1} />
                    <Image source={{ uri: 'https://picsum.photos/700' }} style={styles.image2} />
                </Card.Media>
                <Card.Text>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci at corporis
                    dolor eius explicabo quas, quisquam repellendus repudiandae soluta unde ut vel
                </Card.Text>
            </Card.Content>
            <Card.Actions style={styles.actions}>
                <View style={styles.row}>
                    <Button
                        size="sm"
                        variant="contained-tonal"
                        onPress={() => {}}
                        style={{ marginRight: 'spacings.2' }}>
                        Action
                    </Button>
                    <Button variant="contained-tonal" size="sm" onPress={() => {}}>
                        Action
                    </Button>
                </View>
                <View style={styles.row}>
                    <IconButton
                        name="phone-outline"
                        size="lg"
                        style={{ marginRight: 'spacings.2' }}
                        onPress={() => {}}
                    />
                    <IconButton name="message-text-outline" size="lg" onPress={() => {}} />
                </View>
            </Card.Actions>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        maxWidth: 446,
    },
    media: {
        borderRadius: 0,
        flexDirection: 'row',
        height: 126,
    },
    image1: {
        flex: 1,
        marginRight: 8,
        borderRadius: 24,
    },
    image2: {
        flexBasis: '10%',
        borderRadius: 28,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actions: {
        justifyContent: 'space-between',
    },
});`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const CardsInCollection: ComponentStory<typeof CardsInCollectionStory> = () => (
    <CardsInCollectionStory />
);

CardsInCollection.args = {};

CardsInCollection.parameters = {
    docs: {
        source: {
            code: `
 export const CardsInCollection = () => {
    const { Card, FlatGrid } = useMolecules();

    return (
        <View style={{ minWidth: 600 }}>
            <FlatGrid
                itemDimension={150}
                data={data}
                renderItem={({ item }) => (
                    <Card style={{ flex: 1 }} variant="filled" key={item.id} onPress={() => {}}>
                        <Card.Media style={{ height: 180, marginBottom: 0 }}>
                            <Image source={{ uri: item.image }} style={{ flex: 1 }} />
                        </Card.Media>
                        <Card.Content>
                            <Card.Subhead size="md" style={{ marginBottom: 'spacings.1' }}>
                                {item.name}
                            </Card.Subhead>
                            <Card.Text>{item.size}</Card.Text>
                        </Card.Content>
                    </Card>
                )}
            />
        </View>
    );
};

const data = [
    {
        id: 1,
        name: 'World Impact',
        image: 'https://picsum.photos/id/111/150/180',
        size: '30 MB',
    },
    {
        id: 2,
        name: 'World Impact',
        image: 'https://picsum.photos/id/112/150/180',
        size: '54 MB',
    },
    {
        id: 3,
        name: 'World Impact',
        image: 'https://picsum.photos/id/113/150/180',
        size: '21 MB',
    },
    {
        id: 4,
        name: 'World Impact',
        image: 'https://picsum.photos/id/114/150/180',
        size: '25 MB',
    },
    {
        id: 5,
        name: 'World Impact',
        image: 'https://picsum.photos/id/115/150/180',
        size: '33 MB',
    },
    {
        id: 6,
        name: 'World Impact',
        image: 'https://picsum.photos/id/116/150/180',
        size: '78 MB',
    },
    {
        id: 7,
        name: 'Draw & Paint',
        image: 'https://picsum.photos/id/117/150/180',
        size: '30 MB',
    },
    {
        id: 8,
        name: 'Connect',
        image: 'https://picsum.photos/id/118/150/180',
        size: '33 MB',
    },
    {
        id: 9,
        name: '90th Minute',
        image: 'https://picsum.photos/id/119/150/180',
        size: '76 MB',
    },
];`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
