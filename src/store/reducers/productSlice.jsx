import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setdata: (state, action) => {
            state.data = action.payload;
        },
    },
});

export default productSlice.reducer;
export const { setdata } = productSlice.actions;