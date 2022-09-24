import { StyleSheet, View } from 'react-native';
import { Card, Headline } from 'react-native-paper';
import DesignTokens from './DesignTokens';

const style = StyleSheet.create({
    wrap: { gap: 15, padding: 15 } as any,
    cardTitle: {
        marginHorizontal: -2,
        marginTop: -2,
        marginBottom: 16,
        backgroundColor: '#d5d5d5',
    },
});

const CardHeader: typeof Headline = props => {
    return <Card.Title style={style.cardTitle} title={<Headline {...props} />} />;
};

export default () => {
    return (
        <View style={style.wrap}>
            <Card>
                <CardHeader children="Design Tokens" />
                <Card.Content>
                    <DesignTokens />
                </Card.Content>
            </Card>
        </View>
    );
};
