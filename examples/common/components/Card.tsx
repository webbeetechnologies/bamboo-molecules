import { type CardProps, Card } from '@bambooapp/bamboo-molecules/src/components/Card';
import { IconButton } from '@bambooapp/bamboo-molecules/src/components/IconButton';
import { Button } from '@bambooapp/bamboo-molecules/src/components/Button';
import { useCallback } from 'react';
import { Image, ListRenderItemInfo, StyleSheet, View } from 'react-native';

export const Example = (props: CardProps) => {
    return <Card {...props} />;
};

export const BasicCard = (props: CardProps) => {
    const onMenuPress = useCallback(() => {}, []);
    const onButtonPress = useCallback(() => {}, []);

    return (
        <Card style={basicCardStyles.card} variant="outlined" {...props}>
            <Card.Header testID="basic-header">
                <IconButton name="account-circle-outline" size={28} />
                <IconButton name="dots-vertical" size={20} onPress={onMenuPress} />
            </Card.Header>
            <Card.Content>
                <Card.Headline testID="basic-headline">Headline</Card.Headline>
                <Card.Subhead testID="basic-subhead">SubHead</Card.Subhead>
                <Card.Text testID="basic-text">
                    Explain more about the topic shown and headline subhead through supporting text
                </Card.Text>
            </Card.Content>
            <Card.Actions testID="basic-actions">
                <Button variant="outlined" onPress={onButtonPress} style={basicCardStyles.button}>
                    Action
                </Button>
                <Button variant="contained" onPress={onButtonPress}>
                    Action
                </Button>
            </Card.Actions>
        </Card>
    );
};

const basicCardStyles = StyleSheet.create({
    card: {
        maxWidth: 400,
    },
    button: { marginRight: 8 },
});

const imageSource = { uri: 'https://picsum.photos/id/451/700' };
export const CardWithMedia = (props: CardProps) => {
    const onButtonPress = useCallback(() => {}, []);

    return (
        <Card style={cardsWithMediaStyles.card} variant="outlined" {...props}>
            <Card.Media>
                <Image source={imageSource} style={cardsWithMediaStyles.image} />
            </Card.Media>
            <Card.Content>
                <Card.Headline>Headline</Card.Headline>
                <Card.Subhead>SubHead</Card.Subhead>
                <Card.Text>
                    Explain more about the topic shown and headline subhead through supporting text
                </Card.Text>
            </Card.Content>
            <Card.Actions>
                <Button
                    variant="outlined"
                    onPress={onButtonPress}
                    style={cardsWithMediaStyles.button}>
                    Action
                </Button>
                <Button variant="contained" onPress={onButtonPress}>
                    Action
                </Button>
            </Card.Actions>
        </Card>
    );
};

const cardsWithMediaStyles = StyleSheet.create({
    card: {
        maxWidth: 400,
    },
    image: {
        flex: 1,
    },
    button: {
        marginRight: 8,
    },
});

const image1Source = { uri: 'https://picsum.photos/id/146/700' };
const image2Source = { uri: 'https://picsum.photos/id/25/700' };
export const ComposedCardExample = (props: CardProps) => {
    const onButtonPress = useCallback(() => {}, []);
    const onIconButtonPress = useCallback(() => {}, []);

    return (
        <Card style={styles.card} variant="outlined" {...props}>
            <Card.Header>
                <IconButton name="account-circle-outline" size={28} />
            </Card.Header>
            <Card.Content>
                <Card.Media style={styles.media}>
                    <Image source={image1Source} style={styles.image1} />
                    <Image source={image2Source} style={styles.image2} />
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
                        onPress={onButtonPress}
                        style={styles.button}>
                        Action
                    </Button>
                    <Button variant="contained-tonal" size="sm" onPress={onButtonPress}>
                        Action
                    </Button>
                </View>
                <View style={styles.row}>
                    <IconButton
                        name="phone-outline"
                        size={28}
                        style={styles.button}
                        onPress={onIconButtonPress}
                    />
                    <IconButton name="message-text-outline" size={28} onPress={() => {}} />
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
    button: {
        marginRight: 8,
    },
});

export const CardsInCollection = () => {
    const onPressCard = useCallback(() => {}, []);

    const renderItem = useCallback(
        ({ item }: ListRenderItemInfo<(typeof data)[number]>) => (
            <Card
                style={cardsInCollectionStyles.card}
                variant="filled"
                key={item.id}
                onPress={onPressCard}>
                <Card.Media style={cardsInCollectionStyles.imageContainer}>
                    <Image source={{ uri: item.image }} style={cardsInCollectionStyles.image} />
                </Card.Media>
                <Card.Content>
                    <Card.Subhead size="md" style={cardsInCollectionStyles.subHead}>
                        {item.name}
                    </Card.Subhead>
                    <Card.Text>{item.size}</Card.Text>
                </Card.Content>
            </Card>
        ),
        [onPressCard],
    );

    return (
        <View style={cardsInCollectionStyles.container}>
            {/* <FlatGrid itemDimension={150} data={data} renderItem={renderItem} /> */}
        </View>
    );
};

const cardsInCollectionStyles = StyleSheet.create({
    container: {
        maxWidth: 600,
    },
    card: {
        flex: 1,
    },
    imageContainer: {
        height: 180,
        marginBottom: 0,
    },
    image: {
        flex: 1,
    },
    subHead: {
        marginBottom: 4,
    },
    button: {
        marginRight: 8,
    },
});

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
];
