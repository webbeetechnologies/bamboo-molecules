import { withDocsWrapper, useMolecules } from '../common';

const DocsPage = () => {
    const { View, H1, Text } = useMolecules();

    return (
        <View>
            <H1>Shortcuts Manager</H1>
            <Text>Documentation is in progress..</Text>
        </View>
    );
};

export default withDocsWrapper(DocsPage);
