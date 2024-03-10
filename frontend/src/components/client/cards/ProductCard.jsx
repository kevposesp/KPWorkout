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
        ? <a onClick={() => addProduct(product.id)}
            className="block w-full py-2 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition absolute right-0 left-0 bottom-0">add
            to cart</a>
        : <a
            className="cursor-not-allowed block w-full py-2 text-center text-white bg-red-400 border border-red-400 rounded-b hover:bg-red-400 transition absolute right-0 left-0 bottom-0">add
            to cart</a>

    const product_img = product.images.length > 0 ? product.images[0] : product1;

    return (
        <div className="bg-white shadow rounded overflow-hidden group relative">
            <div className="relative">
                <div className="w-full">
                    <div className="h-52 overflow-hidden m-auto">
                        <img src={product_img} alt="product 1" className="w-full !h-full object-cover" />
                    </div>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center 
                    justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
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
            <div className="pt-4 pb-3 px-4 mb-10">
                <a href="#">
                    <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                        {product.name}
                    </h4>
                </a>
                <div className="flex items-baseline mb-1 space-x-2">
                    <p className="text-xl text-primary font-semibold">{product.price} €</p>
                    {/* <p className="text-sm text-gray-400 line-through">$55.90</p> */}

                </div>
                <p className="text-sm text-gray-400">Stock: {product.stock}</p>
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
            {button(product)}
        </div>
    );

};

export default ProductCard;
