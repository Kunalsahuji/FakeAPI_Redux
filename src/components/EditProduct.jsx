import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from './Loding';
import { useDispatch, useSelector } from 'react-redux';
import { editdata } from '../store/actions/productAction';
import { toast } from 'react-toastify';

const EditProduct = () => {
    const dispatch = useDispatch()
    const { data: products } = useSelector(state => state.products)
    const [product, setProduct] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!product) setProduct(products.find((p) => p.id == id));
    }, [id, product]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: name === "price" ? parseFloat(value) || 0 : value, // Convert price to a number or set to 0 if invalid
        }));
    };
    
    const saveChanges = (e) => {
        e.preventDefault();
    
        if (
            product.title.trim().length < 5 ||
            product.image.trim().length < 5 ||
            product.category.trim().length < 5 ||
            product.price <= 0 || // Adjusted to check for a valid number
            product.description.trim().length < 5
        ) {
            toast.error("Each input must have valid values. Title, image, category, and description should have at least 5 characters, and price must be greater than 0.");
            return;
        }
    
        dispatch(editdata(product));
        toast.success("Product Updated!", {
            position: "top-right",
            autoClose: 1000,
            theme: "colored",
        });
        navigate(-1);
    };
    

    return product ? (
        <div className="w-[90%] lg:w-[70%] m-auto p-5  bg-white shadow-md rounded-lg overflow-x-hidden overflow-y-auto">
            <h1 className="text-3xl font-bold mb-5">Edit Product</h1>
            <div className="flex flex-col gap-4">
                <input
                    type="url"
                    name='image'
                    placeholder="Image URL"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onChange={handleInputChange}
                    value={product?.image}
                />
                <input
                    type="text"
                    name="title"
                    value={product?.title}
                    onChange={handleInputChange}
                    placeholder="Title"
                    className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="text"
                    name="category"
                    value={product?.category}
                    onChange={handleInputChange}
                    placeholder="Category"
                    className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="number"
                    name="price"
                    value={product?.price}
                    onChange={handleInputChange}
                    placeholder="Price"
                    className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <textarea
                    name="description"
                    value={product?.description}
                    onChange={handleInputChange}
                    placeholder="Description"
                    rows='5'
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                ></textarea>
                <button
                    onClick={saveChanges}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-all duration-300"
                >
                    Save Changes
                </button>
            </div>
        </div>
    ) : (
        <Loading />
    );
};

export default EditProduct;
