import React from 'react';
import product1 from '@/assets/images/products/product1.jpg';

import '@/assets/css/template.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faMagnifyingGlass, faStar } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'


const ProductCard = ({ product, toggleFavorite }) => {

    return (
        <div className="bg-white shadow rounded overflow-hidden group">
            <div className="relative">
                <img src={product1} alt="product 1" className="w-full" />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center 
                    justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                    <a href="#"
                        className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                        title="view product">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </a>
                    <a 
                        className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                        title="add to wishlist">
                            {product.is_favorite ? <FontAwesomeIcon icon={faHeart} onClick={() => toggleFavorite(product.id)}/> : <FontAwesomeIcon icon={faHeartRegular} onClick={() => toggleFavorite(product.id)}/>}
                    </a>
                </div>
            </div>
            <div className="pt-4 pb-3 px-4">
                <a href="#">
                    <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                        {product.name}
                    </h4>
                </a>
                <div className="flex items-baseline mb-1 space-x-2">
                    <p className="text-xl text-primary font-semibold">{product.price} €</p>
                    {/* <p className="text-sm text-gray-400 line-through">$55.90</p> */}
                </div>
                {/* <div className="flex items-center">
                                <div className="flex gap-1 text-sm text-yellow-400">
                                    <span><FontAwesomeIcon icon={faStar} /></span>
                                    <span><FontAwesomeIcon icon={faStar} /></span>
                                    <span><FontAwesomeIcon icon={faStar} /></span>
                                    <span><FontAwesomeIcon icon={faStar} /></span>
                                    <span><FontAwesomeIcon icon={faStar} /></span>
                                </div>
                                <div className="text-xs text-gray-500 ml-3">(150)</div>
                            </div> */}
            </div>
            <a href="#"
                className="block w-full py-2 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition">Add
                to cart</a>
        </div>
    );

};

export default ProductCard;
