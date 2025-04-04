import { Repository } from './repository';

export const componentsRepository = new Repository<Record<string, any>>({
    name: 'Components_Repository',
    maxListeners: 0,
});

export const componentsStylesRepository = new Repository<Record<string, any>>({
    name: 'Components_Styles_Repository',
    maxListeners: 0,
});
