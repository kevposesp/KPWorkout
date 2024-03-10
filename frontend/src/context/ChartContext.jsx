import React, { useState, useEffect } from 'react'
import ChartService from '@/services/ChartService';
import JwtService from '@/services/JwtService';

const Context = React.createContext({})

export function ChartContext({ children }) {
    const [productsChart, setProductsChart] = useState([]);
    const [token, setToken] = useState(JwtService.getToken ? JwtService.getToken : false);

    useEffect(function () {
        if (token) {
            ChartService.Get()
                .then(({ data, status }) => {
                    if (status === 200) {
                        setProductsChart(data.data);
                    }
                })
                .catch(e => console.error(e));
        }
    }, [setProductsChart]);

    return <Context.Provider value={{ productsChart, setProductsChart }}>
        {children}
    </Context.Provider>
}

export default Context