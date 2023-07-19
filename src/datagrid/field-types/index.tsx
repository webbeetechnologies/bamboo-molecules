import { SingleLineTextFieldType } from './SingleLineText';
import { CheckboxFieldType } from './Checkbox';
import { NumberFieldType } from './Number';
import { RatingFieldType } from './Rating';

export const FieldTypes = {
    [SingleLineTextFieldType.type]: SingleLineTextFieldType,
    [CheckboxFieldType.type]: CheckboxFieldType,
    [NumberFieldType.type]: NumberFieldType,
    [RatingFieldType.type]: RatingFieldType,
};
