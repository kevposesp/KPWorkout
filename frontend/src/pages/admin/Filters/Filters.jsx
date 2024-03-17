import React from 'react';
import { Card } from 'flowbite-react';
import ListFilters from '@/components/admin/Filters/ListFilters';

const Filters = () => {
    return (
        <div className='container mx-auto mt-10'>

            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                Filters
            </h1>

            <hr className="my-12 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />

            <ListFilters />

        </div>
    );
};

export default Filters;
