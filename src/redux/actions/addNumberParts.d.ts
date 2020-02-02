import { ADD_NUMBER_PARTS } from './../actionTypes/partTypes';

export interface NumberPartState {
    data: string[];
}

export type PartTypes = {
    type: ADD_NUMBER_PARTS;
    payload: any;
};