import React from 'react';
import { connect } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import ReduxFormInput from '../../components/forms/ReduxFormInput';
import validate from './validate';
import { PreviousBtn, NextBtn } from "./../../styles/style"

interface Props {
    previousPage: any;
    onSubmit: any
}

const mapStateToProps = (state: { part : {data: any; }}) => {
    return { data: state.part.data };
  };

export const CreatePartsForm: React.FC<Props & InjectedFormProps<{}, Props>> = (props: any) => {
  const { handleSubmit, previousPage } = props;

  const createFields = () => 
    Array.apply(null, Array(parseInt(props.data[0]['numberParts']))).map((x, index) => {
        index++;
        return <Field
            name={"numberParts" + index}
            type="text"
            key={index}
            component={ReduxFormInput}
            label={"Part " + index + " %"} 
        /> 
    })
  
  
  return (
    <form onSubmit={handleSubmit} noValidate={true}>
        <div className="col-sm-12">
            <div className="part-padding">
                {createFields()}
            </div>
            
            <div className="form-group">
                <div className="col-6 float-right">                    
                    <PreviousBtn onClick={previousPage}
                    > 
                        Previous
                    </PreviousBtn>
                
                    <NextBtn
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
  form: 'create_part',
  validate,
})(CreatePartsForm);

export default connect(mapStateToProps)(form);