import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    value: true,
}

export const loadSlice = createSlice({
    name: 'load',
    initialState,
    reducers: {
        update: (state, action) => {
            state.value = action.payload ;
        }, 
    }
});


export const {update} = loadSlice.actions;

export default loadSlice.reducer;

