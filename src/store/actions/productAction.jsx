import axios from "../../utils/axios";
import { setdata } from "../reducers/productSlice";

export const asyncsetdata = () => async (dispatch, getState) => {
    try {
        let products = JSON.parse(localStorage.getItem("products"));

        if (!products || products.length === 0) {
            const { data } = await axios.get("/products");
            localStorage.setItem("products", JSON.stringify(data));
            products = data;
        }
        dispatch(setdata(products));
    } catch (error) {
        console.log(error);
    }
};