import React, { useEffect } from 'react';
import { useProduct } from '@/hooks/useProduct';

import ProductCard from '../cards/ProductCard';

const ListRelatedProducts = ({ id_category, id_product }) => {

    const { products, getProductsFiltered, toggleFavorite } = useProduct();

    useEffect(() => {
        getProductsFiltered({ quantity: 4, orderBy: 'created_at', order: 'desc', categories: [id_category], exclude: id_product });
    }, [getProductsFiltered]);

    return (
        <div className="container py-16 temp">
            <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">top related products</h2>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                {products.lenght > 0 ? products.map((product) => <ProductCard product={product} key={product.id} toggleFavorite={toggleFavorite} />) : <p>No related products found</p>}
            </div>
        </div>
    );
};

export default ListRelatedProducts;
