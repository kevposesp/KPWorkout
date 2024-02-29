import React from 'react';
import { useCategory } from '@/hooks/useCategory';

const ListCategoriesHome = () => {

    const { categories } = useCategory();

    return (
        <div className="container py-4">
            <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">shop by category</h2>
            <div className="grid grid-cols-3 gap-3">
                {categories.map((category) => (
                    <div className="relative rounded-sm overflow-hidden group" key={category.id}>
                        <img src={category.image} alt="category 1" className="w-full" />
                        <a href="#"
                            className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">
                                {category.title}
                            </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListCategoriesHome;
