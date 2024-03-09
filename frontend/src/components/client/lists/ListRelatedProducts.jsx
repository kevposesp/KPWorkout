import React, { useEffect } from 'react';
import { useProduct } from '@/hooks/useProduct';

import ProductCard from '../cards/ProductCard';

const ListRelatedProducts = () => {

    const { products, getProductsFiltered, toggleFavorite } = useProduct();

    useEffect(() => {
        getProductsFiltered({ quantity: 4, orderBy: 'created_at', order: 'desc'});
    }, [getProductsFiltered]);

    return (
        <div className="container py-16 temp">
            <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">top related products</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {products.map((product) => <ProductCard product={product} key={product.id} toggleFavorite={toggleFavorite}/>)}
            </div>
        </div>
    );
};

export default ListRelatedProducts;
