export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';

const SET_OPTION = 'SET_OPTION';

export const setOption = (option) => ({
    type: SET_OPTION,
    payload: option
})