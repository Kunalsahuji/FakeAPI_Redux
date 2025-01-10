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
        adddata: (state, action) => {
            state.data.push(action.payload);
            localStorage.setItem("products", JSON.stringify(state.data));
        },

    }
});

export default productSlice.reducer;
export const { setdata, adddata } = productSlice.actions;