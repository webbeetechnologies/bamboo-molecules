import { AccessibilityInfo } from 'react-native';
import '@testing-library/jest-dom/extend-expect';
import { configure } from 'reassure';

// eslint-disable-next-line no-undef
jest.useFakeTimers();
// eslint-disable-next-line no-undef
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// eslint-disable-next-line no-undef
jest.spyOn(AccessibilityInfo, 'isScreenReaderEnabled').mockImplementation(
    () => new Promise.resolve(false),
);

// eslint-disable-next-line no-undef
jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon');

configure({ testingLibrary: 'react-native', verbose: true });
