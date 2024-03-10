import React from 'react';
import { useCategory } from '@/hooks/useCategory';
import { useNavigate } from 'react-router-dom';

const ListCategoriesHome = () => {

    const { categories } = useCategory();

    const navigate = useNavigate();

    const handleCategory = (id) => {
        let filters = {
            categories: [id]
        }
        navigate(`/shop/${btoa(JSON.stringify(filters))}`);
    }

    return (
        <div className="container py-4">
            <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">shop by category</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                {categories.slice(0, 6).map((category) => (
                    <div className="relative rounded-sm overflow-hidden group" key={category.id} onClick={() => handleCategory(category.id)}>
                        <img src={category.image} alt="category 1" className="w-full" />
                        <a
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
