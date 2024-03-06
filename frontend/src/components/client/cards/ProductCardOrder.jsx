import React from 'react';

const ProductCardOrder = ({ product }) => {
    return (
        <div className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full ">
            <div className="pb-4 md:pb-8 w-full md:w-40">
                <img className="w-full hidden md:block" src="https://i.ibb.co/84qQR4p/Rectangle-10.png" alt="dress" />
                <img className="w-full md:hidden" src="https://i.ibb.co/L039qbN/Rectangle-10.png" alt="dress" />
            </div>
            <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                <div className="w-full flex flex-col justify-start items-start space-y-8">
                    <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">{product.name}</h3>
                    <div className="flex justify-start items-start flex-col space-y-2">
                        <p className="text-sm leading-none text-gray-800 truncate overflow-hidden max-w-xs">
                            <span className="text-gray-300">Description: </span> {product.description}
                        </p>
                        {/* <p className="text-sm leading-none text-gray-800">
                            <span className="text-gray-300">Style: </span> Italic Minimal Design
                        </p>
                        <p className="text-sm leading-none text-gray-800">
                            <span className="text-gray-300">Size: </span> Small
                        </p>
                        <p className="text-sm leading-none text-gray-800">
                            <span className="text-gray-300">Color: </span> Light Blue
                        </p> */}
                    </div>
                </div>
                <div className="flex justify-between space-x-8 items-start w-full">
                    <p className="text-base xl:text-lg leading-6">
                        {product.price} €
                        {/* <span className="text-red-300 line-through"> $45.00</span> */}
                    </p>
                    <p className="text-base xl:text-lg leading-6 text-gray-800">{product.pivot.quantity}</p>
                    <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">{(product.price * product.pivot.quantity).toFixed(2)} €</p>
                </div>
            </div>
        </div>
    );
};

export default ProductCardOrder;
