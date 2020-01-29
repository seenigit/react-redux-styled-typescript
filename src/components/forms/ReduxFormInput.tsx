import React from 'react';
import { FormGroup } from "./../../styles/style"

const ReduxFormInput: React.FC = (field: any) => (
    <FormGroup>
        <label htmlFor={field.name} className="form-label">{field.label}</label>
        <input
            {...field.input}
            type={field.type}
            placeholder={field.placeHolder}
            max={field.maxDate}
            min={field.minDate}
            step={field.step}
            disabled={field.disabled}
        />
        {field.meta.touched && <p className="text-danger">{field.meta.error}</p>}
    </FormGroup>
);

export default ReduxFormInput;