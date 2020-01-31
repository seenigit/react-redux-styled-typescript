import React from 'react';
import { Form } from '../../src/components/forms/Form';
import { mount } from '../setup/test-setup';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from "react-router-dom";

const mockStore = configureStore();

describe('<Form />', () => {
    let wrapper: any;

    const props: any = {};

    it('defines the component', () => {
        wrapper = mount(
            <Provider store={mockStore()}>
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
});