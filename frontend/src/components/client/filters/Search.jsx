import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { filters } = useParams();

    useEffect(() => {
        if (filters) {
            let newSearchTerm = JSON.parse(atob(filters));
            if (newSearchTerm.text !== searchTerm) {
                setSearchTerm(newSearchTerm.text);
            }
        }
    }, [filters]);
    const navigate = useNavigate();

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        let filters = {
            text: e.target.value,
        }
        let filtersString = JSON.stringify(filters); 
        navigate('/shop/' + btoa(filtersString));
    };

    return (
        <div>
            <div className="w-full max-w relative flex">
                <span className="absolute left-4 top-3 text-lg text-gray-400">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </span>
                <input type="text" name="search" id="search"
                    className="w-full border border-primary border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Search..." />
                <button
                    className="bg-primary border border-primary text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition">Search</button>
            </div>
        </div>
    );
};

export default Search;
