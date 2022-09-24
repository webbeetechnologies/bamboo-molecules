export { Icon, registerCustomIconType, IconProps } from './components';

export {
    ProvideMolecules,
    ProvideComponents,
    ConsumeComponents,
    extractComponents,
    PlatformTypeContext,
    ProvidePlatformType,
    ProvideTheme,
    extendTheme,
    ITheme,
    PlatformType,
    IComponentsProviderContext,
} from './core';

export { useMolecules, usePlatformType, useComponentTheme, useTheme } from './hooks';

export { normalizeStyles } from './utils';
