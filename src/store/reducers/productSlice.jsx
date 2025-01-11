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
        editdata: (state, action) => {
            const productIndex = state.data.findIndex((p) => p.id == action.payload.id)
            state.data[productIndex] = action.payload
            localStorage.setItem("products", JSON.stringify(state.data))
        },

        deletedata: (state, action) => {
            const data = state.data.filter((p) => p.id != action.payload)
            state.data = data
            localStorage.setItem("products", JSON.stringify(state.data))
        }
    }
});

export default productSlice.reducer;
export const { setdata, adddata, editdata, deletedata } = productSlice.actions;