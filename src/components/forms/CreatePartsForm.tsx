import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import ReduxFormInput from '../../components/forms/ReduxFormInput';
import { validate } from './partsFieldValidate';
import { PreviousBtn, NextBtn } from "./../../styles/style"

interface Props {
    previousPage: () => void;
    onSubmit: () => void;
}

var defaultSlots:any = {}

const mapStateToProps = (state: any) => {
    return {data: state.part.data}
};

export const CreatePartsForm: React.FC<Props & InjectedFormProps<{}, Props>> = (props: any) => {
  const { handleSubmit, previousPage } = props;
  
  useEffect(() => {
    defaultSlots = {}
    
    for(let i=0; i<parseInt(props.data[0]['numberParts']); i++) {
        defaultSlots['part_'+i] = ''
    }

    props.initialize(defaultSlots)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 
  const renderParts = ( ) => {
    return Object.keys(defaultSlots).map((x, index) => (
        <Field
                name={'part_'+index}
                type="text"
                key={index}
                component={ReduxFormInput}
                label={"Part " + (index + 1) + " %"}
        />
    ))
  }
    
    
  return (
    <form onSubmit={handleSubmit} noValidate={true}>
        <div className="col-sm-12">
            <div className="part-padding">
                {renderParts()}
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