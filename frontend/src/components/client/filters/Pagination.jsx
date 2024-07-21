// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';

// const Pagination = ({ totalPages }) => {

//     const navigate = useNavigate();
//     const [page, setPage] = useState(1);
//     const [limit, setLimit] = useState(6);
//     const { filters } = useParams();

//     useEffect(() => {
//         if (filters) {
//             const newFiltersTerm = JSON.parse(atob(filters));
//             if (newFiltersTerm.offset && page !== newFiltersTerm.offset) {
//                 setPage(newFiltersTerm.offset + 1);
//             } else {
//                 setPage(1);
//             }
//         }
//     }, [page, filters]);

//     const handlePageChange = (newPage, newLimit = limit) => {
//         setPage(newPage);
//         if (filters) {
//             let oldFilters = JSON.parse(atob(filters));
//             oldFilters.offset = newPage - 1;
//             if (newLimit) {
//                 oldFilters.limit = newLimit;
//                 setLimit(newLimit);
//             }
//             const filtersString = btoa(JSON.stringify(oldFilters));
//             navigate(`/shop/${filtersString}`);
//         } else {
//             const filtersObject = { offset: newPage - 1 };
//             if (newLimit) {
//                 filtersObject.limit = newLimit;
//                 setLimit(newLimit);
//             }
//             const filtersString = btoa(JSON.stringify(filtersObject));
//             navigate(`/shop/${filtersString}`);
//         }
//     }

//     const paginationButtons = [];
//     for (let i = 0; i < totalPages / limit; i++) {
//         paginationButtons.push(
//             <li key={i + 1}>
//                 <a className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${page === i + 1 ? '!bg-blue-100 text-blue-600' : ''}`} onClick={() => handlePageChange(i + 1)}>{i + 1}</a>
//             </li>
//         );
//     }

//     return (
//         <>
//             {paginationButtons.length > 0 && (
//                 <nav className='mt-7 mb-3 block md:flex gap-6'>
//                     <ul class="inline-flex -space-x-px text-base h-10 mx-auto">
//                         <li onClick={() => page > 1 ? handlePageChange(page - 1) : ''}>
//                             <a class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 hidden md:flex">Previous</a>
//                             <a class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 flex md:hidden">&lt;</a>
//                         </li>
//                         {paginationButtons}
//                         <li onClick={() => page < totalPages / limit ? handlePageChange(page + 1) : ''}>
//                             <a class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 hidden md:flex">Next</a>
//                             <a class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 flex md:hidden">&gt;</a>
//                         </li>
//                     </ul>
//                     <select name="sort" id="sort"
//                         className="w-16 text-sm text-gray-600 py-3 px-4 border-gray-300 shadow-sm rounded focus:ring-primary focus:border-primary"
//                         onChange={(event) => handlePageChange(1, event.target.value)}>
//                         <option value="6">6</option>
//                         <option value="12">12</option>
//                         <option value="24">24</option>
//                     </select>
//                 </nav>
//             )}
//         </>
//     );

// };

// export default Pagination;


import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Pagination = ({ totalPages }) => {
    const navigate = useNavigate();
    const { filters } = useParams();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(6);

    useEffect(() => {
        if (filters) {
            const newFiltersTerm = JSON.parse(atob(filters));
            setPage(newFiltersTerm.offset ? newFiltersTerm.offset + 1 : 1);
        }
    }, [filters]);

    const handlePageChange = (newPage, newLimit = limit) => {
        const newOffset = newPage - 1;
        setPage(newPage);
        setLimit(newLimit);
        const newFilters = filters ? JSON.parse(atob(filters)) : {};
        newFilters.offset = newOffset;
        newFilters.limit = newLimit;
        const filtersString = btoa(JSON.stringify(newFilters));
        navigate(`/shop/${filtersString}`);
    };

    const generateMiddleButtons = () => {
        let buttons = [];
        const start = Math.max(1, page);
        const end = Math.min(start + 2, totalPages);
        
        if (start > 0) buttons.push(
                <li key="start-ellipsis">
                    <a className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700`}>
                        ...
                    </a>
                </li>
            );
        
        for (let i = start; i <= end; i++) {
            if(i <= (totalPages / limit) + 1) buttons.push(
                <li key={i}>
                    <a className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${page === i ? '!bg-blue-100 text-blue-600' : ''}`} onClick={() => handlePageChange(i)}>
                        {i}
                    </a>
                </li>
            );
        }

        if (end < totalPages) buttons.push(
                <li key="end-ellipsis">
                    <a className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700`}>
                        ...
                    </a>
                </li>
            );

        return buttons;
    };

    return (
        <>
            {totalPages > 0 && (
                <nav className='mt-7 mb-3 block md:flex gap-6'>
                    <ul className="inline-flex -space-x-px text-base h-10 mx-auto">
                        <li onClick={() => page > 1 && handlePageChange(page - 1)}>
                            <a className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">{`<`}</a>
                        </li>
                        {generateMiddleButtons()}
                        <li onClick={() => page < totalPages / limit && handlePageChange(page + 1)}>
                            <a className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700">{`>`}</a>
                        </li>
                    </ul>
                    <select className="w-16 text-sm text-gray-600 py-3 px-4 border-gray-300 shadow-sm rounded focus:ring-primary focus:border-primary"
                            onChange={(event) => handlePageChange(1, parseInt(event.target.value))}>
                        <option value="6">6</option>
                        <option value="12">12</option>
                        <option value="24">24</option>
                    </select>
                </nav>
            )}
        </>
    );
};

export default Pagination;
