import React, { useState } from 'react';
import { InjectedFormProps } from 'redux-form';
import Stepper from 'react-stepper-horizontal';
import { connect } from 'react-redux';
import NumberPartsForm from './NumberPartsForm';
import CreatePartsForm from './CreatePartsForm';
import Success from './../pages/SuccessStep';
import { addNumberParts } from '../../redux/actions/addNumberParts';


export const Form: React.FC<InjectedFormProps> = (props: any) => {
    const [page, setPage] = useState<number>(0);
    const steps = [{ title: '' }, { title: '' }, { title: '' }];

    const onSubmitPageOne = (values: string): void => {
        props.dispatch(addNumberParts(values));
        nextPage();
    };

    const onSubmitPageTwo = (): void => {
        nextPage();
    };

    const nextPage = (): void => {
        setPage(page + 1);
    };

    const previousPage = (): void => {
        setPage(page - 1);
    };

    return (
        <div id="parts-container">
            <Stepper steps={steps} activeStep={page} size={70} circleFontSize={42} defaultBarColor={'royalblue'} 
            lineMarginOffset={0} defaultBorderWidth={10} completeBarColor={'royalblue'} defaultOpacity={'0.5'} 
            completeColor={'royalblue'} defaultColor={'royalblue'} activeColor={'royalblue'} />
            {page === 0 && <NumberPartsForm onSubmit={onSubmitPageOne} />}
            {page === 1 && (
                <CreatePartsForm previousPage={previousPage} onSubmit={onSubmitPageTwo} />
            )}
            {page === 2 && <Success />}
        </div>
    );
}

export default connect(null)(Form);