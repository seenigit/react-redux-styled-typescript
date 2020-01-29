import { ADD_NUMBER_PARTS } from './../actionTypes/partTypes';
import { NumberPartState, PartTypes } from '../actions/addNumberParts.d';

const INITIAL_STATE: NumberPartState = {
  data: [],
};

function partReducer(state = INITIAL_STATE, action: PartTypes): NumberPartState {
    switch (action.type) {
    
    case ADD_NUMBER_PARTS: {
      return {
        ...state,
        data: [action.payload, ...state.data],
      };
    }
    default:
      return state;
  }
}

export default partReducer;