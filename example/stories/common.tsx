import React, { ComponentType, ReactNode } from 'react';
import {
    extendTheme,
    ProvideMolecules as DefaultProvideMolecules,
    useMolecules as useMoleculesDefault,
    useComponentStyles,
    TextProps,
} from 'bamboo-molecules';
import { linkTo } from '@storybook/addon-links';

import { addDecorator } from '@storybook/react';
import { withPerformance } from 'storybook-addon-performance';

// creating theme styles similar to mdx
export const theme = extendTheme({
    colorMode: 'light',
    H1: {
        marginTop: 20,
        marginBottom: 8,
        padding: 0,
        color: '#333333',
        fontSize: 34,
        fontWeight: '900',
    },
    H3: {
        marginTop: 20,
        marginBottom: 4,
        padding: 0,
        color: '#333333',
        fontSize: 21,
        fontWeight: '900',
    },
    Text: {
        lineHeight: 26,
        fontSize: 15,
        color: '#333333',
        marginVertical: 16,
    },
    Strong: {
        fontSize: 15,
        lineHeight: 24,
        color: '#333333',
    },
    Code: {
        lineHeight: 24,
        marginHorizontal: 2,
        paddingVertical: 3,
        paddingHorizontal: 5,
        whiteSpace: 'nowrap',
        borderRadius: 3,
        fontSize: 14,
        borderWidth: 1,
        borderColor: '#EEEEEE',
        color: 'rgba(51,51,51,0.9)',
        backgroundColor: '#F8F8F8',
    },
    DocLink: {
        fontSize: 15,
        lineHeight: 24,
        color: '#1a0dab',
        fontWeight: 500,
    },
});

type DocLinkProps = TextProps & {
    href: { idOrTitle: string; name?: string };
};

export interface InjectedComponentTypes {
    Code: ComponentType<TextProps>;
    DocLink: ComponentType<DocLinkProps>;
}

export const useMolecules = () => useMoleculesDefault<InjectedComponentTypes>();

addDecorator(Story => (
    <ProvideMolecules>
        <Story />
    </ProvideMolecules>
));

addDecorator(((getStory, context) => {
    return withPerformance(getStory, {
        ...context,
        parameters: {
            ...context?.parameters,
            performance: {
                allowedGroups: ['client'],
            },
        },
    });
}) as typeof withPerformance);

const Code = ({ style, ...rest }: TextProps) => {
    const { Text } = useMolecules();
    const codeStyles = useComponentStyles('Code', style);

    return <Text style={codeStyles} {...rest} />;
};

const DocLink = ({ style, href, ...rest }: DocLinkProps) => {
    const { Text } = useMolecules();
    const linkStyles = useComponentStyles('Link', style);

    return <Text style={linkStyles} {...rest} onPress={linkTo(href.idOrTitle, href?.name)} />;
};

const components = { Code, DocLink };

export const withDocsWrapper = (Component: () => JSX.Element) => (props: typeof Component) => {
    return (
        // @ts-ignore
        <DefaultProvideMolecules components={components} theme={theme}>
            <Component {...props} />
        </DefaultProvideMolecules>
    );
};

const storyTheme = extendTheme({
    colorMode: 'light',
});

export const ProvideMolecules = ({ children }: { children: ReactNode }) => {
    return <DefaultProvideMolecules theme={storyTheme}>{children}</DefaultProvideMolecules>;
};

export const generateSectionListData = (sectionsLength: number, dataLength: number) => {
    // Create an empty array
    const arr: { id: number; title: string; data: { id: number; title: string }[] }[] = [];

    // Loop n times
    for (let sectionIndex = 0; sectionIndex < sectionsLength; sectionIndex++) {
        // Create the title for the parent object
        const title = `section ${sectionIndex}`;

        // Create an empty array for the data property
        const data: { id: number; title: string }[] = generateFlatListData(
            dataLength,
            itemIndex => ({
                id: sectionIndex * dataLength + itemIndex,
                title: `item ${sectionIndex * dataLength + itemIndex}`,
            }),
        );

        // Create an object with the unique id, title, and data properties
        const obj = { id: sectionIndex, title, data };

        // Push the object into the array
        arr.push(obj);
    }

    // Return the array
    return arr;
};

export const generateFlatListData = (
    dataLength: number,
    manipulateOutputObj: (itemIndex: number) => { id: number; title: string } = i => ({
        id: i,
        title: `item ${i}`,
    }),
) => {
    // Create an empty array
    const arr: { id: number; title: string }[] = [];

    // Loop n times
    for (let i = 0; i < dataLength; i++) {
        // Create an object with the unique id, title, and data properties
        const obj = manipulateOutputObj(i);

        // Push the object into the array
        arr.push(obj);
    }

    // Return the array
    return arr;
};

export const delay = async (timeout: number) => {
    await new Promise(resolve => setTimeout(resolve, timeout));
};
