import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example, ExampleCenterAligned, ExampleSmall, ExampleMedium, ExampleLarge } from './Appbar';

export default {
    title: 'components/Appbar',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {
    scrolling: false,
};

Default.parameters = {
    docs: {
        source: {
            code: `
    const { Appbar, IconButton } = useMolecules();

    return (
        <Appbar>
            <Appbar.Left>
                <IconButton name="menu" onPress={onToggleDrawerMenu} />
            </Appbar.Left>
            <Appbar.Title>Default Appbar</Appbar.Title>
            <Appbar.Right>
                <IconButton name="star-outline" onPress={onMarkFavorite} />
                <IconButton name="pin-outline" onPress={onPin} />
                <IconButton name="dots-vertical" onPress={onToggleMenu} />
            </Appbar.Right>
        </Appbar>
    );
 `,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const CenterAligned: ComponentStory<typeof ExampleCenterAligned> = args => (
    <ExampleCenterAligned {...args} />
);

CenterAligned.args = {
    scrolling: false,
};

CenterAligned.parameters = {
    docs: {
        source: {
            code: `
 const { Appbar, IconButton } = useMolecules();

    return (
        <Appbar.CenterAligned>
            <Appbar.Left>
                <IconButton name="menu" onPress={onToggleDrawerMenu} />
            </Appbar.Left>
            <Appbar.Title>Title Large</Appbar.Title>
            <Appbar.Right>
                <IconButton name="heart-outline" onPress={onSaveToFavorite} />
                <IconButton name="dots-vertical" onPress={onToggleMenu} />
            </Appbar.Right>
        </Appbar.CenterAligned>
    );`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const Small: ComponentStory<typeof ExampleSmall> = args => <ExampleSmall {...args} />;

Small.args = {
    scrolling: false,
};

Small.parameters = {
    docs: {
        source: {
            code: `
    const { Appbar, IconButton } = useMolecules();

    return (
        <Appbar.Small>
            <Appbar.Left>
                <IconButton name="arrow-left" onPress={onPressBack} />
            </Appbar.Left>
            <Appbar.Title>Title Large</Appbar.Title>
            <Appbar.Right>
                <IconButton name="phone-outline" onPress={onPressPhone} />
                <IconButton name="magnify" onPress={onSearch} />
                <IconButton name="dots-vertical" onPress={onToggleMenu} />
            </Appbar.Right>
        </Appbar.Small>
    );`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const Medium: ComponentStory<typeof ExampleMedium> = args => <ExampleMedium {...args} />;

Medium.args = {
    scrolling: false,
};

Medium.parameters = {
    docs: {
        source: {
            code: `
    const { Appbar, IconButton } = useMolecules();

    return (
        <Appbar.Medium>
            <Appbar.Left>
                <IconButton name="arrow-left" onPress={onPressBack} />
            </Appbar.Left>
            <Appbar.Title>Headline Small</Appbar.Title>
            <Appbar.Right>
                <IconButton name="paperclip" onPress={onUpload} />
                <IconButton name="calendar" onPress={onOpenCalendar} />
                <IconButton name="dots-vertical" onPress={onToggleMenu} />
            </Appbar.Right>
        </Appbar.Medium>
    );`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const Large: ComponentStory<typeof ExampleLarge> = args => <ExampleLarge {...args} />;

Large.args = {
    scrolling: false,
};

Large.parameters = {
    docs: {
        source: {
            code: `
    const { Appbar, IconButton } = useMolecules();

    return (
        <Appbar.Large>
            <Appbar.Left>
                <IconButton name="arrow-left" onPress={onPressBack} />
            </Appbar.Left>
            <Appbar.Title>Headline Medium</Appbar.Title>
            <Appbar.Right>
                <IconButton name="paperclip" onPress={onUpload} />
                <IconButton name="calendar" onPress={onOpenCalendar} />
                <IconButton name="dots-vertical" onPress={onToggleMenu} />
            </Appbar.Right>
        </Appbar.Large>
    );`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
