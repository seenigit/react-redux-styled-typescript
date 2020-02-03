import React from 'react';
import { mount } from '../setup/test-setup';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";
import { combineReducers, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reduxForm } from 'redux-form';
import { CreatePartsForm } from '../../src/components/forms/CreatePartsForm';
import { validate } from '../../src/components/forms/partsFieldValidate';


describe('<CreatePartsForm />', () => {
    let mockFuncion:() => void;
    let wrapper:any;

    beforeAll(() => {
        mockFuncion = jest.fn(() => console.log('Mocked Function'));
        const props:any = {
            handleSubmit: mockFuncion,
            previousPage: mockFuncion,
            data: [{'numberParts' : 2}]
        }

        const CreatePartsFormDecorate = reduxForm({ form: 'create_part', validate })(CreatePartsForm);
        let store = createStore(combineReducers({ form: formReducer }));
        
        wrapper = mount(
            <Provider store={store}>
                <Router>
                    <CreatePartsFormDecorate {...props} />
                </Router>
            </Provider>
        );
    });

    it('renders part fields', () => {
        const partFields = wrapper.find('input[name*="part_"]');
        expect(partFields).toHaveLength(2);

        for(let i=0; i<=1; i++) {
            let partField = wrapper.find('input[name="part_'+ i + '"]');

            expect(partField.prop('type')).toBe('text');
        }
    });

    it('shows error when part fields are set to blank', () => {
        for(let i=0; i<=1; i++) {
            let partField = wrapper.find('input[name="part_'+ i + '"]');
            partField.simulate('blur');
            const errorBlock = wrapper.find('.text-danger').at(i)
            expect(errorBlock.text()).toBe('Part ' + (i + 1) + ' % is required');
        }
    });

    it('shows error when part fields are filled with characters', () => {
        for(let i=0; i<=1; i++) {
            let partField = wrapper.find('input[name="part_'+ i + '"]');
            partField.simulate('change', {target: {value: 'Testing'}});
            partField.simulate('blur');
            const errorBlock = wrapper.find('.text-danger').at(i)
            expect(errorBlock.text()).toBe('Part ' + (i + 1) + ' % should be number');
        }
    });

    it('shows error when part fields are filled with less than 100', () => {
        for(let i=0; i<=1; i++) {
            let partField = wrapper.find('input[name="part_'+ i + '"]');
            partField.simulate('change', {target: {value: 50}});
            partField.simulate('blur');
            const errorBlock = wrapper.find('.text-danger').at(i)
            expect(errorBlock.text()).toBe('Part ' + (i + 1) + ' % should be 100');
        }
    });

    it("Submit form on click next button", () => {
        for(let i=0; i<=1; i++) {
            let partField = wrapper.find('input[name="part_'+ i + '"]');
            partField.simulate('change', {target: {value: 100}});
        }
        
        const nextBtn = wrapper.find('.next-button').first();
        nextBtn.simulate('click');

        expect(mockFuncion).toHaveBeenCalled();

        const prevBtn = wrapper.find('.prev-button').first();
        prevBtn.simulate('click');

        expect(mockFuncion).toHaveBeenCalled();
    })
});