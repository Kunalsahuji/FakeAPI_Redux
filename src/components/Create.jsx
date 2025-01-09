import React, { useContext, useState } from 'react';
import { ProductContext } from '../utils/Context';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Create = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const [products, setProducts] = useContext(ProductContext);

    const submitHandler = (e) => {
        e.preventDefault();

        // Validation for input fields
        if (
            !title.trim() ||
            !image.trim() ||
            !category.trim() ||
            !price.trim() ||
            !description.trim()
        ) {
            toast.error('All fields are mandatory!', { position: 'top-center', autoClose: 1000, theme: 'colored' });
            return;
        }

        // Additional validation for minimum lengths
        if (
            title.trim().length < 5 ||
            category.trim().length < 5 ||
            description.trim().length < 5
        ) {
            toast.error('Title, category, and description must be at least 5 characters long.', { position: 'top-center', autoClose: 1000, theme: 'colored' });

            return;
        }

        // Validation for price as a positive number
        if (isNaN(price) || parseFloat(price) <= 0) {
            toast.error('Price must be a positive number.', { position: 'top-center', autoClose: 1000, theme: 'colored' });
            return;
        }

        // Create the product object
        const product = {
            id: nanoid(),
            title,
            image,
            category,
            price: parseFloat(price),
            description,
        };

        // Add product to context
        setProducts([...products, product]);


        localStorage.setItem("products", JSON.stringify([...products, product]))
        toast.success("Product Created!", {
            position: "top-center",
            autoClose: 1000,
            theme: "colored",
        });
        navigate('/');
    };

    return (
        <div className=" w-screen bg-zinc-200 m-auto h-full overflow-x-hidden overflow-y-auto">
            <form
                onSubmit={submitHandler}
                className=" w-1/2 max-w-lg bg-zinc-200 shadow-md rounded-lg p-8  m-auto"
            >
                <h1 className="text-2xl font-bold text-center text-gray-700 mt-2 mb-3">Add New Product</h1>

                <div className="mb-2">
                    <label className="block text-gray-600 font-medium mb-2">Image URL</label>
                    <input
                        type="url"
                        name='image'
                        placeholder="Image URL"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={(e) => setImage(e.target.value)}
                        value={image}
                    />
                </div>

                <div className="mb-2">
                    <label className="block text-gray-600 font-medium mb-2">Title</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </div>

                <div className="mb-2">
                    <label className="block text-gray-600 font-medium mb-2">Category</label>
                    <input
                        type="text"
                        placeholder="Category"
                        name="category"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                    />
                </div>

                <div className="mb-2">
                    <label className="block text-gray-600 font-medium mb-2">Price</label>
                    <input
                        type="number"
                        placeholder="Price"
                        name="price"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                    />
                </div>

                <div className="mb-2">
                    <label className="block text-gray-600 font-medium mb-2">Description</label>
                    <textarea
                        placeholder="Enter product description..."
                        rows="4"
                        name="description"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition-all duration-200"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default Create;
