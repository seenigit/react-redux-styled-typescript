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

    const props: any = {};

    describe('defines form field', () => {
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

        beforeEach(() => {
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
            numberOfPartsField = wrapper.find('input[name="numberParts"]').first();
            numberOfPartsField.simulate('blur');
            const errorBlock = wrapper.find('.text-danger');

            expect(errorBlock).toHaveLength(1);
            expect(errorBlock.text()).toBe('Number of parts is required');
        });
    });
});