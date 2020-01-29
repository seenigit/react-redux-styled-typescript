import { ADD_NUMBER_PARTS } from '../actionTypes/partTypes';

export const addNumberParts = (data: any) => {
  return {
  payload: data,
  type: ADD_NUMBER_PARTS,
} };