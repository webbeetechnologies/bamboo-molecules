import { StyleSheet, SafeAreaView, ScrollView, StatusBar, Platform } from 'react-native';
import { Card, Headline } from 'react-native-paper';
import DesignTokens from './DesignTokens';
import { ComponentsDemo } from './ComponentsDemo';

const style = StyleSheet.create({
    wrap: {
        flex: 1,
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        gap: 15,
        padding: 15,
    },
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
        <SafeAreaView style={style.wrap}>
            <ScrollView>
                <Card>
                    <CardHeader children="Design Tokens" />
                    <Card.Content>
                        <DesignTokens />
                    </Card.Content>
                </Card>
                <Card>
                    <CardHeader children="Components Demo" />
                    <Card.Content>
                        <ComponentsDemo />
                    </Card.Content>
                </Card>
            </ScrollView>
        </SafeAreaView>
    );
};
