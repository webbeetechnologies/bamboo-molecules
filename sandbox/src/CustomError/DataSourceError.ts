import { BambooError } from './BambooError';

export class DataSourceError extends BambooError {
    constructor(arg: string) {
        super(`DataSource Error: ${arg}`);
    }
}
