import React from 'react';

const Loading = () => {
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-50">
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500 border-opacity-75 mb-5"></div>

            <h1 className="text-2xl lg:text-4xl font-semibold text-gray-700 animate-pulse">
                Loading, please wait...
            </h1>
        </div>
    );
};

export default Loading;
