import React, { useEffect, useState } from 'react';
import Menu from '@/components/client/Menu';
import '@/assets/css/template.scss';
import CarouselDetails from '@/components/client/product/CarouselDetails';
import ListRelatedProducts from '@/components/client/lists/ListRelatedProducts';
import { useProduct } from '@/hooks/useProduct';
import { useChart } from '@/hooks/useChart';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'

const ProductDetail = () => {

    const { product, getProduct, toggleFavorite } = useProduct();
    const { addProduct } = useChart();
    const { id } = useParams()
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        getProduct(id);
        console.log(product);
    }, [id, getProduct]);

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    }

    return (
        <div className="">
            <Menu />
            {Object.entries(product).length > 0 && (
                <div className="temp container grid grid-cols-2 gap-6 m-auto mt-20">
                    <CarouselDetails images={product.images} />

                    <div>
                        <h2 className="text-3xl font-medium uppercase mb-2">{product.name}</h2>
                        {/* <div className="flex items-center mb-4">
                        <div className="flex gap-1 text-sm text-yellow-400">
                            <span><i className="fa-solid fa-star"></i></span>
                            <span><i className="fa-solid fa-star"></i></span>
                            <span><i className="fa-solid fa-star"></i></span>
                            <span><i className="fa-solid fa-star"></i></span>
                            <span><i className="fa-solid fa-star"></i></span>
                        </div>
                        <div className="text-xs text-gray-500 ml-3">(150 Reviews)</div>
                    </div> */}
                        <div className="space-y-2">
                            <p className="text-gray-800 font-semibold space-x-2">
                                <span>Availability: </span>
                                <span className={product.stock > 0 ? "text-green-600" : "text-red-600"}>{product.stock > 0 ? 'In Stock' : 'Out Stock'}</span>
                            </p>
                            <p className="space-x-2">
                                <span className="text-gray-800 font-semibold">Brand: </span>
                                <span className="text-gray-600">Apex</span>
                            </p>
                            <p className="space-x-2">
                                <span className="text-gray-800 font-semibold">Category: </span>
                                <span className="text-gray-600">Sofa</span>
                            </p>
                        </div>
                        <div className="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
                            <p className="text-xl text-primary font-semibold">45.00 €</p>
                            <p className="text-base text-gray-400 line-through">55.00 €</p>
                        </div>

                        <p className="mt-4 text-gray-600">{product.description}</p>

                        {/* <div className="pt-4">
                        <h3 className="text-sm text-gray-800 uppercase mb-1">Size</h3>
                        <div className="flex items-center gap-2">
                            <div className="size-selector">
                                <input type="radio" name="size" id="size-xs" className="hidden" />
                                <label htmlFor="size-xs"
                                    className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600">XS</label>
                            </div>
                            <div className="size-selector">
                                <input type="radio" name="size" id="size-sm" className="hidden" />
                                <label htmlFor="size-sm"
                                    className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600">S</label>
                            </div>
                            <div className="size-selector">
                                <input type="radio" name="size" id="size-m" className="hidden" />
                                <label htmlFor="size-m"
                                    className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600">M</label>
                            </div>
                            <div className="size-selector">
                                <input type="radio" name="size" id="size-l" className="hidden" />
                                <label htmlFor="size-l"
                                    className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600">L</label>
                            </div>
                            <div className="size-selector">
                                <input type="radio" name="size" id="size-xl" className="hidden" />
                                <label htmlFor="size-xl"
                                    className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600">XL</label>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Color</h3>
                        <div className="flex items-center gap-2">
                            <div className="color-selector">
                                <input type="radio" name="color" id="red" className="hidden" />
                                <label htmlFor="red"
                                    className="border border-gray-200 rounded-sm h-6 w-6  cursor-pointer shadow-sm block"></label>
                            </div>
                            <div className="color-selector">
                                <input type="radio" name="color" id="black" className="hidden" />
                                <label htmlFor="black"
                                    className="border border-gray-200 rounded-sm h-6 w-6  cursor-pointer shadow-sm block"></label>
                            </div>
                            <div className="color-selector">
                                <input type="radio" name="color" id="white" className="hidden" />
                                <label htmlFor="white"
                                    className="border border-gray-200 rounded-sm h-6 w-6  cursor-pointer shadow-sm block"></label>
                            </div>

                        </div>
                    </div> */}

                        <div className="mt-4">
                            <h3 className="text-sm text-gray-800 uppercase mb-1">Quantity</h3>
                            <div className="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
                                <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none" onClick={decreaseQuantity}>-</div>
                                <div className="h-8 w-8 text-base flex items-center justify-center">{quantity}</div>
                                <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none" onClick={increaseQuantity}>+</div>
                            </div>
                        </div>

                        <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
                            <a onClick={() => addProduct(product.id, quantity)}
                                className="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition">
                                <FontAwesomeIcon icon={faCartShopping} /> Add to cart
                            </a>
                            <a onClick={() => { toggleFavorite(product.id); product.is_favorite = !product.is_favorite; }}
                                className="border border-gray-300 text-gray-600 px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:text-primary transition">
                                {product.is_favorite ? <FontAwesomeIcon icon={faHeart} /> : <FontAwesomeIcon icon={faHeartRegular} />} Wishlist
                            </a>
                        </div>

                    </div>

                </div>
            )}

            <div className="container m-auto">
                <ListRelatedProducts />
            </div>

        </div>
    );
};

export default ProductDetail;
