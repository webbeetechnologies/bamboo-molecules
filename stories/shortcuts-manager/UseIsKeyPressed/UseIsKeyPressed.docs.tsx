import { withDocsWrapper, useMolecules } from '../../common';

const DocsPage = () => {
    const { View, H1, Code, Text } = useMolecules();

    return (
        <View>
            <H1>useIsKeyPressed hook</H1>

            <Text>
                <Code>useIsKeyPressed</Code> hook can be use to track if a key's been pressed down
            </Text>
            <Text>
                It accepts a key and returns boolean value. If a key being pressed and hold, it will
                return true.
            </Text>
        </View>
    );
};

export default withDocsWrapper(DocsPage);
