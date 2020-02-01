import { FormErrors } from 'redux-form';
import { PartsFieldsParam } from './../../interfaces/NumberParts.d';

export const validate = (values: any): FormErrors<PartsFieldsParam> => {
    const errors: FormErrors<PartsFieldsParam | any> = {};

    for(let i=0; i<Object.keys(values).length; i++) {
        if(!values['part_'+i]) {
            errors['part_'+i] = 'Part percent is required'
        }
        else if(isNaN(values['part_'+i])) {
            errors['part_'+i] = 'Part percent should be number'
        } else if(parseInt(values['part_'+i]) !== 100) {
            errors['part_'+i] = 'Part percent should be 100'
        }
    }
    
    return errors;
  };