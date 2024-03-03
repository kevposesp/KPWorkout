import React, { useEffect } from 'react';
import { useProduct } from '@/hooks/useProduct';
import { useChart } from '@/hooks/useChart';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const Chart = () => {

    const { productsChart, addProduct, removeProduct, removeLine } = useChart();

    console.log(productsChart);

    const stock = (stock) => stock > 0
        ? <span className="text-green-600">In Stock</span>
        : <span className="text-red-600">Out of Stock</span>

    const button = productsChart.length === 0 ? 'bg-gray-300 cursor-not-allowed hover:bg-gray-300' : 'bg-blue-500 hover:bg-blue-700';

    return (
        <div className="col-span-9 space-y-4">
            {productsChart.length === 0 ? (<div className="text-center text-gray-600">No products in Chart</div>)
                : productsChart.map(product => (
                    <div className="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded" key={product.id}>
                        <div className="w-28">
                            <img src="../assets/images/products/product6.jpg" alt="product 6" className="w-full" />
                        </div>
                        <div className="w-1/3">
                            <h2 className="text-gray-800 text-xl font-medium uppercase">{product.name}</h2>
                            <p className="text-gray-500 text-sm">Availability: {stock(product.stock)}</p>
                        </div>
                        <div className="text-primary text-lg font-semibold">{product.price} €</div>

                        <form className="max-w-xs mx-auto">
                            <div className="relative flex items-center max-w-[8rem]">
                                <button type="button" onClick={() => removeProduct(product.id)} id="decrement-button" data-input-counter-decrement="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                    <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                    </svg>
                                </button>
                                <input type="text" id="quantity-input" data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="999" required value={product.pivot.quantity} disabled/>
                                <button type="button" onClick={() => addProduct(product.id)} id="increment-button" data-input-counter-increment="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                    <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                    </svg>
                                </button>
                            </div>
                        </form>

                        <div className="text-gray-600 cursor-pointer hover:text-primary">
                            <FontAwesomeIcon icon={faTrash} onClick={() => removeLine(product.id)} />
                        </div>
                    </div>
                ))}

            <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${button}`}>CheckOut</button>
        </div>
    );
};

export default Chart;
