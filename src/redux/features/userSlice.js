import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    value: {}
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        update: (state) => {
           
        },
      
        
    }
});


export const {update} = userSlice.actions;

export default userSlice.reducer;

