import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Home from '../../src/components/pages/Home';
import { mount } from '../setup/test-setup';
import { BrowserRouter as Router, Route } from "react-router-dom";


const mockStore = configureStore();

describe('<Home />', () => {
  let wrapper: any;

  it('defines the component', () => {
    wrapper = mount(
      <Provider store={mockStore()}>
        <Router>
          <Route path="/" component={Home} />
        </Router>
      </Provider>,
    );

    expect(wrapper).toBeDefined();
  });

  it('renders form component', () => {
    expect(wrapper.find('div').text()).toEqual('New Request')
  });
});