import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Order = () => {
    const [orderBy, setOrderBy] = useState('');
    const [order, setOrder] = useState('');
    const { filters } = useParams();

    useEffect(() => {
        if (filters) {
            const newOrder = JSON.parse(atob(filters));
            if (newOrder.orderBy && (newOrder.orderBy !== orderBy) || newOrder.order && (newOrder.order !== order)) {
                setOrderBy(newOrder.orderBy);
                setOrder(newOrder.order);
            }
        }
    }, [filters]);
    const navigate = useNavigate();

    // Manejador de eventos para cambiar el orden
    const handleSortChange = (event) => {
        const selectedSort = event.target.value;
        let newOrderBy = '';
        let newOrder = '';

        switch (selectedSort) {
            case 'price-low-to-high':
                newOrderBy = 'price';
                newOrder = 'asc';
                break;
            case 'price-high-to-low':
                newOrderBy = 'price';
                newOrder = 'desc';
                break;
            case 'latest':
                newOrderBy = 'created_at';
                newOrder = 'desc';
                break;
            default:
                newOrderBy = '';
                newOrder = '';
        }

        setOrderBy(newOrderBy);
        setOrder(newOrder);

        if (filters) {
            let oldFilters = JSON.parse(atob(filters));
            oldFilters.orderBy = newOrderBy;
            oldFilters.order = newOrder;
            const filtersString = btoa(JSON.stringify(oldFilters));
            navigate(`/shop/${filtersString}`);
        } else {
            const filtersObject = {
                orderBy: newOrderBy,
                order: newOrder
            };
            const filtersString = btoa(JSON.stringify(filtersObject));
            navigate(`/shop/${filtersString}`);
        }
    };

    return (
        <select name="sort" id="sort" onChange={handleSortChange}
            className="w-44 text-sm text-gray-600 py-3 px-4 border-gray-300 shadow-sm rounded focus:ring-primary focus:border-primary">
            <option value="">Default sorting</option>
            <option value="price-low-to-high">Price low to high</option>
            <option value="price-high-to-low">Price high to low</option>
            <option value="latest">Latest product</option>
        </select>
    );
};

export default Order;
