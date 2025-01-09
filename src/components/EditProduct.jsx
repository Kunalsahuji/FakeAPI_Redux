import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductContext } from '../utils/Context';
import Loading from './Loding';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProduct = () => {
    const [products, setProducts] = useContext(ProductContext);
    const [product, setProduct] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setProduct(products.find((p) => p.id == id));
    }, [id, products]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({ ...prev, [name]: value }));
    };

    const saveChanges = () => {
        const updatedProducts = products.map((p) =>
            p.id == id ? product : p
        );
        setProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        toast.success("Product updated!", {
            position: "top-center",
            autoClose: 1000,
            theme: "colored",
        });
        navigate(`/details/${id}`);
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
                    value={product.image}
                />
                <input
                    type="text"
                    name="title"
                    value={product.title}
                    onChange={handleInputChange}
                    placeholder="Title"
                    className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="text"
                    name="category"
                    value={product.category}
                    onChange={handleInputChange}
                    placeholder="Category"
                    className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleInputChange}
                    placeholder="Price"
                    className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <textarea
                    name="description"
                    value={product.description}
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
