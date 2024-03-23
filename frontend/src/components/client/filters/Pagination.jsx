import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Pagination = ({ totalPages }) => {

    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(6);
    const { filters } = useParams();

    useEffect(() => {
        if (filters) {
            const newFiltersTerm = JSON.parse(atob(filters));
            if (newFiltersTerm.offset && page !== newFiltersTerm.offset) {
                setPage(newFiltersTerm.offset + 1);
            } else {
                setPage(1);
            }
        }
    }, [page, filters]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
        if (filters) {
            let oldFilters = JSON.parse(atob(filters));
            oldFilters.offset = newPage - 1;
            const filtersString = btoa(JSON.stringify(oldFilters));
            navigate(`/shop/${filtersString}`);
        } else {
            const filtersObject = { offset: newPage - 1 };
            const filtersString = btoa(JSON.stringify(filtersObject));
            navigate(`/shop/${filtersString}`);
        }
    }

    const paginationButtons = [];
    for (let i = 0; i < totalPages / limit; i++) {
        paginationButtons.push(
            <li key={i + 1}>
                <a className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${page === i + 1 ? '!bg-blue-100 text-blue-600' : ''}`} onClick={() => handlePageChange(i + 1)}>{i + 1}</a>
            </li>
        );
    }

    return (
        <>
            {paginationButtons.length > 0 && (
                <nav className='mt-7 mb-3 flex'>
                    <ul class="inline-flex -space-x-px text-base h-10 mx-auto">
                        <li>
                            <a class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700" onClick={() => page > 1 ? handlePageChange(page - 1) : ''}>Previous</a>
                        </li>
                        {paginationButtons}
                        <li>
                            <a class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700" onClick={() => page < totalPages / limit ? handlePageChange(page + 1) : ''}>Next</a>
                        </li>
                    </ul>
                </nav>
            )}
        </>
    );

};

export default Pagination;
