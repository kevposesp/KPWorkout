import React, { useState, useEffect } from 'react';
import CategoryService from '@/services/CategoryService';

const Context = React.createContext({});

export function CategoryContext({ children }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        CategoryService.Get()
            .then(({ data, status }) => {
                console.log(data);
                if (status === 200) {
                    setCategories(data);
                }
            })
            .catch(e => console.error(e));
    }, [setCategories]);

    return (
        <Context.Provider value={{ categories, setCategories }}>
            {children}
        </Context.Provider>
    );
}

export default Context;
