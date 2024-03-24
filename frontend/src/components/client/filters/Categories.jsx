import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCategory } from '@/hooks/useCategory';
import { faPlus, faSubtract } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Categories = () => {
    const [categoryFilters, setCategoryFilters] = useState([]);
    const { filters } = useParams();
    const { categories } = useCategory();
    const navigate = useNavigate();

    const [openCategories, setOpenCategories] = useState([]);

    const toggleCategory = category => {
        setOpenCategories(prev => {
            if (prev.includes(category)) {
                return prev.filter(c => c !== category);
            } else {
                return [...prev, category];
            }
        });
    };

    useEffect(() => {
        if (categoryFilters === undefined) {
            setCategoryFilters([]);
        }
        if (filters) {
            const newCategoriesTerm = JSON.parse(atob(filters));
            if (newCategoriesTerm.categories && categoryFilters && (newCategoriesTerm.categories !== categoryFilters)) {
                setCategoryFilters(newCategoriesTerm.categories);
            } else if (!newCategoriesTerm.categories) {
                setCategoryFilters([]);
            }
        }
    }, [filters]);

    const handleCategoryChange = (categoryId, isChecked) => {
        const updatedFilters = isChecked
            ? [...categoryFilters, categoryId]
            : categoryFilters.filter(id => id !== categoryId);

        setCategoryFilters(updatedFilters);

        if (filters) {
            let oldFilters = JSON.parse(atob(filters));
            oldFilters.categories = updatedFilters;
            oldFilters.offset = 0;
            const filtersString = btoa(JSON.stringify(oldFilters));
            navigate(`/shop/${filtersString}`);
        } else {
            const filtersObject = { categories: updatedFilters };
            const filtersString = btoa(JSON.stringify(filtersObject));
            navigate(`/shop/${filtersString}`);
        }
    };

    return (
        <div className="space-y-2">
            {categories.map(category => (
                <>
                    {category.is_leaf && (
                        <div key={category.id}>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name={`cat-${category.id}`}
                                    id={`cat-${category.id}`}
                                    onChange={e => handleCategoryChange(category.id, e.target.checked)}
                                    className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                                    checked={categoryFilters && categoryFilters.includes(category.id)}
                                />
                                <label htmlFor={`cat-${category.id}`} className="text-gray-600 ml-3 cursor-pointer">{category.title}</label>
                                <div className="ml-auto text-gray-600 text-sm">({category.products_count})</div>
                                <div className='ms-2 flex items-center p-2 bg-gray-100 hover:bg-gray-300 transition rounded-sm' onClick={() => toggleCategory(category.id)}>
                                    <FontAwesomeIcon icon={openCategories.includes(category.id) ? faSubtract : faPlus}/>
                                </div>
                            </div>
                            {openCategories.includes(category.id) && category.children_categories.length > 0 && (
                                <div className="ml-6">
                                    {category.children_categories.map(child => (
                                        <div className="flex items-center" key={child.id}>
                                            <input
                                                type="checkbox"
                                                name={`cat-${child.id}`}
                                                id={`cat-${child.id}`}
                                                onChange={e => handleCategoryChange(child.id, e.target.checked)}
                                                className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                                                checked={categoryFilters && categoryFilters.includes(child.id)}
                                            />
                                            <label htmlFor={`cat-${child.id}`} className="text-gray-600 ml-3 cursor-pointer">{child.title}</label>
                                            <div className="ml-auto text-gray-600 text-sm">({child.products_count})</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </>
            ))}
        </div>
    );
};

export default Categories;
