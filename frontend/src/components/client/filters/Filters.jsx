import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFilter } from '@/hooks/useFilter';

const Filters = () => {
    const [filtersAll, setFiltersAll] = useState([]);
    const { filters } = useParams();
    const { filtersHook } = useFilter();
    const navigate = useNavigate();

    useEffect(() => {
        if (filtersAll === undefined) {
            setFiltersAll([]);
        }
        if (filters) {
            const newFiltersTerm = JSON.parse(atob(filters));
            if (newFiltersTerm.filters && filtersAll && (newFiltersTerm.filters !== filtersAll)) {
                setFiltersAll(newFiltersTerm.filters);
            } else if (!newFiltersTerm.filters) {
                setFiltersAll([]);
            }
        }
    }, [filters]);

    const handleFilterChange = (filterId, isChecked) => {
        const updatedFilters = isChecked
            ? [...filtersAll, filterId]
            : filtersAll.filter(id => id !== filterId);

        setFiltersAll(updatedFilters);

        if (filters) {
            let oldFilters = JSON.parse(atob(filters));
            oldFilters.filters = updatedFilters;
            oldFilters.offset = 0;
            const filtersString = btoa(JSON.stringify(oldFilters));
            navigate(`/shop/${filtersString}`);
        } else {
            const filtersObject = { filters: updatedFilters };
            const filtersString = btoa(JSON.stringify(filtersObject));
            navigate(`/shop/${filtersString}`);
        }
    };

    return (
        <div className="divide-y divide-gray-200 space-y-5">
            {Object.entries(filtersHook).map(([category, filters]) => (
                <div key={category} className='pt-4'>
                    <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">{category}</h3>
                    {filters.map(fil => (
                        <div key={fil.id}>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name={`fil-${fil.id}`}
                                    id={`fil-${fil.id}`}
                                    onChange={e => handleFilterChange(fil.id, e.target.checked)}
                                    className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                                    checked={filtersAll && filtersAll.includes(fil.id)}
                                />
                                <label htmlFor={`fil-${fil.id}`} className="text-gray-600 ml-3 cursor-pointer">{fil.name}</label>
                                <div className="ml-auto text-gray-600 text-sm">({fil.products_count})</div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Filters;
