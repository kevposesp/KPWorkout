import React, { useState, useEffect } from 'react';
import FilterService from '@/services/FilterService';

const Context = React.createContext({});

export function FilterContext({ children }) {
    const [filtersHook, setFiltersHook] = useState({});

    useEffect(() => {
        FilterService.Get()
            .then(({ data, status }) => {
                console.log(data);
                if (status === 200) {
                    setFiltersHook(data);
                }
            })
            .catch(e => console.error(e));
    }, [setFiltersHook]);

    return (
        <Context.Provider value={{ filtersHook, setFiltersHook }}>
            {children}
        </Context.Provider>
    );
}

export default Context;
