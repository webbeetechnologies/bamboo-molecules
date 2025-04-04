import { ComponentType } from 'react';

import { Repository } from './repository';

export const componentsRepository = new Repository<Record<string, any>>({
    name: 'Components_Repository',
    maxListeners: 0,
});

export const componentsStylesRepository = new Repository<Record<string, any>>({
    name: 'Components_Styles_Repository',
    maxListeners: 0,
});

export const registerMoleculesComponent = componentsRepository.registerOne;
export const registerMoleculesComponents = componentsRepository.register;
export const registerComponentStyles = componentsStylesRepository.registerOne;
export const registerComponentsStyles = componentsStylesRepository.register;

export const getRegisteredMoleculesComponent = componentsRepository.get;
export const getRegisteredMoleculesComponentStyles = componentsStylesRepository.get;

/**
 * Gets a registered component with a fallback to the default component
 * @param name The name of the component to retrieve
 * @param defaultComponent The default component to use as fallback
 * @returns The registered component or the default component
 */
export function getRegisteredComponentWithFallback<T extends ComponentType<any>>(
    name: string,
    defaultComponent: T,
): T {
    return (getRegisteredMoleculesComponent(name) ?? defaultComponent) as T;
}
