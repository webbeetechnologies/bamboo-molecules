import { useMemo } from 'react';
import type { TextStyle } from 'react-native';

import { useComponentStyles, useMolecules } from '../../hooks';
import type { ModeType } from '../DatePickerInline';
import type { LocalState } from './DatePickerModalContent';

export interface HeaderPickProps {
    moreLabel?: string;
    label?: string;
    emptyLabel?: string;
    saveLabel?: string;
    uppercase?: boolean;
    headerSeparator?: string;
    startLabel?: string;
    endLabel?: string;
    editIcon?: string;
    calendarIcon?: string;
    closeIcon?: string;
}

export interface HeaderContentProps extends HeaderPickProps {
    state: LocalState;
    mode: ModeType;
    collapsed: boolean;
    onToggle: () => any;
    locale: string | undefined;
    textStyle?: TextStyle;
    separatorStyle?: TextStyle;
}

function getLabel(mode: ModeType, configuredLabel?: string) {
    if (configuredLabel) {
        return configuredLabel;
    }
    if (mode === 'range') {
        return 'Select period';
    }
    if (mode === 'multiple') {
        return 'Select dates';
    }
    if (mode === 'single') {
        return 'Select date';
    }
    return '...';
}

export default function DatePickerModalContentHeader(props: HeaderContentProps) {
    const {
        onToggle,
        collapsed,
        mode,
        moreLabel,
        uppercase,
        editIcon = 'pencil',
        calendarIcon = 'calendar',
    } = props;

    const label = getLabel(props.mode, props.label);
    const { IconButton, Text, View } = useMolecules();
    const componentStyles = useComponentStyles('DatePickerModal_ContentHeader');

    const allowEditing = mode !== 'multiple';

    const {
        fillContainerStyle,
        headerContentContainerStyle,
        headerStyle,
        labelStyle,
        headerTextStyle,
        separatorStyle,
        iconButtonStyle,
    } = useMemo(() => {
        const {
            fill,
            headerContentContainer,
            header,
            label: _labelStyle,
            headerText,
            headerSeparator,
            icon,
        } = componentStyles;

        return {
            fillContainerStyle: fill,
            headerContentContainerStyle: headerContentContainer,
            headerStyle: header,
            labelStyle: _labelStyle,
            headerTextStyle: headerText,
            separatorStyle: headerSeparator,
            iconButtonStyle: icon,
        };
    }, [componentStyles]);

    return (
        <View style={headerStyle}>
            <View>
                <Text style={labelStyle}>{uppercase ? label.toUpperCase() : label}</Text>
                <View style={headerContentContainerStyle}>
                    <>
                        {mode === 'range' ? (
                            <HeaderContentRange
                                {...props}
                                textStyle={headerTextStyle}
                                separatorStyle={separatorStyle}
                            />
                        ) : null}
                    </>
                    <>
                        {mode === 'single' ? (
                            <HeaderContentSingle {...props} textStyle={headerTextStyle} />
                        ) : null}
                    </>
                    <>
                        {mode === 'multiple' ? (
                            <HeaderContentMulti
                                {...props}
                                moreLabel={moreLabel}
                                textStyle={headerTextStyle}
                            />
                        ) : null}
                    </>
                </View>
            </View>
            <View style={fillContainerStyle} />
            <>
                {allowEditing ? (
                    <IconButton
                        name={collapsed ? editIcon : calendarIcon}
                        accessibilityLabel={collapsed ? 'Type in date' : 'Pick date from calendar'}
                        style={iconButtonStyle as any}
                        onPress={onToggle}
                    />
                ) : null}
            </>
        </View>
    );
}

export function HeaderContentSingle({
    state,
    emptyLabel = ' ',
    locale,
    textStyle,
}: HeaderContentProps) {
    const { Text } = useMolecules();

    const formatter = useMemo(() => {
        return new Intl.DateTimeFormat(locale, {
            month: 'short',
            day: 'numeric',
        });
    }, [locale]);

    return <Text style={textStyle}>{state.date ? formatter.format(state.date) : emptyLabel}</Text>;
}

export function HeaderContentMulti({
    state,
    emptyLabel = ' ',
    moreLabel = 'more',
    textStyle,
}: HeaderContentProps & { moreLabel: string | undefined }) {
    const dateCount = state.dates?.length || 0;
    const { Text } = useMolecules();

    const formatter = useMemo(() => {
        return new Intl.DateTimeFormat('en', {
            month: 'short',
            day: 'numeric',
        });
    }, []);

    let label = emptyLabel;
    if (dateCount) {
        if (dateCount <= 2) {
            label = state.dates!.map(date => formatter.format(date)).join(', ');
        } else {
            label = formatter.format(state.dates![0]) + ` (+ ${dateCount - 1} ${moreLabel})`;
        }
    }

    return <Text style={textStyle}>{label}</Text>;
}

export function HeaderContentRange({
    locale,
    state,
    headerSeparator = '-',
    startLabel = 'Start',
    endLabel = 'End',
    textStyle,
    separatorStyle,
}: HeaderContentProps) {
    const { Text } = useMolecules();

    const formatter = useMemo(() => {
        return new Intl.DateTimeFormat(locale, {
            month: 'short',
            day: 'numeric',
        });
    }, [locale]);

    return (
        <>
            <Text style={textStyle}>
                {state.startDate ? formatter.format(state.startDate) : startLabel}
            </Text>
            <Text style={separatorStyle}>{headerSeparator}</Text>
            <Text style={textStyle}>
                {state.endDate ? formatter.format(state.endDate) : endLabel}
            </Text>
        </>
    );
}
