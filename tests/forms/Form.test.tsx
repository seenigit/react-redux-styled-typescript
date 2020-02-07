import React from 'react';
import { Form } from '../../src/components/forms/Form';
import { mount } from '../setup/test-setup';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from "react-router-dom";
import { NumberPartsForm } from '../../src/components/forms/NumberPartsForm';
import { CreatePartsForm } from '../../src/components/forms/CreatePartsForm';

const mockStore = configureStore();

describe('<Form />', () => {
    let wrapper: any;
    const mockedFunction = jest.fn();

    const props: any = {dispatch: mockedFunction};

    it('defines the component', () => {
        const initialState = {
            part: {data: [{partsnumberParts: "3"}]}
        };

        wrapper = mount(
            <Provider store={mockStore(initialState)}>
                <Router>
                    <Form {...props} /> />
                </Router>
            </Provider>,
        );
        expect(wrapper).toBeDefined();
    });

    it('defines the stepper component', () => {
        expect(wrapper.find('Stepper').first()).toBeDefined();
    });

    it('active step to be 0', () => {
        const stepper = wrapper.find('Stepper').first();

        expect(stepper.prop('activeStep')).toBe(0);
    });

    it('checks the active step', () => {
        const step = wrapper.find('Step').first();

        expect(step.prop('active')).toBeTruthy();
    });
        
    it('checks the second step', () => {
        const step = wrapper.find('Step').at(1);

        expect(step.prop('active')).toBeFalsy();
    });

    describe("events tests", () => {
        it('NumberPartsForm next-button click event',()=>{
            wrapper.find(NumberPartsForm).simulate('submit')
            expect(mockedFunction).toHaveBeenCalled()
            
            const stepper = wrapper.find('Stepper').first();
            expect(stepper.prop('activeStep')).toBe(1);

            let step = wrapper.find('Step').first();
            expect(step.prop('active')).toBeFalsy();
            
            step = wrapper.find('Step').at(1);
            expect(step.prop('active')).toBeTruthy();
        })

        it('CreatePartsForm previous-button click event',()=>{
            const prevBtn = wrapper.find('.prev-button').first();
            prevBtn.simulate('click');

            const stepper = wrapper.find('Stepper').first();
            expect(stepper.prop('activeStep')).toBe(0);

            let step = wrapper.find('Step').first();
            expect(step.prop('active')).toBeTruthy();
            
            step = wrapper.find('Step').at(1);
            expect(step.prop('active')).toBeFalsy();

            wrapper.find(NumberPartsForm).simulate('submit')
            expect(mockedFunction).toHaveBeenCalled()
        })

        it('CreatePartsForm next-button click event',()=>{
            wrapper.find(CreatePartsForm).simulate('submit')
            expect(mockedFunction).toHaveBeenCalled()

            const stepper = wrapper.find('Stepper').first();
            expect(stepper.prop('activeStep')).toBe(2);

            let step = wrapper.find('Step').at(1);
            expect(step.prop('active')).toBeFalsy();
            
            step = wrapper.find('Step').at(2);
            expect(step.prop('active')).toBeTruthy();
        })

        it('Success page component', () => {
            expect(wrapper.find('h1').text()).toBe('Success');
        })
    })
});