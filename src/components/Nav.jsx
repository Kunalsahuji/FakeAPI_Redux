import React, { useContext } from 'react';
import { ProductContext } from '../utils/Context';
import { Link, useLocation } from 'react-router-dom';

const Nav = () => {
    const [products] = useContext(ProductContext);
    const { search, pathname } = useLocation();

    let distinct_category = products && products.reduce((acc, cv) => [...acc, cv.category], []);
    distinct_category = [...new Set(distinct_category)];

    const color = () => {
        return `rgba(${(Math.random() * 255).toFixed()}, ${(Math.random() * 255).toFixed()}, ${(Math.random() * 255).toFixed()}, 0.6)`;
    };

    return (
        <>
            {search || pathname !== '/' ? (
                <Link
                    to={'/'}
                    className="fixed top-5 left-[4%] bg-blue-200 text-blue-700 px-4 py-2 rounded-md shadow-md hover:bg-blue-300 transition duration-300">
                    Home
                </Link>
            ) : null}

            <nav className="w-[15%] h-full bg-zinc-100 shadow-md flex flex-col items-center pt-5 px-3 sm:w-[20%] md:w-[18%] lg:w-[15%]">
                <a
                    href="/create"
                    className="mt-12 py-2 px-5 bg-blue-500 text-white font-medium rounded-lg shadow-lg hover:bg-blue-600 hover:scale-105 transition duration-300">
                    Add New Product
                </a>

                <hr className="my-3 w-full border-gray-300" />

                <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-5 text-gray-800 w-full text-center">
                    Category Filter
                </h1>

                <div className="w-full flex flex-col items-start">
                    {distinct_category.map((c, i) => (
                        <Link
                            key={i}
                            to={`/?category=${c}`}
                            className="flex items-center mb-4 w-full px-3 py-2 hover:bg-gray-200 rounded-md transition duration-300">
                            <span
                                style={{ backgroundColor: color() }}
                                className="rounded-full mr-3 w-[15px] h-[15px] shadow-lg">
                            </span>
                            <span className="text-gray-700 font-medium hover:text-blue-500">
                                {c}
                            </span>
                        </Link>
                    ))}
                </div>
            </nav>
        </>
    );
};

export default Nav;
