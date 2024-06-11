import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    addSale: (state, action) => {
      /*  state.value = [...state.value, ...action.payload]; */

      const index = state.value.findIndex(sale => sale.uid === action.payload.uid);
      if (index !== -1) {
        state.value[index] = action.payload;
      } else {
        state.value.push(action.payload);
      }

    },

    removeSale: (state, action) => {
      const uidToRemove = action.payload;
      state.value = state.value.filter(sale => sale.uid !== uidToRemove);
    },

    reset: (state) => {
      state.value = initialState.value;
    },
  },
});

export const { addSale } = salesSlice.actions;

export default salesSlice.reducer;
