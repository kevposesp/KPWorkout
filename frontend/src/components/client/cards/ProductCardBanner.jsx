import React from 'react';
import product1 from '@/assets/images/products/product1.jpg';

import '@/assets/css/template.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faMagnifyingGlass, faStar } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import { useChart } from '@/hooks/useChart';
import { useNavigate } from 'react-router-dom';


const ProductCard = ({ product, toggleFavorite }) => {

    const { addProduct } = useChart();

    const navigate = useNavigate();

    const button = (product) => product.stock > 0
        ? <button onClick={() => addProduct(product.id)}
            className="block w-24 py-2 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition cursor-pointer">Add
            to cart</button>
        : <a
            className="cursor-not-allowed block w-24 py-2 text-center text-white bg-red-400 border border-red-400 rounded-md hover:bg-red-400 transition cursor-pointer">Add
            to cart</a>

    const product_img = product.images.length > 0 ? product.images[0] : product1;

    return (
        <div className="bg-white shadow rounded overflow-hidden group relative flex">
            <div className="relative w-[33%] lg:w-1/4 flex-shrink-0">
                <div className="w-full h-full">
                    <img src={product_img} alt="product" className="object-cover w-full h-full" />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                    <a onClick={() => navigate(`/shop/product/${product.id}`)}
                        className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                        title="view product">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </a>
                    <a
                        className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                        title="add to wishlist">
                        {product.is_favorite ? <FontAwesomeIcon icon={faHeart} onClick={() => toggleFavorite(product.id)} /> : <FontAwesomeIcon icon={faHeartRegular} onClick={() => toggleFavorite(product.id)} />}
                    </a>
                </div>
            </div>

            <div className="pt-4 pb-3 px-4 mb-10 w-auto flex-1">
                <a>
                    <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                        {product.name}
                    </h4>

                    <h5 className="text-md mb-2 text-gray-400 hover:text-primary transition line-clamp-3 ">
                        {product.description}
                    </h5>
                </a>
                <div className="flex items-baseline mb-1 space-x-2">
                    <p className="text-xl text-primary font-semibold">{product.price} €</p>
                </div>
                <p className="text-sm text-gray-400">Stock: {product.stock}</p>
            </div>
            <div className='ms-auto w-[20%] flex items-center justify-center'>
                {button(product)}
            </div>
        </div>
    );

};

export default ProductCard;
