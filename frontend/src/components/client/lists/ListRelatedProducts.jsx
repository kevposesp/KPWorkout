import React, { useEffect } from 'react';
import { useProduct } from '@/hooks/useProduct';
import { useAuth } from '@/hooks/useAuth';

import ProductCard from '../cards/ProductCard';
import SkeletonProductCard from '@/components/skeletons/SkeletonProductCard';

const ListRelatedProducts = ({ categ, id_product }) => {

    const { products, getProductsFiltered, toggleFavorite } = useProduct();
    const { user } = useAuth()

    useEffect(() => {
        getProductsFiltered({
            limit: 4,
            orderBy: 'created_at',
            order: 'desc',
            categories: categ.map(c => c.id),
            exclude: id_product
        });
    }, [getProductsFiltered, user]);

    return (
        <div className="container py-16 temp">
            <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">top related products</h2>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                {products.length > 0 ?
                    products.map((product) => <ProductCard product={product} key={product.id} toggleFavorite={toggleFavorite} />) :
                    <>
                        <SkeletonProductCard />
                        <SkeletonProductCard />
                        <SkeletonProductCard />
                        <SkeletonProductCard />
                    </>
                }
            </div>
        </div>
    );
};

export default ListRelatedProducts;
