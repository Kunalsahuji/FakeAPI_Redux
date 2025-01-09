import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ProductContext } from '../utils/Context';
import Loading from './Loding';
import axios from '../utils/axios';

const Home = () => {
    const [products] = useContext(ProductContext);
    const [filterProducts, setFilterProducts] = useState(null);

    const { search } = useLocation();
    const category = decodeURIComponent(search.split('=')[1]);

    const getProductsCategory = async () => {
        try {
            const { data } = await axios.get(`/products/category/${category}`);
            setFilterProducts(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (!filterProducts || category === 'undefined') setFilterProducts(products);
        if (category !== 'undefined') {
            // getProductsCategory();
            setFilterProducts(products.filter((p) => p.category == category))
        }
    }, [category, products]);

    return products ? (
        <>
            <div className="h-full w-full p-5 flex flex-wrap gap-5 justify-center bg-gradient-to-b from-gray-100 to-gray-300 overflow-x-hidden overflow-y-auto">
                {filterProducts &&
                    filterProducts.map((p) => (
                        <Link
                            key={p.id}
                            to={`/details/${p.id}`}
                            className="card bg-white shadow-lg hover:shadow-2xl rounded-lg p-4 w-[100%] sm:w-[45%] lg:w-[22%] flex flex-col items-center transition-transform duration-300 hover:scale-105"
                        >
                            <div
                                className="mb-4 w-full h-[180px] bg-contain bg-no-repeat bg-center rounded"
                                style={{ backgroundImage: `url(${p.image})` }}
                            ></div>
                            <h1 className="text-lg font-semibold text-gray-700 hover:text-blue-500 transition-colors">
                                {p.title}
                            </h1>
                        </Link>
                    ))}
            </div>
        </>
    ) : (
        <Loading />
    );
};

export default Home;
