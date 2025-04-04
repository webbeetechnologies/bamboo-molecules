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
