import React, { useEffect } from 'react';
import { useProduct } from '@/hooks/useProduct';
import { useChart } from '@/hooks/useChart';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'flowbite-react';

const WishList = () => {

    const { products, getWishlist, toggleFavorite } = useProduct();
    const { addProduct } = useChart();

    useEffect(() => {
        getWishlist();
    }, []);

    const stock = (stock) => stock > 0
        ? <span className="text-green-600">In Stock</span>
        : <span className="text-red-600">Out of Stock</span>

    const button = (product) => product.stock > 0
        ? <a onClick={() => addProduct(product.id)}
            className="px-6 py-2 text-center text-sm text-white bg-blue-700 border border-blue-400 rounded hover:bg-transparent hover:text-blue-700 transition uppercase font-roboto font-medium flex items-center">add
            to cart</a>
        : <a
            className="cursor-not-allowed px-6 py-2 text-center text-sm text-white bg-blue-400 border border-blue-400 rounded transition uppercase font-roboto font-medium flex items-center">add
            to cart</a>

    return (
        <div className="col-span-12 md:col-span-9 space-y-4">
            {products.length === 0 ? (<div className="text-center text-gray-600">No products in wishlist</div>)
                : products.map(product => (
                    <div className="block md:flex items-center justify-between border gap-6 p-4 border-gray-200 rounded" key={product.id}>
                        <div className="md:w-28">
                            <img src={product.images[0]} alt="product 6" className="w-full" />
                        </div>
                        <div className="w-full md:w-1/3 my-2">
                            <h2 className="text-gray-800 text-xl font-medium uppercase">{product.name}</h2>
                            <p className="text-gray-500 text-sm">Availability: {stock(product.stock)}</p>
                        </div>
                        <div className="text-primary text-lg font-semibold my-2">{product.price} €</div>
                        <div className="flex">
                            {button(product)}
                            <a onClick={() => toggleFavorite(product.id, 'wish')}
                                className='px-6 py-2 text-center text-sm text-white bg-red-700 border border-red-400 rounded hover:bg-transparent hover:text-red-700 transition uppercase font-roboto font-medium ms-auto md:ms-2 flex items-center'>
                                <FontAwesomeIcon icon={faTrash} />
                            </a>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default WishList;
