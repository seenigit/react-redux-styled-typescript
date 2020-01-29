import { combineReducers } from 'redux';
import { reducer as reducerForm } from 'redux-form';
import partReducer from './part';

const rootReducer = combineReducers({
  form: reducerForm,
  part: partReducer,
});

export default rootReducer;