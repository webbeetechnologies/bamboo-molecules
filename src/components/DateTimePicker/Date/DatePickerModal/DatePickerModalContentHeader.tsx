import { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import type { ModeType } from '../Calendar/Calendar';
import type { LocalState } from './DatePickerModalContent';
import { useHeaderTextColor } from '../../utils';
import Color from 'color';
import { getTranslation } from '../../translations/utils';
import { useMolecules } from '../../../../hooks';

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
}

function getLabel(locale: string | undefined, mode: ModeType, configuredLabel?: string) {
    if (configuredLabel) {
        return configuredLabel;
    }
    if (mode === 'range') {
        return getTranslation(locale, 'selectRange');
    }
    if (mode === 'multiple') {
        return getTranslation(locale, 'selectMultiple');
    }
    if (mode === 'single') {
        return getTranslation(locale, 'selectSingle');
    }
    return '...?';
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

    const label = getLabel(props.locale, props.mode, props.label);
    const { IconButton, Text } = useMolecules();

    const color = useHeaderTextColor();
    const allowEditing = mode !== 'multiple';

    const { headerStyle, labelStyle } = useMemo(() => {
        return {
            headerStyle: [styles.header],
            labelStyle: [styles.label, { color }],
        };
    }, [color]);

    return (
        <View style={headerStyle}>
            <View>
                <Text style={labelStyle}>{uppercase ? label.toUpperCase() : label}</Text>
                <View style={styles.headerContentContainer}>
                    <>{mode === 'range' ? <HeaderContentRange {...props} color={color} /> : null}</>
                    <>
                        {mode === 'single' ? (
                            <HeaderContentSingle {...props} color={color} />
                        ) : null}
                    </>
                    <>
                        {mode === 'multiple' ? (
                            <HeaderContentMulti {...props} color={color} moreLabel={moreLabel} />
                        ) : null}
                    </>
                </View>
            </View>
            <View style={styles.fill} />
            <>
                {allowEditing ? (
                    <IconButton
                        name={collapsed ? editIcon : calendarIcon}
                        accessibilityLabel={
                            collapsed
                                ? getTranslation(props.locale, 'typeInDate')
                                : getTranslation(props.locale, 'pickDateFromCalendar')
                        }
                        style={{ color } as any}
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
    color,
    locale,
}: HeaderContentProps & { color: string }) {
    const lighterColor = Color(color).fade(0.5).rgb().toString();
    const dateColor = state.date ? color : lighterColor;
    const { Text } = useMolecules();

    const formatter = useMemo(() => {
        return new Intl.DateTimeFormat(locale, {
            month: 'short',
            day: 'numeric',
        });
    }, [locale]);

    return (
        <Text style={[styles.singleHeaderText, { color: dateColor }]}>
            {state.date ? formatter.format(state.date) : emptyLabel}
        </Text>
    );
}

export function HeaderContentMulti({
    state,
    emptyLabel = ' ',
    moreLabel = 'more',
    color,
    locale,
}: HeaderContentProps & { color: string; moreLabel: string | undefined }) {
    const dateCount = state.dates?.length || 0;
    const lighterColor = Color(color).fade(0.5).rgb().toString();
    const dateColor = dateCount ? color : lighterColor;
    const { Text } = useMolecules();

    const formatter = useMemo(() => {
        return new Intl.DateTimeFormat(locale, {
            month: 'short',
            day: 'numeric',
        });
    }, [locale]);

    let label = emptyLabel;
    if (dateCount) {
        if (dateCount <= 2) {
            label = state.dates!.map(date => formatter.format(date)).join(', ');
        } else {
            label = formatter.format(state.dates![0]) + ` (+ ${dateCount - 1} ${moreLabel})`;
        }
    }

    return <Text style={[styles.singleHeaderText, { color: dateColor }]}>{label}</Text>;
}

export function HeaderContentRange({
    locale,
    state,
    headerSeparator = '-',
    startLabel = 'Start',
    endLabel = 'End',
    color,
}: HeaderContentProps & { color: string }) {
    const { Text } = useMolecules();

    const formatter = useMemo(() => {
        return new Intl.DateTimeFormat(locale, {
            month: 'short',
            day: 'numeric',
        });
    }, [locale]);

    const lighterColor = Color(color).fade(0.5).rgb().toString();
    const startColor = state.startDate ? color : lighterColor;
    const endColor = state.endDate ? color : lighterColor;

    return (
        <>
            <Text style={[styles.rangeHeaderText, { color: startColor }]}>
                {state.startDate ? formatter.format(state.startDate) : startLabel}
            </Text>
            <Text style={[styles.headerSeparator, { color }]}>{headerSeparator}</Text>
            <Text style={[styles.rangeHeaderText, { color: endColor }]}>
                {state.endDate ? formatter.format(state.endDate) : endLabel}
            </Text>
        </>
    );
}

const styles = StyleSheet.create({
    fill: {
        flex: 1,
    },
    animated: {
        paddingBottom: 0,
        elevation: 4,
    },
    safeContent: {
        paddingBottom: 0,
    },
    header: {
        height: 75,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 24,
        paddingRight: 12,
    },
    headerContentContainer: { marginTop: 5, flexDirection: 'row' },
    label: { color: '#fff', letterSpacing: 1, fontSize: 13 },
    singleHeaderText: { color: '#fff', fontSize: 25 },
    rangeHeaderText: { color: '#fff', fontSize: 25 },
    excludeInRangeHeaderText: { fontSize: 25 },
    excludeInRangeHeaderTextSmall: {
        fontSize: 14,
        marginTop: -3,
        marginLeft: 3,
    },

    headerSeparator: {
        color: 'rgba(255,255,255,1)',
        fontSize: 25,
        paddingLeft: 6,
        paddingRight: 6,
    },
    appbarHeader: {
        elevation: 0,
    },
    column: { flexDirection: 'column' },
    row: { flexDirection: 'row' },
});
