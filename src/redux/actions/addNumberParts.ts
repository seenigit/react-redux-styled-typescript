import { ADD_NUMBER_PARTS } from '../actionTypes/partTypes';

export const addNumberParts = (data: string) => {
  return {
  payload: data,
  type: ADD_NUMBER_PARTS,
} };