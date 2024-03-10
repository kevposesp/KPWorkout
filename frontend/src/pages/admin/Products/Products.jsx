import React from 'react';
import { Card } from 'flowbite-react';
import ListCardsProducts from '@/components/admin/Products/ListCardsProducts';

const Products = () => {
    return (
        <div className='container mx-auto mt-10'>

            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                Products
            </h1>

            <hr className="my-12 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />

            <Card className='h-auto'>
                <ListCardsProducts />
            </Card>

        </div>
    );
};

export default Products;
