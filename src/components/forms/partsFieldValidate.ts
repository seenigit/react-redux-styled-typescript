import { FormErrors } from 'redux-form';

export const validate = (values: any): FormErrors => {
    const errors: any = {};

    for(let i=0; i<Object.keys(values).length; i++) {
        if(!values['part_'+i]) {
            errors['part_'+i] = 'Part ' + (i + 1) + ' % is required'
        }
        else if(isNaN(values['part_'+i])) {
            errors['part_'+i] = 'Part ' + (i + 1) + ' % should be number'
        } else if(parseInt(values['part_'+i]) !== 100) {
            errors['part_'+i] = 'Part ' + (i + 1) + ' % should be 100'
        }
    }
    
    return errors;
  };