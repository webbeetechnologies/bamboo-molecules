import { withDocsWrapper, useMolecules } from '../common';

const DocsPage = () => {
    const { View, H1, Text } = useMolecules();

    return (
        <View>
            <H1>FastContext</H1>
            <Text>Documentation is in progress..</Text>
        </View>
    );
};

export default withDocsWrapper(DocsPage);
