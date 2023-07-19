export type Field = {
    id: string;
    type: string;
    returnType: string;
    displayTitle: string;
    returnField: Omit<Field, 'returnField' | 'id' | 'displayTitle'>;
    options: {
        [key: string]: any;
    };
    [key: string]: any;
};
