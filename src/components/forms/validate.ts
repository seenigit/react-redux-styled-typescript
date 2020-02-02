import { FormErrors } from 'redux-form';
import { NumberPartsParam } from './../../interfaces/NumberParts.d';

const validate = (values: NumberPartsParam): FormErrors<NumberPartsParam> => {
    const errors: FormErrors<NumberPartsParam> = {};

    if (!values.numberParts) {
      errors.numberParts = 'Number of parts is required';
    } else if(isNaN(values.numberParts)) {
      errors.numberParts = 'Number of parts should be number'
    }

    return errors;
};

export default validate;