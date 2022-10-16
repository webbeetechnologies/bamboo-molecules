import { AccessibilityInfo } from 'react-native';
// eslint-disable-next-line no-undef
jest.useFakeTimers();
// eslint-disable-next-line no-undef
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// eslint-disable-next-line no-undef
jest.spyOn(AccessibilityInfo, 'isScreenReaderEnabled').mockImplementation(
    () => new Promise.resolve(false),
);
