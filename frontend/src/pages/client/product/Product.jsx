import React, { useEffect, useState } from 'react';
import Menu from '@/components/client/Menu';
import '@/assets/css/template.scss';
import CarouselDetails from '@/components/product/CarouselDetails';
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
        <div className="p-2">
            <Menu />
            {Object.entries(product).length > 0 && (
                <div className="temp container grid grid-cols-1 md:grid-cols-2 gap-6 m-auto mt-20">
                    <CarouselDetails images={product.images} />

                    <div>
                        <h2 className="text-3xl font-medium uppercase mb-2">{product.name}</h2>
                        <div className="space-y-2">
                            <p className="text-gray-800 font-semibold space-x-2">
                                <span>Availability: </span>
                                <span className={product.stock > 0 ? "text-green-600" : "text-red-600"}>{product.stock > 0 ? 'In Stock' : 'Out Stock'}</span>
                            </p>
                        </div>
                        <div className="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
                            <p className="text-xl text-primary font-semibold">{product.price} €</p>
                        </div>

                        <p className="mt-4 text-gray-600">{product.description}</p>

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
            {Object.entries(product).length > 0 && (
                <div className="container m-auto">
                    <ListRelatedProducts categ={product.categories} id_product={product.id}/>
                </div>
            )}

        </div>
    );
};

export default ProductDetail;
