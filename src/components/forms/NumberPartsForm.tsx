
import React from 'react';
import { connect } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import ReduxFormInput from '../../components/forms/ReduxFormInput';
import validate from './validate';
import { PreviousBtn, NextBtn } from "./../../styles/style"
import { Link } from "react-router-dom";

interface Props { 
    onSubmit: any
};

//'any' type added for 'NumberPartsForm.test.tsx'
export const NumberPartsForm: React.FC<Props & InjectedFormProps<{}, Props> | any> = (props) => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit} noValidate={true}>
        <div className="col-sm-12">
            <div className="number-part-padding">
                <Field
                    name="numberParts"
                    type="text"
                    component={ReduxFormInput}
                    label="Number of parts: "
                    placeHolder="Enter Number Of Parts"
                />
            </div>
            
            <div className="form-group">
                <div className="col-6 float-right">
                    <Link to="/">
                        <PreviousBtn className="prev-button"
                        > 
                            Previous
                        </PreviousBtn>
                    </Link>
                
                
                    <NextBtn className="next-button"
                        onClick={handleSubmit}
                    >
                        Next
                    </NextBtn>
                </div>
            </div>
        </div>
    </form>
  );
}

const form = reduxForm<{}, Props>({
  form: 'part',
  validate,
})(NumberPartsForm);

export default connect(null)(form);