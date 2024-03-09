import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Price = () => {
    const [priceFilters, setPriceFilters] = useState({
        min: 0,
        max: 0
    });
    const { filters } = useParams();

    useEffect(() => {
        if (filters) {
            const newPriceFilters = JSON.parse(atob(filters));
            if (newPriceFilters.minPrice && (newPriceFilters.minPrice !== priceFilters.min) || newPriceFilters.maxPrice && (newPriceFilters.maxPrice !== priceFilters.max)) {
                setPriceFilters({ min: newPriceFilters.minPrice, max: newPriceFilters.maxPrice })
            } else if (!newPriceFilters.minPrice && !newPriceFilters.maxPrice){
                setPriceFilters({ min: 0, max: 0 });
            }
        }
    }, [filters]);
    const navigate = useNavigate();

    // Manejador de eventos para cambiar los precios
    const handlePriceChange = (e) => {
        const { name, value } = e.target;
        setPriceFilters(prevFilters => ({
            ...prevFilters,
            [name]: parseInt(value)
        }));

        if (filters) {
            let oldFilters = JSON.parse(atob(filters));
            oldFilters.minPrice = name === 'min' ? parseInt(value) : priceFilters.min;
            oldFilters.maxPrice = name === 'max' ? parseInt(value) : priceFilters.max;
            const filtersString = btoa(JSON.stringify(oldFilters));
            navigate(`/shop/${filtersString}`);
        } else {
            const filtersObject = {
                minPrice: name === 'min' ? parseInt(value) : priceFilters.min,
                maxPrice: name === 'max' ? parseInt(value) : priceFilters.max
            };
            const filtersString = btoa(JSON.stringify(filtersObject));
            navigate(`/shop/${filtersString}`);
        }
    };

    return (
        <div className="mt-4 flex items-center">
            <input type="number" name="min" id="min"
                className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
                placeholder="min" onChange={handlePriceChange} value={priceFilters.min}/>
            <span className="mx-3 text-gray-500">-</span>
            <input type="number" name="max" id="max"
                className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
                placeholder="max" onChange={handlePriceChange} value={priceFilters.max}/>
        </div>
    );
};

export default Price;
