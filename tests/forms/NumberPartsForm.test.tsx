import React from 'react';
import { mount, shallow } from '../setup/test-setup';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";
import { combineReducers, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { ShallowWrapper } from 'enzyme';
import { reduxForm } from 'redux-form';
import { NumberPartsForm } from '../../src/components/forms/NumberPartsForm';
import validate from '../../src/components/forms/validate';


describe('<NumberPartsForm />', () => {
    let wrapper: any;

    describe('defines form field', () => {
        const props: any = {};
        
        wrapper = shallow(<NumberPartsForm {...props} />);

		it('renders number of parts field', () => {
			const numberOfPartsField = wrapper.find('[name="numberParts"]');

			expect(numberOfPartsField.prop('type')).toBe('text');
			expect(numberOfPartsField.prop('label')).toBe('Number of parts: ');
			expect(numberOfPartsField.prop('placeHolder')).toBe('Enter Number Of Parts');
        });
    });

    describe('form validation', () => {
        let numberOfPartsField: ShallowWrapper;
        let onSubmit:() => void;
        
        beforeAll(() => {
            onSubmit = jest.fn(() => console.log('Mocked Function'));
            const props:any = {
                handleSubmit: onSubmit
            }

            const NumberPartsFormDecorate = reduxForm({ form: 'part', validate })(NumberPartsForm);
            let store = createStore(combineReducers({ form: formReducer }));
            
            wrapper = mount(
                <Provider store={store}>
                    <Router>
                        <NumberPartsFormDecorate {...props} />
                    </Router>
                </Provider>
            );
        });

        it('shows error when number of parts field is set to blank', () => {
            numberOfPartsField = wrapper.find('input[name="numberParts"]');
            numberOfPartsField.simulate('blur');
            const errorBlock = wrapper.find('.text-danger');

            expect(errorBlock).toHaveLength(1);
            expect(errorBlock.text()).toBe('Number of parts is required');
        });

        it('shows error when number of parts field is filled with characters', () => {
            numberOfPartsField = wrapper.find('input[name="numberParts"]');
            numberOfPartsField.simulate('change', {target: {value: 'Testing'}});
            numberOfPartsField.simulate('blur');
            const errorBlock = wrapper.find('.text-danger');

            expect(errorBlock).toHaveLength(1);
            expect(errorBlock.text()).toBe('Number of parts should be number');
        });

        it("Submit form on click next button", () => {
            numberOfPartsField = wrapper.find('input[name="numberParts"]');
            numberOfPartsField.simulate('change', {target: {value: 'Testing'}});
            const nextBtn = wrapper.find('.next-button').first()
            nextBtn.simulate('click')

            expect(onSubmit).toHaveBeenCalledTimes(1)
        })
    });
});